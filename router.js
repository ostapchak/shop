var express=require('express');
var router=express.Router();
var Product=require("./models/modelsProduct.js");
var Category=require("./models/categoryModel.js");
var Order=require("./models/order.js");
var bodyParser=require('body-parser');
var adminUser=require("./models/adminUser.js");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/',function(req,res)
{
	res.sendFile(__dirname+'/views/index.html');
});


router.post('/loadProducts',function(req,res){
	console.log("category:")
	console.log(req.body)

	if(!req.body)
		Product.find({},function(err,data){
			res.send(data);
		});
	Product.find(req.body,function(err,data){
		console.log(data)
			res.send(data);
		});
});

router.get('/loadCategories',function(req,res){
	Category.find({},function(err,data){
		res.send(data);
	});
});

router.post('/addProduct',function(req,res){
	var addProduct=new Product(req.body);
	addProduct.save(function(err,data){
		console.log(data);
		res.send("saved...")
	});
});

router.post('/delProduct',function(req,res){
	Product.remove(req.body,function(err,data){
		res.send("deleted...")
	});
});

router.post('/updateProduct',function(req,res){
	Product.update({_id:req.body._id},{$set:req.body},function(err,data){
		res.send("updated...")
	});
});

router.post('/addCategory',function(req,res){
	var addCategory=new Category(req.body);
	addCategory.save(function(err,data){
		console.log(data);
		res.send("saved...")
	});
});

router.post('/updateCategory',function(req,res){
	Category.update({_id:req.body._id},{$set:req.body},function(err,data){
		console.log(data)
		res.send("updated...")
	});
});

router.post('/delCategory',function(req,res){
	Category.remove(req.body,function(err,data){
		res.send("deleted...")
	});
});

router.post('/newOrder',function(req,res){
	var newOrder=new Order(req.body);
	newOrder.save(function(err,data){
	});
});

router.get('/loadOrders',function(req,res){
	Order.find({},function(err,data){
		console.log(data);
		res.send(data);
	});
});

router.post('/successOrder',function(req,res){
	console.log(req.body.cart);
	for(var i=0; i<req.body.cart.length;i++)
		Product.update({_id:req.body.cart[i]._id},{$inc:{count:-req.body.cart[i].newcount}},function(err,data){
			console.log(data)
		});
	res.send("updated...")
});



module.exports=router;