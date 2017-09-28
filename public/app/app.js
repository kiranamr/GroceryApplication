angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate','mainControllers','authServices','surveyServices','viewpageControllers','dashboardControllers'])
.config(function($httpProvider)
{
	$httpProvider.interceptors.push('AuthInterceptors');

});
