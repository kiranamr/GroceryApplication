angular.module('appRoutes',['ngRoute']).config(function($routeProvider,$locationProvider)
{
$routeProvider
.when('/',{
	templateUrl:'app/views/pages/home.html'
})

.when('/aboutus',{
	templateUrl:'app/views/pages/aboutus.html'
})

.when('/success',{
	templateUrl:'app/views/pages/sucess.html'
})


.when('/survey',{
	templateUrl:'app/views/pages/dashboard.html',
	controller:'dashboardCtrl',
	controllerAs:'add'
	
	
})


.when('/register',{
	templateUrl:'app/views/pages/users/register.html',
	controller:'regCtrl',
	controllerAs:'register'
})
.when('/admin',{
	templateUrl:'app/views/pages/users/login.html',
	controller:'mainCtrl',
	controllerAs:'login'

})
.when('/viewSurveyReport',{
	templateUrl:'app/views/pages/viewpage.html',
	controller:'viewpageCtrl',
	controllerAs:'viewpage'

})

.when('/logout',{
	templateUrl:'app/views/pages/users/logout.html'
})
.when('/profile',{
	templateUrl:'app/views/pages/users/profile.html'
})

.otherwise({redirectTo:'/'});
$locationProvider.html5Mode({
	enabled:true,
	requireBase:false
});
});  
