var mongoose=require("mongoose");
mongoose.connect("mongodb://***:***@ds131854.mlab.com:31854/shop");
console.log('MongoDB connect...');
module.exports=mongoose;