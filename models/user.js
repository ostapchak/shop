var mongoose=require('../mongoose');
var schemaUser=mongoose.Schema({
	username:{
		type:String,
		require:true,
	},
	email:{
		type:String,
		require:true,
		unique:true
	},
	token:{
		type:String,
		require:true
	},
	photo:{
		type:String,
		require:true
	},
	id:{
		type:Number,
		require:true
	}
});
var User=mongoose.model("User",schemaUser);
module.exports=User;