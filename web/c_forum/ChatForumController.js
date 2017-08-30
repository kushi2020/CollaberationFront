myApp.controller("ChatForumController", function($scope, ChatForumService) {
	console.log('ChatForumController')
  $scope.messages = [];
  $scope.message = ""
  $scope.max = 50;
  $scope.addMessage = function() {
	  console.log("in chatforumcontroller addMessage")
    ChatForumService.send($scope.message);
    $scope.message = "";
  };

  ChatForumService.receive().then(null, null, function(message) {
	  console.log("in chatforumcontroller receive")

    $scope.messages.push(message);  // this messages we have to display in html text area
  });
});