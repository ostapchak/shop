var module=angular.module("categoryApp",[]);
module.controller("categoryCtrl",function($scope,$http){
	$scope.categories=[];
	$scope.loadCategories=function(){
		$http.get('/loadCategories').then(function(data){
			$scope.categories=data.data;
			$scope.button.category="Додати";
			$scope.newCategory={};
			$scope.selectCategory="";
		});
	};
	$scope.loadCategories();
	//$scope.newCategory={};

	$scope.pressUpdate=function(item){
		$scope.newCategory=item;
		$scope.button.category="Оновити";
	};

	$scope.saveCategory=function(item){
		if(item._id)
			$scope.updateCategory(item);
		else
			$scope.addCategory(item);
	};

	$scope.addCategory=function(category){
		if(!category.name)
		{
			alert("Поле не повинно бути пусте!");
			return
		}
		$http.post('/addCategory',category).then(function(data){
			$scope.loadCategories();
			$scope.newCategory={};
		});
	};

	$scope.updateCategory=function(category){
		if(!category.name)
		{
			alert("Поле не повинно бути пусте!");
			return
		}
		$http.post('/updateCategory',category).then(function(data){
			$scope.loadCategories();
			$scope.newCategory={};
		});
	};
	
	$scope.delCategory=function(item){
		$http.post('/delCategory',item).then(function(data){
			$scope.loadCategories();
		});
	};
});


