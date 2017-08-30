
myApp.controller("UserTableController",[
                						'$scope','$rootScope','$cookies','$location',
                						             						
                						'$http',
                				function($scope,$rootScope,$cookies,$location,$http){
                							var self=this;
     
                							$scope.blogdata3=[];            							
	$scope.blog={firstname:"",lastname:"",possword:"",emailid:"",role:"",status:"",isonline:"",errorCode:"",errorMessage:""};
	$scope.currentUser={firstname:"",lastname:"",possword:"",emailid:"",role:"",status:"",isonline:"",errorCode:"",errorMessage:""};
	$http.get('http://localhost:8088/sol/getusertable')
     .then(function(response){
    	 $scope.blogdata=response.data;
    	 console.log(" job search_job"+response.data);
     
     });
	
	$http.get('http://localhost:8088/sol/getusersnotapproved')
    .then(function(response){
    	 $scope.blogdata3=response.data;
   	console.log("in get user who are not approved"+response.data);
   	 
    
    });
	$scope.sendFriendRequest1= function(userid){
	       return $http.post('http://localhost:8088/sol/adminupdate/'+userid)
	               .then(
	                       function(response){
	                       	if(response.data.errorCode=="404")
	                       	{
	                       		alert(response.data.errorMessage)
	                       	}
	                       	$scope.blogdata= response.data;
	                       	alert('Request Update Successfully');
	                       	$location.path('/');
	                       }, 
	                       function(errResponse){
	                           console.log('Error while creating friend');
	                           
	                       }
	               );
	}
	
	$scope.saveBlogPost=function(){
		$http.post('http://localhost:8088/sol/insertusertable',this.blog)
		.then(function(response)
				{
			if(response.data.errorCode=='404')
				{
				 alert('There is some error')
				}
			else{
			 alert('Thankyou for registration');
			$scope.message="successfully registered";
				$location.path("/")
			}
				},
				function(errResponse){
					console.error('Error while creating user')
				}
				);
	}

   
	$scope.user=
		{
			
			firstname:"",
			possword:"",
			emailid:"",
			role:""
		}
	/*$scope.login = function() 
		{
			console.log('login validation????????',
					$scope.blog);
			$scope.authenticate($scope.blog);
		}
	
	$scope.authenticate = function(blog) {
		console.log("authenticate...")
		userservice
				.authenticate(blog)
				.then(

						function(d) {

							$scope.blog = d;
							console
									.log("blog.errorCode: "
											+ $scope.blog.errorCode)
							if ($scope.blog.errorCode == "404")

							{
								alert($scope.blog.errorMessage)

								$scope.blog.id = "";
								$scope.blog.password = "";

							} else { // valid
										// credentials
								console
										.log("Valid credentials. Navigating to home page")
                               self.userLoggedIn="true"
								

								console
										.log('Current user : '
												+ $scope.blog)
								$rootScope.currentUser = $scope.blog
								$cookie.put(
										'currentUser',
										$scope.blog);

								
								$location
										.path('/');

							}
						}     
                          
                         )}*/
	$scope.login=function(blog)
	{
		$http.post('http://localhost:8088/sol/login',blog)
		.then(function(response){
			$scope.user=response.data;
			console.log($scope.user.errorMessage);
			console.log($scope.user.errorCode);
			$scope.mess=$scope.user.errorMessage;
			if ($scope.user.errorCode == "404")

			{
				alert($scope.user.errorMessage)

				$scope.user.id = "";
				$scope.user.password = "";

			} else { // valid
						// credentials
				console.log("Valid credentials. Navigating to home page")
               
				console.log('Current user : '
								+ $scope.user)
				console.log('user firstname' +$scope.user.firstname)				
				$rootScope.currentUser = $scope.user
				console.log($rootScope.currentUser.firstname)
				/*$cookies.put(
						'currentUser',
						$scope.user);*/

					$location
						.path('/');

			}

		});
				
		
	}
/*	$rootScope.logout = function() {
		console.log("logout")
		$scope.userLoggedIn="false"
		$rootScope.currentUser = {};
	//	$cookies.remove('currentUser');
		console.log("logout in the logout")
		$http.get('http://localhost:8088/sol/logout')
        .then(
                function(response){
                    return response.data;
                }, 
               null
               );
		$location.path('/');

	}*/

	
}]);



