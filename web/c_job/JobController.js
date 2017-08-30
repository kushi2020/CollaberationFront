myApp.controller("JobController",["$scope","$location","$rootScope","$http",function($scope,$location,$rootScope,$http){
	$scope.blog={jobprofile:"",jobdesc:"",qualification:"",status:""};
	$scope.job=[];
	$http.get('http://localhost:8088/sol/getjob')
     .then(function(response){
         $scope.blogdata=response.data;
    	 
    	 
     });
	$http.get('http://localhost:8088/sol/getappliedjob1/')
    .then(function(response){
        $scope.blogdata2=response.data;
   	 
   	 
    });

	
   $scope.saveBlogPost=function(){
		$http.post('http://localhost:8088/sol/insertjob',$scope.blog)
		.then(function(response)
				{
			alert('successfully job added')
			$scope.message="successfully job  added";
			$location.path('/');
				}
				);
	}
  
   $scope.getJobDetails=function(jobid){
	   $http.get('http://localhost:8088/sol/getjobdetails/'+jobid) 
	    .then(function(response){
	    	$rootScope.selectedjob=response.data;
	    	$location.path('/view_job_details');
	    });
   }
   
   $scope.applyForJob= function(jobID) {
	   console.log("----->")
      $http.post("http://localhost:8088/sol/applyForJob/"+jobID)
               .then(
            		  
                       function(response){
                    	   console.log("----in applyForJob function")
                          $scope.jobs= response.data;
                          alert($scope.jobs.errorMessage)
                       }, 
                      null
               );
   }
   $http.get('http://localhost:8088/sol/listofjob')
   .then(function(response){
       $scope.blogdata1=response.data;
  	 
  	 
   });
   $scope.update=function(id)
	{
		$http.put('http://localhost:8088/sol/updatejob1/'+id)
	     .then(function(response){
	    	 $scope.g=response.data;
	    	 	     alert("called for interview successfully");
	    	 console.log("approved blog");
	    	 $location.path('/select_reject');
	     
	     },
	     function(errResponse){
	    	 console.error('while fetching');
	     }
	     );
	}
   
   $scope.deletejob=function(id)
	{
		$http.put('http://localhost:8088/sol/deleteJob1/'+id)
	     .then(function(response){
	    	 $scope.g=response.data;
	    	 	     alert("You are rejected for the job ");
	    	 console.log("approved blog");
	    	 $location.path('/select_reject');
	     
	     },
	     function(errResponse){
	    	 console.error('while fetching');
	     }
	     );
	}
	
}]);



