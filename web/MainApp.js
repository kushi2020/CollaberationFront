var myApp=angular.module("myApp",["ngRoute",'ngCookies']);
myApp.config(function($routeProvider)
		{
	$routeProvider.when("/",{
		templateUrl:"c_home/Home.html"})
	             .when("/Login",{templateUrl:"c_user/Login.html",controller:"UserTableController"})
	             .when("/Register",{templateUrl:"c_user/Register.html",controller:"UserTableController"})
	             .when("/Blog",{templateUrl:"c_blog/viewBlog.html",controller:"BlogController1"})
	               .when("/Bloglike",{templateUrl:"c_blog/bloglike.html",controller:"BlogController1"})
	             .when("/Blog1",{templateUrl:"c_blog/Blog1.html",controller:"BlogController1"})
	             .when("/bloglistNot",{templateUrl:"c_blog/listnotapproved.html",controller:"BlogController1"})
	             .when("/Forum",{templateUrl:"c_forum/Forum.html",controller:"ChatForumController"})
	             .when("/Job",{templateUrl:"c_job/Job.html",controller:"JobController"})
	              .when("/showapplied",{templateUrl:"c_job/show_Applied.html",controller:"JobController"})
	             .when("/Job_List",{templateUrl:"c_job/getalljob.html",controller:"JobController"})
	             .when("/search_job",{templateUrl:"c_job/search_job.html",controller:"JobController"})
	             .when("/view_job_details",{templateUrl:"c_job/view_job_details.html",controller:"JobController"})
                   .when("/select_reject",{templateUrl:"c_job/selectreject.html",controller:"JobController"})
	             .when("/Friend",{templateUrl:"c_friend/Friend.html",controller:"FriendController"})
	             .when("/searchfriend",{templateUrl:"c_friend/searchfriend.html",controller:"FriendController"})
	             // .when("/accept_request",{templateUrl:"c_friend/searchfriend.html",controller:"FriendController"})
	              .when("/viewfriend",{templateUrl:"c_friend/viewfriendrequest.html",controller:"FriendController"})
                 .when("/Users",{templateUrl:"c_user/UserTable.html",controller:"UserTableController"})	
                 .when("/Approve",{templateUrl:"c_user/adminnotapproved.html",controller:"UserTableController"})
		.otherwise({redirectTo:'/'});
		
		});

myApp.run(function($rootScope,$http,$location){
	$rootScope.logout = function() {
		console.log("logout")
	//	$scope.userLoggedIn="false"
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

	}


});
