myApp.controller("BlogController1",function($scope,$http,$location){
	$scope.blog={title:"",description:""};
	$scope.b=[];
	$scope.g={title:"",description:"",likes:"",dislike:""};
	$http.get('http://localhost:8088/sol/getBlog')
    .then(function(response){
        $scope.blogdata=response.data;
        console.log($scope.blogdata[0].id);
        console.log("data");
   	 
   	 
    });
	
	$http.get('http://localhost:8088/sol/listofBlogs')
    .then(function(response){
        $scope.blogdata1=response.data;
   	 
   	 
    });
	$http.get('http://localhost:8088/sol/getBloglike')
	.then(function(response){
		$scope.blogdata2=response.data;
	});
			
	
	
	
	
	
	$scope.save=function()
	{
		$http.post('http://localhost:8088/sol/saveblog',$scope.blog)
	     .then(function(response){
	    	// $scope.g=response.data;
	    	
	    	 if(response.data.errorCode=='404')
	    		 {
	    		 
	    		 alert(response.data.errorMessage);
	    		 
	    		 }
	    	 else
	     {$scope.msg="save successfully";
	         alert('sucessfully saved')
	    	 console.log("save blog");
	    	 $location.path('/');
	     }
	     },
	     function(errResponse){
				console.error('Error while creating user')
			}
	     );
	}
	$scope.update=function(id)
	{
		$http.put('http://localhost:8088/sol/update/'+id)
	     .then(function(response){
	    	 $scope.g=response.data;
	    	 	     alert("Approved successfully");
	    	 console.log("approved blog");
	    	 $location.path('/bloglistNot');
	     
	     },
	     function(errResponse){
	    	 console.error('while fetching');
	     }
	     );
	}
	$scope.delete1=function(id)
	{
		$http.put('http://localhost:8088/sol/deleteBlog/'+id)
	     .then(function(response){
	    	 $scope.g=response.data;
	    	 	     alert("Not Approved ");
	    	 console.log("approved blog");
	    	 $location.path('/bloglistNot');
	     
	     },
	     function(errResponse){
	    	 console.error('while fetching');
	     }
	     );
	}

	$scope.likeinc=function(blog){
        
        blog.likes++;
        console.log('likes'+blog.likes);
        $http.put('http://localhost:8088/sol/updatelike',blog);
        }
        $scope.dislikeinc=function(blog)
        {
         blog.dislike++;
         console.log('dislike'+blog.dislike);
         $http.put('http://localhost:8088/sol/updatelike',blog);
        }
	
	

}
);