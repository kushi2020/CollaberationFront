myApp.factory('FriendService',function($http)
		{
	  var friendService={};
	  friendService.suggestedUsers=function(){
		 return $http.get('http://localhost:8088/sol/listAllUsersNotFriends')
		 
	  }
	  return friendService;
		})