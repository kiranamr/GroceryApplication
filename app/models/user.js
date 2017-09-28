var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var validate=require('mongoose-validator');
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
var UserValueSchema=new Schema({
	firstname:{type:String,required:true},
    lastname:{type:String,required:true},
	username:{type:String,lowercase:true,required:true,unique:true},
	password:{type:String,required:true},
	email:{type:String,required:true,lowercase:true,unique:true,validate:emailValidator},
   mobile:{type:String,required:true,unique:true}
}); 

UserValueSchema.pre('save',function(next)
	{
var user=this;
bcrypt.hash(user.password,null,null,function(err,hash)
{
if(err) return next(err);
user.password=hash;
next();
});
	});
UserValueSchema.methods.comparePassword=function(password)
{
  return bcrypt.compareSync(password,this.password);
};

module.exports=mongoose.model('User',UserValueSchema);

