var User=require('../models/user');
var json2xls=require('json2xls');
var Survey=require('../models/survey');
var server= require('http');
var jwt=require('jsonwebtoken');
var json2csv = require('json2csv');
var fs1 = require('fs');
var fieldNames = [  
					 'Name' ,
					 'Mobile number',
					 'Email',
					 'Address',
					 'Pincode',
					 '1.Are you aware of Online Grocery Market?',
					 '2.what is your opinion on free door delivery?',
					 '3.Would you like to prefer such kind of service / give a chance to such kind of service?',
					 '4.How much do you spend monthly grocery?',
					 '5.How many times would you like to recieve such service in a month ?',
					 '6.What is your opinion on farm fresh fruits and vegetables door delivery?',
					 '7.How often do you buy fruits and vegetables?',
					 '8.On average, what portion of your weekly food budget is spent on fresh fruits and vegetables?',
					 '9.Are you interest in fresh home made condimends (Keeping health in concern)',
					 '10.As an end customer, I prefer for quality than for price, how would you agree to this statement?',
					 '11.Are you a Vegetarian or Non-Vegetarian?',
					 '12.Would you like to have special Hyderabad-Non veg items, from Hyderabad to be availed in Raichur?',
					 '13.Which would be your favourite hotel in Hyderabad for Non-veg food?',
					 '14.If Special Non-veg items from Hyderabad would be availed in Raichur, than at what intervals would you prefer?',
					 '15.It is Ok with you to pay delivery charges for Hyderabad Special Non-veg items,made avilable in Raichur?',
					 '16.Are you aware of organic/pesticide free food product?',
					 '17.Would you like to buy organic food products, if availed at your doorstep?',
					 'Studentcode'
					 ];

//var mongoXlsx = require('mongo-xlsx');
var fields = [  'name',
				'phone',
				'email',
				'address',
				'pincode',
				'aware', 
				'opinion', 
				'prefer',
				'spend',
				'recieve',
				'farmfresh',
				'buy',
				'average',
				'interest',
				'agree',
				'veg_nonveg',
				'special_Hyd',
				'favourite',
				'availed_in_Raichur',
				'delivery',
				'organic',
				'doorstep',
				'studentcode'
				];

var fs = require('file-system');
var secret ='kiran';
/*var CheckInDate=new Date();
		var d=CheckInDate.getDate();
		var m=CheckInDate.getMonth()+1;
		var y=CheckInDate.getFullYear();
		if (d < 10) 
		{
  		  d = '0' + d;
        }
        if (m < 10)
        {
          m = '0' + m;
        }
		CheckInDate=y+'-'+m+'-'+d;
var CheckOutDate=new Date();
var cd=CheckOutDate.getDate();
if(cd<=31)
{
 cd=cd+2;
}
else
{
cd=1;
}
		

		var cm=CheckOutDate.getMonth()+1;
		var cy=CheckOutDate.getFullYear();
		if (cd < 10) 
		{
  		   cd = '0' + cd;
        }
        if (cm < 10) 
        {
          cm = '0' + cm;
        }
		CheckOutDate=cy+'-'+cm+'-'+cd;*/

module.exports=function(router){




router.post('/users',function(req,res)
	{
		var user=new User();
		user.firstname=req.body.fname;
		user.lastname=req.body.lname;
		user.username=req.body.username;
		user.password=req.body.password;
		user.mobile=req.body.mobile;
		user.email=req.body.email;
		if(req.body.username==null||req.body.username==''||req.body.password==null||req.body.password==''||req.body.email==null||req.body.email=='')
		{
			res.json({success:false,message:'Ensure username or email and password were provided'});

		}
		else
		{

		user.save(function(err)
		{
				if(err)
				{
					if(err.errors != null)
					{
						if(err.errors.firstname)
						{
						return	res.json({success:false,message:err.errors.firstname.message});
						}
						else
						if(err.errors.lastname)
						{
						return	res.json({success:false,message:err.errors.lastname.message});
						}
						else
						if(err.errors.email)
						{
						return	res.json({success:false,message:err.errors.email.message});
						}
						else
						if(err.errors.username)
						{
						return	res.json({success:false,message:err.errors.username.message});
						}
						else
						if(err.errors.password)
						{
						return	res.json({success:false,message:err.errors.password.message});
						}
						if(err.errors.mobile)
						{
						return	res.json({success:false,message:err.errors.mobile.message});
						}
						else{
						return	res.json({success:false,message:err});
						}
					}
				    
		       	  else if(err)
					{
						if(err.code == 11000)
						{
				
				
							return	res.json({success:false, message:'username or email or phone number already exists  !!!'});
					
			
			
		 				}			
							else
							{
							return	res.json({success:false, message: err});
							}
			
						}
		
					}
		else
		{
	return	res.json({success:true, message:'user created !'});
	     }
	    });
		}
		
	});

    // Route to get the current user's permission level
    router.get('/permission', function(req, res) 
    {
        User.findOne({ username: req.decoded.username }, function(err, user) 
        {
            
               if(err) throw err;
                if (!user) {
                    res.json({ success: false, message: 'No user was found' }); // Return an error
                } else {
                    res.json({ success: true, permission: user.permission }); // Return the user's permission
                }
            });
        });
    
     // Route to get all users for management page
    router.get('/management', function(req, res) {
        User.find({}, function(err, uservalues) {
            if (err) {
              
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                User.findOne({ username: req.decoded.username }, function(err, mainUser) {
                    if (err) {
                      
                      if(err) throw err;
                        res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
                    } else {
                        // Check if logged in user was found in database
                        if (!mainUser) {
                            res.json({ success: false, message: 'No user found' }); // Return error
                        } else {
                            // Check if user has editing/deleting privileges 
                            if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                                // Check if users were retrieved from database
                                if (!users) {
                                    res.json({ success: false, message: 'Users not found' }); 
                                    // Return error
                                } else {
                                    res.json({ success: true, users: users, permission: mainUser.permission }); // Return users, along with current user's permission
                                }
                            } else {
                                res.json({ success: false, message: 'Insufficient Permissions' }); // Return access error
                            }
                        }
                    }
                });
            }
        });
    });

router.post('/surveysdata',function(req,res)
	{
		var surveytable=new Survey();
		surveytable.name=req.body.name;
		surveytable.phone=req.body.phone;
		surveytable.email=req.body.email;
		surveytable.address=req.body.address;
		surveytable.pincode=req.body.pincode;
		surveytable.aware=req.body.aware;
		surveytable.opinion=req.body.opinion;
		surveytable.prefer=req.body.prefer;
		surveytable.spend=req.body.spend;
		surveytable.recieve=req.body.recieve;
		surveytable.farmfresh=req.body.farmfresh;
		surveytable.buy=req.body.buy;
		surveytable.average=req.body.average;
		surveytable.interest=req.body.interest;
		surveytable.agree=req.body.agree;
		surveytable.veg_nonveg=req.body.veg_nonveg;
		surveytable.special_Hyd=req.body.special_Hyd;
		surveytable.favourite=req.body.favourite;
		surveytable.availed_in_Raichur=req.body.availed_in_Raichur;
		surveytable.delivery=req.body.delivery;
		surveytable.studentcode=req.body.studentcode;
		surveytable.organic=req.body.organic;
		surveytable.doorstep=req.body.doorstep;
		if(req.body.doorstep==null||req.body.doorstep==''||req.body.organic==null||req.body.organic==''||req.body.name==null||req.body.name==''||req.body.phone==null||req.body.phone==''||req.body.aware==null||req.body.aware==''||req.body.delivery==null||req.body.delivery==''||req.body.availed_in_Raichur==null||req.body.availed_in_Raichur==''||req.body.favourite==null||req.body.favourite==''||req.body.special_Hyd==null||req.body.special_Hyd==''||req.body.veg_nonveg==null||req.body.veg_nonveg==''||req.body.agree==null||req.body.agree==''||req.body.interest==null||req.body.interest==''||req.body.average==null||req.body.average==''||req.body.buy==null||req.body.buy==''||req.body.farmfresh==null||req.body.farmfresh==''||req.body.recieve==null||req.body.recieve==''||req.body.spend==null||req.body.spend==''||req.body.prefer==null||req.body.prefer==''||req.body.opinion==null||req.body.opinion=='')
		{
			res.json({success:false,message:'Ensure all fields  were provided'});

		}
		else
		{ 
               
  
				 surveytable.save(function(err)
               {	
					
					 if(err)
						{
				               if(err.code == 11000)
				               {
				               	console.log(err.errmsg);
				               	return	res.json({success:false, message:'Phone number already exists  !!!'});
				               }
				
							
					
			
			
		 				}
		 				else
		 				{
		 					 return	res.json({success:true, message:'survey created !'});
		 				}
					 

					
			
			
		});
			}
		
				    
	
	    });
				    
	
	    
			
	                
	


router.get('/surveysdata',function(req,res)
{
// get all the users
console.log('I recived a get request');
Survey.find(function(err, surveys) {
 
var csv = json2csv({ data: surveys, fields: fields ,fieldNames: fieldNames});
  	res.json(surveys);
        
		fs1.writeFile('file.csv', csv, function(err) {
  if (err) throw err;
  console.log('file saved');
});

 
});
});

router.get('/count',function(req,res)
{
	
		console.log('I recieved a get request controller 1')
		Survey.aggregate({$match:{eatAndDrink:"Daily",income:"10000"}},{$group:{_id:"$tagtype",count:{$sum:1}}},function(err,doc)
		 {
		console.log(doc);
		res.json(doc);
		 });

});
router.get('/downloads', function(req, res){
var path = require('path');
var mime = require('mime');
  var file = "file.csv";

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);


  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

router.get('/checkuser',function(req,res)
{
// get all the users
console.log('I recived a get request');
User.find({}, function(err, users) {
  if (err)
  	res.send(err);

  	res.json(users);
  

 
});
});


router.post('/authenticate',function(req,res){
User.findOne({ username:req.body.username}).select('firstname lastname  username email password mobile').exec(function(err,user)
{
	if(err) throw err;
	if(req.body.username==null||req.body.username==''||req.body.password==null||req.body.password=='')
		{
			res.json({success:false,message:'Ensure username or  password  were provided'});

		}
		else{
	if(!user)
	{
		return res.json({success:false,message:'Could not authenticate user . Please register first...'});
	}
	else if(user)
	{
		if(req.body.password)
		{
		var validPassword=user.comparePassword(req.body.password);
	          }
	          else
	          {
	          return	res.json({success:false,message:'No password provded !'});
	          }

		if(!validPassword)
		{
			return res.json({success:false,message:'Could not authenticate password'});
		}else
		{
			 var token= jwt.sign({username:user.username,email:user.email,firstname:user.firstname,lastname:user.lastname,mobile:user.mobile },secret,{ expiresIn:'24h'});
			  return res.json({success:true,message:'User authenticated !',token:token});
		}
	}
}

});
});


 router.use(function(req,res,next)
  {
  	var token=req.body.token||req.body.query||req.headers['x-access-token'];
  	if(token)
  	{
  		jwt.verify(token,secret,function(err,decoded)
  		{
  			if(err)
  			{
  				res.json({success:false,message:'Token invalid'});
  			}
  			else
  			{
  				req.decoded=decoded;
  				next();
  			}
  		});
  	}
  	else
  	{
  		res.json({success:false,message:'No token provided'});
  	}

  });

  
  router.post('/me',function(req,res)
  {
  	res.send(req.decoded);
  });



return router;
}