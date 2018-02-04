var module=angular.module("paginationApp",[]);
module.controller("paginationCtrl",function($scope){
	$scope.allItems=$scope.products;
	$scope.$on('products',function(event,data){
		$scope.allItems=data.res;
		$scope.setPage(1);
	});
	
	$scope.getPage=function(totalItems,currentPage,pageSize){
		var currentPage=currentPage || 1;
		var pageSize=pageSize || 6;
		var totalPage=Math.ceil(totalItems/pageSize);
		var startPage=null;
		var endPage=null;
		if(totalPage<=10)
		{
			startPage=1;
			endPage=totalPage;
		}
		else
		{
			if(currentPage<=6)
			{
				startPage=1;
				endPage=10;
			}
			else
				if(currentPage+4>totalPage)
				{
					startPage=totalPage-9;
					endPage=totalPage;
				}
				else
				{
					startPage=currentPage-5;
					endPage=currentPage+4;
				}
			}
			var pages=[];//масив сторінок
			for(var i=startPage; i<=endPage; i++)
				pages.push(i);
			var startIndex=(currentPage-1)*pageSize;
			var endIndex=Math.min(startIndex+pageSize-1,totalItems-1);
			return {
				pages:pages,
				currentPage:currentPage,
				startPage:startPage,
				endPage:endPage,
				startIndex:startIndex,
				endIndex:endIndex,
				totalItems:totalItems,
				pageSize:pageSize,
				totalPage:totalPage
			};
		};
		$scope.objPage={};
		$scope.setPage=function(page){
			$scope.objPage=$scope.getPage($scope.allItems.length,page);
			$scope.items=$scope.allItems.slice($scope.objPage.startIndex,$scope.objPage.endIndex+1);
		};
		$scope.setPage(1);
	});