var express=require('express');
var app=express();

var router=require("./router.js");
app.use('/',router);
//Встановлення шляху для статичного контенту
app.use(express.static(__dirname)) ;
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var User=require("./models/user.js");
var adminUser=require("./models/adminUser.js");
var cookieParser=require('cookie-parser')();
app.use(cookieParser);

var session=require('cookie-session')({
	keys:['secret'], 
	maxAge: 2*60*60*1000//час сесії 2год
});
app.use(session);

var passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());

var LocalStrategy=require('passport-local').Strategy;//
var FacebookStrategy=require('passport-facebook').Strategy;//
var authFacebook={
	"clientID": "1633023696719726",
	"clientSecret": "79ee61ec10f3a8b50327694c63b70167",
	"callbackURL": "http://localhost:8080/auth/facebook/callback"
};
passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log('User name:')
		console.log(username);
		User.find({ email: username, token: password }, function(err, data) {
			console.log(data);
			if(data.length==1)
				return done(null,{_id:data[0]._id, username:data[0].username});
			else 
				adminUser.find({ username: username, password: password }, function(err, data) {
					if(data.length==1)
						return done(null,{_id:data[0]._id, username:data[0].username});
					else 
						return done(null,false);
				});
		});
	}
	));
passport.use(new FacebookStrategy({
	"clientID": authFacebook.clientID,
	"clientSecret": authFacebook.clientSecret,
	"callbackURL": authFacebook.callbackURL,
	"profileFields": ['id', 'displayName', 'photos', 'email']
},
function(token, refreshToken, profile, done) {
	console.log(profile);
	User.findOne({ "id": profile.id }, function (err, data) {
		if(data)
			return done(null,data);
		else{
			var newUser=new User({
				"id":profile.id,
				"username":profile.displayName,
				"email":profile.emails[0].value || "",
				"token":token,
				"photo":profile.photos[0].value || ""
			});
			newUser.save(function(err,data){
				return done(null,data);
			});
		}
	});
}
));
//Записуємо дані обєкту який повертає LocalStrategy після автентифікації в сесію і користувач авторизується
passport.serializeUser(function(user,done){

	console.log('serialize user:');//req.session
	console.log(user);
	done(null,user)
});
//При всіх наступних звернення авторизованого користувача до сервера відбувається десеріалізація
//Використання даних сесії з пошуком в БД
passport.deserializeUser(function(obj,done)
{
	console.log('deserialize :  ');
	console.log(obj);
	adminUser.find({_id:obj._id},function(err,data)
	{
		console.log("dataDeserializeAdmin:");
		console.log(data);
		if(data.length==1)
		{
			 return done(null,data[0]);//req.user	
			}
			else
				User.find({_id:obj._id},function(err,data)
				{	
					console.log("dataDeserializeUser:");
					console.log(data);
			  return done(null,data[0]);//req.user
			});
		});
});
//Запуск автентифікації на основі LocalStrategy з відповідним редиректом
var auth=passport.authenticate('local',{successRedirect: '/admin',
	failureRedirect: '/login' });
var authNew=passport.authenticate('local',{successRedirect: '/',
	failureRedirect: '/' });
//Midlleware перевіряє чи користувач авторизований
var myAuth=function(req,res,next){
	console.log("myauth:")
	console.log(req.isAuthenticated())
	if(req.isAuthenticated())
		next();
	else
		res.redirect('/login');
};


app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { successRedirect: '/',
		failureRedirect: '/' }));


app.post('/loginUser',authNew);

app.post('/login',auth);
app.get('/login',function(req,res){
	res.sendFile(__dirname+'/views_admin/login.html');//localhost:8080/login
});

app.get('/admin', myAuth);//localhost:8080
app.get('/admin', function(req,res){
	res.sendFile(__dirname+'/views_admin/admin.html');//localhost:8080/admin
});

app.get('/logoutAdmin', function(req, res) {
	req.logout();
	res.redirect('/login');
});

app.get('/logoutUser', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/loadPersonalUser',function(req,res){
	console.log("req.user:");
	console.log(req.user);
	console.log("req.session:");
	console.log(req.session);
	res.send(req.user);
});

//реєстрація
app.post('/regUser',function(req,res){
	console.log(req.body);
	var newUser=new User({
		"username":req.body.username,
		"email":req.body.email,
		"token":req.body.password
	});
	newUser.save(function(err,data){
		console.log('user: ' + newUser.email + " saved.");
		console.log(data)
		req.login({"username":data.email,"password":data.token,"_id":data._id},function(err){
			res.redirect("/");
		})
	});
});
//підключаємо multer для завантаження файлів на сервер
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './images/')
	},
	filename: function (req, file, cb) {
		cb(null,  file.originalname );
	}
});
var upload = multer({ storage: storage });

app.post('/uploadFile', upload.single('upl'), function(req,res){
	req.filename=req.originalname;
	res.send(req.file.path);
});

app.listen(process.env.PORT || 8080);
console.log('Server is running...');