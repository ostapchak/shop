var mongoose=require('../mongoose');
var schemaCategory=mongoose.Schema({
	name:{
		unique:true,
		type:String,
		require:true
	}
});
var Category=mongoose.model("Category",schemaCategory);
module.exports=Category;