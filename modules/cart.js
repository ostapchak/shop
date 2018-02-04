var module=angular.module("cartApp",[]);
module.controller("cartCtrl",function($scope,$http){
	$scope.cart=[];//масив продуктів в корзині
	$scope.newOrder={};
	$scope.addProductCart=function(item){
		var pos=$scope.cart.indexOf(item);
		if(pos==-1){
			item.newcount=1;
			item.newprice=item.price;
			$scope.cart.push(item);
		}
		else
			alert("Даний товар вже додано в корзину!")
	};
	$scope.plusCount=function(item){
		if(item.newcount+1>item.count){
			alert("Вибачте, не можна замовити більше!");
			return;
		}
		item.newcount++;
		item.newprice+=item.price;
	};
	$scope.minusCount=function(item){
		if(item.newcount-1==0){
			$scope.deleteProduct(item);
			return;
		}
		item.newcount--;
		item.newprice-=item.price;
	};
	$scope.deleteProduct=function(item){
		var pos=$scope.cart.indexOf(item);
		$scope.cart.splice(pos,1);
	};
	//загальна сумав корзині
	$scope.sumTotal=function(){
		var total=0;
		for(var i=0;i<$scope.cart.length;i++)
			total+=$scope.cart[i].newprice;
		return total;
	}
	$scope.addNewOrder=function(order,cart){
		
		
		$http.post('/newOrder',{order,cart}).then(function(data){
			
		});
	}
});