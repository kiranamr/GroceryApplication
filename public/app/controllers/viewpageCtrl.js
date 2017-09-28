angular.module('viewpageControllers',[])
		.controller('viewpageCtrl',function($scope,Survey,$http)
		{
		 		 $scope.surveys={};
		 		 console.log($scope.surveys);
			   	 var app=this;
		     	
				 Survey.getUsers().then(function(data)
				 {
				   		console.log(data); 
				        $scope.surveys=data.data;			      
				        console.log($scope.surveys);
				 });
				
		
});