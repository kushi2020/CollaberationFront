myApp.service("ChatForumService", function($q, $timeout,$rootScope) {
	console.log('ChatForumService')
	var service = {}
	var listener = $q.defer()
	var socket = {
		client : null,
		stomp : null
	}
	
	//Simple Text Oriented Message Protocol
	var messageIds = [];

	service.RECONNECT_TIMEOUT = 30000;
	service.SOCKET_URL = "/sol/chat_forum";
	service.CHAT_TOPIC = "/topic/message";
	service.CHAT_BROKER = "/app/chat_forum";

	service.receive = function() { // this receive method will call from
									// ChtforumController
		console.log("receive")
		console.log("in service listener.promise:" + listener.promise)
		return listener.promise;
	};

	service.send = function(message) { // this send method will call from
										// ChtforumController
		console.log("in service send")
		var id = Math.floor(Math.random() * 1000000);

		socket.stomp.send(service.CHAT_BROKER, { // send(destination, {},
													// body);
			priority : 9
		}, JSON.stringify({
			id : id,
		    userID : $rootScope.currentUser.firstname,
		    message : message

		}));
		console.log("in service message: " + message)
		console.log("id : " + id)
		messageIds.push(id);
	};

	var reconnect = function() {
		console.log("in service reconnect")
		$timeout(function() { // wrapper window.setTimeout :: $timeout([fn],
								// [delay], [invokeApply], [Pass]);
			initialize(); // invokeApply true or false : false -> skip dirty
							                    // checking
		}, this.RECONNECT_TIMEOUT); // Pass - addition parameters if any
	};

	var getMessage = function(data) {
		console.log("in service getMessage")
		console.log("in service data:" + data)
		var message = JSON.parse(data)
		var out = {};
		out.message = message.message;
		out.time = new Date(message.time);
		out.userID = message.userID;
		/* if (_.contains(messageIds, message.id)) { */
		/*
		 * if (_.includes (messageIds, message.id)) { out.self = true;
		 * messageIds = _.remove(messageIds, message.id); }
		 */
		console.log("in service data:" + data)
		console.log("in service message:" + message.message)
		console.log("in service time :" + message.time)
		console.log("in service userID :" + message.userID)

		return out;
	};
	// //subscribe(destination, callback, { id: mysubid });
	var startListener = function() {
		//console.log("in service startListener")
		socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
			listener.notify(getMessage(data.body));
		});
	};

	var initialize = function() {
		console.log("in service initialize")
		socket.client = new SockJS(service.SOCKET_URL);
		socket.stomp = Stomp.over(socket.client);
		socket.stomp.connect({}, startListener); // connect(headers,
													// connectCallback,
													// errorCallback);
		socket.stomp.onclose = reconnect; //
	};

	initialize(); // to call first time excplicitly.
	return service;
});

/*
 * var headers = { login: 'mylogin', passcode: 'mypasscode', // additional
 * header 'client-id': 'my-client-id' };
 */

