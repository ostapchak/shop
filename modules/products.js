var module=angular.module("productsApp",[]);

module.directive('currentItem', function() {
	return function(scope, element, attrs) {
		element.on('load',function(e){
			var path=e.target.contentDocument.body.innerHTML;
			scope.$apply(function(){
				scope.newProduct.path=path;
			})
		})
	}
});

module.controller("productsCtrl",function($scope,$http,$rootScope){
	$scope.products=[];
	$scope.loadProducts=function(obj){
		$http.post('/loadProducts',obj).then(function(data){
			console.log(data.data);
			$scope.products=data.data;
			$scope.button={name:"Додати"};//Зміна кнопки
			$rootScope.$broadcast('products',{res:$scope.products});
		});
	};
	$scope.loadProducts();

	//Перевіряє яку кнопку ми натиснули, додати чи редагувати
	$scope.addOrUpdate=function(item){
		$scope.newProduct=item || {};
		if(!item)
			$scope.button.name="Додати";
		else 
			$scope.button.name="Оновити";
		$scope.showAddProduct();
	};
	//Вибарає додавати чи редагувати
	$scope.saveProduct=function(item){
		if(item._id)
			$scope.updateProduct(item);
		else
			$scope.addProduct(item);
		
	};
	//Додати продукт
	$scope.addProduct=function(item){
		$http.post('/addProduct',item).then(function(data){
			$scope.loadProducts();
			$scope.showAdminProducts();
			console.log($scope.path)
		});
	};
	//Редагувати продукт
	$scope.updateProduct=function(item){
		$http.post('/updateProduct',item).then(function(data){
			$scope.loadProducts();
			$scope.showAdminProducts();
		});
	};
	//Видалити продукт
	$scope.delProduct=function(item){
		$http.post('/delProduct',item).then(function(data){
			$scope.loadProducts();
		});
	};

});


