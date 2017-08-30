myApp.factory('userservice' ,['$scope','$http',function($scope,$http) {
	var userservice={};
	

	userservice.suggested= function(user){
 	   console.log("Calling the method authenticate with the user :"+user)
		 
      $http.post('http://localhost:8088/sol/login',user)
             .then(
                     function(response){
                         return response.data;   //user json object
                     }
                    
             );
}
	

}]);