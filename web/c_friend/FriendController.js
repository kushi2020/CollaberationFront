myApp.controller("FriendController",['$scope','$http','$location','FriendService',function($scope,$http,$location,FriendService){
	
	$scope.blog={userid:"",status:""};
	$scope.user={firstname:"",lastname:"",role:""}
	$scope.users=[];
	var self = this;
	$scope.friendrequest=[];

	$http.get('http://localhost:8088/sol/getfriend')
     .then(function(response){
         $scope.blogdata=response.data;
    	 
    	 
     });
     
   $scope.saveFriendPost=function(){
		$http.post('http://localhost:8088/sol/insertfriend',$scope.blog)
		.then(function(response)
				{
			$scope.message="successfully blog added";
			$location.path('/');
				}
				);
	}
/*	function listOfSuggestedUsers(){
   $scope.suggestedUsers =FriendService.suggestedUsers()
   .then(function(d){
	   console.log('friendcontroller'+d.firstname)
      $scope.users=d;
   
   }, function(response) {
			console.log(d.firstname);
		})
}*/
   function listOfSuggestedUsers(){
	   $scope.suggestedUsers =FriendService.suggestedUsers()
	   .then(function(response){
		  /* if(response.data.errorCode==404)
			   {
			    alert(response.data.errorMessage)
			   }*/
		   console.log('friendcontroller'+response.data[0].firstname)
	      $scope.users=response.data;
		  
	   
	   }, function(response) {
				console.log('error');
			})
	}
	

   $scope.getMyFriends= function() {
       $http.get('http://localhost:8088/sol/myFriends')
               .then(
                       function(response){
                       	if(response.data.errorCode==='404')
                       		{
                       		  alert(response.data.errorMessage)
                       		}
                       	$scope.blogdata= response.data;
                       }, 
                      null
               );
}
   
   
   
   $scope.sendFriendRequest= function(friendID){
       return $http.get('http://localhost:8088/sol/addFriend/'+friendID)
               .then(
                       function(response){
                       	if(response.data.errorCode=="404")
                       	{
                       		alert(response.data.errorMessage)
                       	}
                       	$scope.blogdata= response.data;
                       	alert('request has been sent');
                       	$location.path('/');
                       }, 
                       function(errResponse){
                           console.log('Error while creating friend');
                           
                       }
               );
}
   $scope.getMyFriendRequests=function(){
        $http.get('http://localhost:8088/sol/getMyFriendRequests/')
               .then(
                       function(response){
                    	 //  $scope.f1=response.data;
                    	  if(response.data[0].errorCode=='404')
                    		  {
                    		  console.log('in getmyfriendrequest 404');
                    		  alert(response.data[0].errorMessage);
                    		  }
                    	  else{ $scope.friendrequest= response.data;
                    	   console.log("getmyfriendrequest---->"+response.data)
                    	  }
                    	   console.log(response.data.errorMessage);
                       }, 
                       function(errResponse){
                           console.log('Error while creating friend');
                          
                       }
               );
}
   $scope.acceptFriendRequest= function(friendID){
   	console.log("Starting of the method acceptFriendRequest")
        $http.put('http://localhost:8088/sol/accepttFriend/'+friendID)
               .then(
                       function(response){
                    	   $scope.blogdata=response.data;
                       }, 
                       function(errResponse){
                           console.log('Error while creating acceptFriendRequest');
                           
                       }
               );
}
   $scope.rejectFriendRequest=function(friendID){
   	console.log("Starting of the method rejectFriendRequest")
       return $http.put('http://localhost:8088/sol/rejectFriend/'+friendID)
               .then(
                       function(response){
                    	   $scope.blogdata= response.data;
                    	   alert('Friend request has been rejected successfully')
                    	   $location.path('/viewfriend')
                       }, 
                       function(errResponse){
                           console.log('Error while rejectFriendRequest');
                           
                       }
               );
}
   $scope.unFriend= function(friendID){
		console.log("Starting of the method unFriend")
	    return $http.get('http://localhost:8088/sol/unFriend/'+friendID)
	            .then(
	                    function(response){
	                    	$scope.blogdata=response.data;
	                    }, 
	                    function(errResponse){
	                        console.log('Error while unFriend ');
	                        
	                    }
	            );
	}

   listOfSuggestedUsers();
  // getMyFriendRequests();
}]);



