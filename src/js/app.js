/**
 * Created by liuzhencai on 16/6/3.
 */
var app = angular.module('main', ['ngRoute']);
app.controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe2asasd";
});
//
//app.config(function($routeProvider){
//    $routeProvider.when('/hello',{
//        templateUrl:'tpls/hello.html',
//    }).otherwise({
//        redirecTo:'/hello'
//    })
//})


app.run(function($templateCache) {
    $templateCache.put('templateId.html', 'This is the content of the template');
});
app.config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/',{template:'这是首页页面'})
            .when('/computers',{template:'这是电脑分类页面'})
            .when('/printers',{template:'这是打印机页面'})
            .otherwise({redirectTo:'/printers'});
    }]);

app.directive('hello',function(){
    return {
        restrict:"AEMC",
        //template:'<div>hello!asdasdasdasdadsadsasda!!!!!!!</div>',
        template:$templateCache.get('templateId.html'),

        replace:true
    }
})