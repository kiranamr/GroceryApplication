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
	aware:{type:String},
	opinion:{type:String},
	prefer:{type:String},
	spend:{type:Number},
	recieve:{type:String},
	farmfresh:{type:String},
	buy:{type:String},
	average:{type:String},
	interest:{type:String},
	agree:{type:String},
	veg_nonveg:{type:String},
	special_Hyd:{type:String},
	favourite:{type:String},
	availed_in_Raichur:{type:String},
	delivery:{type:String},
	organic:{type:String},
	doorstep:{type:String},
	studentcode:{type:String}
	
	
	

});
  

SurveyValueSchema.pre('save',function(next)
	{
          next();

	});

module.exports=mongoose.model('Survey',SurveyValueSchema);