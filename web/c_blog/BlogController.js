myApp.controller("BlogController",function($scope,$http){
   
	$scope.blog={blogid:2007,blogname:"",blogcontent:""};
	
	
	$http.get('http://localhost:8088/sol/getBlogs')
     .then(function(response){
         $scope.blogdata=response.data;
    	 
    	 
     });
     
	$scope.saveBlogPost=function(){
		$http.post('http://localhost:8088/sol/insertBlog',$scope.blog)
		.then(function(response)
				{
			$scope.message="successfully blog added";
				}
				);
	}
	
});



