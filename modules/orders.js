var module=angular.module("ordersApp",[]);
module.controller("ordersCtrl",function($scope,$http){
	$scope.orders=[];
	$scope.loadOrders=function(){
		$http.get('/loadOrders',).then(function(data){
			$scope.orders=data.data;
			console.log($scope.orders)
		});
	};
	$scope.loadOrders();

	$scope.successOrder=function(order,event){
		// $http.post('/successOrder',order).then(function(data){
		// 	$scope.loadProducts();
			
		// });
		console.log(event);
		console.log(event.altkey)
	};
});