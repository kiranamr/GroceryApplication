angular.module('mainControllers',['authServices'])
.controller('mainCtrl',function(Auth,$timeout,$location,$rootScope)
{
	var app=this;

 	 app.loadme=false;
	$rootScope.$on('$routeChangeStart',function()
	{
		if(Auth.isLoggedIn())
	{
		console.log('Success:User is logged in .');
		app.isLoggedIn=true;
		Auth.getUser().then(function(data)
		{
			console.log(data);
			console.log(data.data.username);
			app.username=data.data.username;
			app.useremail=data.data.email;
			app.usermobile=data.data.mobile;
			app.userfirstname=data.data.firstname;
			app.userlastname=data.data.lastname;
			app.loadme=true;
		});
		  
	}
	else
	{
		console.log('Failure :User is Not logged in .');
		app.isLoggedIn=false;
		app.username='';
		app.loadme=true;
	}

	});
	
	app.doLogin=function(loginData)
	{  
		app.loading=true;
		app.errorMsg=false;
		app.successMsg=false;
	console.log('form submitted')  
	
	Auth.login(app.loginData).then(function(data) 
	{

         console.log(data.data.success);
         console.log(data.data.message);
         if(data.data.success)
         {
         	
              app.successMsg=alert(data.data.message);
              $timeout(function(){$location.path('/viewSurveyReport');
              window.location.reload(true);
              	app.successMsg=false;},3000);
         } 
         else
         {
         	   
               app.errorMsg=alert(data.data.message);
               $timeout(function(){$location.path('/admin');
               window.location.reload(true);
         	  

              	app.errorMsg=false;
              	},3000);
         }

	});
};
app.logout=function()
 {
 	Auth.logout();
 	$location.path('/logout');
 	$timeout(function()
 	{
 		$location.path('/');
 	},2000); 
 };
});