var module=angular.module("mainApp",["productsApp","cartApp","categoryApp","paginationApp","ordersApp","personalUserApp"]);
module.controller("mainCtrl",function($scope,$http){
	$scope.current={
		view:"views/products.html",
		heading:"Товари магазину"
	};
	
	$scope.showCart=function(){
		$scope.current.view="views/cart.html";
		$scope.current.heading="Корзина";
	};

	$scope.showProducts=function(){
		$scope.current.view="views/products.html";
		$scope.current.heading="Товари магазину";
	};
	
	$scope.showAdminProducts=function(){
		$scope.current.view="views_admin/admin_products.html";
		$scope.current.heading="Адміністрування";
	};

	$scope.showAdminCategory=function(){
		$scope.current.view="views_admin/admin_category.html";
		$scope.current.heading="Адміністрування";
	};

	$scope.showAdminOrders=function(){
		$scope.current.view="views_admin/admin_orders.html";
	};

	$scope.showAddProduct=function(item){
		$scope.current.view="views_admin/add_products.html";
	};
	


});
