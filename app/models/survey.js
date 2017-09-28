var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var validate=require('mongoose-validator');
var bcrypt=require('bcrypt-nodejs');
var emailValidator=[
 validate({
 	validator:'isEmail',
 	message:'Is not a valid email.'

 }),
 validate({
 	validator:'isLength',
 	arguments:[3,25],
 	message:'Email should be betweeen charactors '
 })
];
var SurveyValueSchema=new Schema({
	name:{type:String,required:true},
	phone:{type:String,required:true,unique:true},
	email:{type:String},
	address:{type:String},
	pincode:{type:String},
	aware:{type:String,required:true},
	opinion:{type:String,required:true},
	prefer:{type:String,required:true},
	spend:{type:Number,required:true},
	recieve:{type:String,required:true},
	farmfresh:{type:String,required:true},
	buy:{type:String,required:true},
	average:{type:String,required:true},
	interest:{type:String,required:true},
	agree:{type:String,required:true},
	veg_nonveg:{type:String,required:true},
	special_Hyd:{type:String,required:true},
	favourite:{type:String,required:true},
	availed_in_Raichur:{type:String,required:true},
	delivery:{type:String,required:true},
	organic:{type:String,required:true},
	doorstep:{type:String,required:true},
	studentcode:{type:String}
	
	
	

});
  

SurveyValueSchema.pre('save',function(next)
	{
          next();

	});

module.exports=mongoose.model('Survey',SurveyValueSchema);