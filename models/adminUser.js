var mongoose=require('../mongoose');
var schemaAdminUser=mongoose.Schema({
	username:{
		type:String,
		require:true,
		unique:true
	},
	password:{
		type:String,
		require:true
	}
});
var adminUser=mongoose.model("adminUser",schemaAdminUser);
module.exports=adminUser;