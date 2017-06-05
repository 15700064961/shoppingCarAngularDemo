var app = angular.module('myApp', []);
app.controller('mycontroller', function($scope) {
   $scope.date = new Date();
    setInterval(function(){
        $scope.$apply(function(){
            $scope.date = new Date();
        })
    },1000)
    $scope.name = '张三';
    $scope.count = 0;
    $scope.$watch('name',function(newValue,oldValue){
        ++$scope.count;
        if($scope.count > 5){
            $scope.name = 'over'
        }
    })
});
app.controller("carcontroller",function($scope){
    $scope.cart = [
        {
            id:1000,
            name:'iphone5',
            quantity:3,
            price:4300
        },
        {
            id:3000,
            name:'iphone5s',
            quantity:6,
            price:4100
        }, 
        {
            id:4400,
            name:'iphone6',
            quantity:12,
            price:5000
        },
        {
            id:5500,
            name:'iphone7',
            quantity:8,
            price:3000
        },             
    ];

    //总购买价
    $scope.totalPrice = function(){
        var total = 0;
        angular.forEach($scope.cart,function(item){
            total += item.quantity * item.price;
        })
        return total;
    }
    //产品总价
    $scope.totalNumber = function(){
        var number = 0;
        angular.forEach($scope.cart,function(item){
            number += parseInt(item.quantity)
        })
        return number;
    }
    //找一个元素的索引
    var findIndex = function(id){
        var index = -1;
        angular.forEach($scope.cart,function(item,key){
            if(item.id === id){
                index = key;
                return;
            }
        }); 
        return index;      
    }
    $scope.remove = function(id){
        var index = findIndex(id);
        if(index !== -1){
            $scope.cart.splice(index,1);
        }
    }
    //增加产品
    $scope.add = function(id){
        var index = findIndex(id);
        if(index !== -1){
            ++$scope.cart[index].quantity;
        }
    }
    //减少产品
    $scope.reduce = function(id){
        var index = findIndex(id);
        if(index !==-1 && $scope.cart[index].quantity > 1){
            --$scope.cart[index].quantity;
        }else{
            var returnKey = confirm("从购物车内删除该商品!")
            if(returnKey){
                $scope.remove(id);
            }
        }
    }
})