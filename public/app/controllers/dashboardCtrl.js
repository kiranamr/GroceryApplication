angular.module('dashboardControllers',[])
.controller('dashboardCtrl',function($scope,$timeout,Survey,$location,$http)
{
  $scope.surveys=[];
   $scope.surveys1=[];
  
     $scope.IsVisiblevalues = false;
            $scope.Showvalues = function (value) {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisiblevalues = value =="Non-Vegetarian";

            }

    $scope.IsVisibleHotel = false;
            $scope.ShowPassport = function (value) {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisibleHotel = value =="others";

            }
            $scope.IsVisibleSpecial = false;
            $scope.ShowPassportSpecial = function (value1) {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisibleSpecial = value1 =="otherspecial";

            }
    
  console.log($scope.surveys);
	   var app=this;
     app.loading=true;
    app.errorMsg=false;
    app.successMsg=false;
  var app=this;
  app.regSurvey=function(regData)
  {  
    app.loading=true;
    app.errorMsg=false;
    app.successMsg=false;
  console.log('form submitted');
  
  Survey.create(app.regData).then(function(data) 
  {

         console.log(data.data.success); 
         console.log(data.data.message);
         if(data.data.success)
         {
          //app.loading=false;
             // app.successMsg=alert(data.data.message); 
              $timeout(function(){$location.path('/success');
               window.location.reload(true);
            

                
                },2000);

         } 
         else 
         {
          
             //app.loading=false;
               app.errorMsg=alert(data.data.message);
                 $timeout(function(){$location.path('/survey');
              
            

                app.errorMsg=false;
                },3000);
         }

  });


};
  
});