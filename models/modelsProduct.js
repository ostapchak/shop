var mongoose=require('../mongoose');
var schemaProduct=mongoose.Schema({
	name:{
		type:String,
		require:true
	},
	model:{
		type:String,
		require:true,
		unique:true
	},
	category:{
		type:String,
		require:true
	},
	count:{
		type:Number,
		require:true
	},
	price:{
		type:Number,
		require:true
	},
	path:{
		type:String
	}
});
var Product=mongoose.model("Product",schemaProduct);
module.exports=Product;