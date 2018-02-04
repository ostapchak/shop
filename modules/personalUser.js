var module=angular.module("personalUserApp",[]);
module.controller("personalUserCtrl",function($scope,$http){
	$scope.modal={view:"views/loginModal.html"};
	$scope.user=[];
	$scope.LogRegForm=true;
	$scope.visible=true;
	$scope.cabinet={linkName:"увійдіть в особистий кабінет"};
	$scope.loadPersonalUser=function(){
		$http.get('/loadPersonalUser',).then(function(data){
			console.log(data.data);
			$scope.user=data.data;
			if(data.data)
			{
				$scope.visible=false;
				$scope.cabinet.linkName=$scope.user.username;
			}
			else
			{
				$scope.visible=true;
			}
		});
	};
	$scope.loadPersonalUser();

	$scope.loadLoginForm=function(){
		$scope.LogRegForm=true;
	};

	$scope.loadRegForm=function(){
		$scope.LogRegForm=false;
	};

});


module.directive("compareTo", function() {
	return {
		require: "ngModel",
		scope: {
			otherModelValue: "=compareTo"
		},
		link: function(scope, element, attributes, ngModel) {

			ngModel.$validators.compareTo = function(modelValue) {
				return modelValue == scope.otherModelValue;
			};

			scope.$watch("otherModelValue", function() {
				ngModel.$validate();
			});
		}
	};
}
);
