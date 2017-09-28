angular.module('surveyServices',[])
.factory('Survey',function($http)
{
	var surveyFactory={};


	surveyFactory.create=function(regData)
	{
		return $http.post('/api/surveysdata',regData);

	};
	
	 surveyFactory.getUsers=function()
	 {
	 		return $http.get('/api/surveysdata');
	 };
	
	
	return surveyFactory;

}); 


  