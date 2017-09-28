angular.module('userServices',[])
.factory('User',function($http)
{
	var userFactory={};

	userFactory.create=function(regData)
	{
		return $http.post('/api/users',regData);
	};
	  userFactory.getUsersAll=function()
	 {
	 		return $http.get('/api/checkuser');
	 };

	return userFactory;
});

