'use strict';

angular
        .module('tutorialApp', ['ngAnimate', 'ngRoute'])               
        .factory('Cart', CartFactory)
        .controller('ArticlesCtrl', ArticlesController)
        .controller('CartCtrl', CartController)
        .directive('price', PriceFunction)
        .config(RouteFunction)

function CartFactory(){
    var items = [];

    var actions = {
      getItems: getItems,
      addArticle: addArticle,
      sum: sum
    };
    return actions;
    
    function getItems()
    {
        return items;
    };
    
    function addArticle(article){
        items.push(article);
    };
    
    function sum()
    {
        return items.reduce(function(total, article) {
                return total + article.price;
            }, 0);
    }
    
    
};

function ArticlesController($scope, $http, Cart)
{
   $http.get('data/articles.json').then(function(articleResponse) {
       $scope.cart = Cart;
       $scope.articles = articleResponse.data; 
   });
};

function CartController($scope, Cart)
{
    $scope.cart = Cart;
};

function PriceFunction()
{
   var restrict = 'E';
    var scope = {
        value: '='
    };
    var template = 'templates/price.tpl.html';
    var directive = {
      restrict      : restrict,
      scope         : scope,
      templateUrl   : template
    };
    
    return directive;
};

function RouteFunction($routeProvider)
{
    var templateUrls = ['articles.html', 'about.html', 'impressum.html', 'profile.html'];
    
    $routeProvider
            .when('/',          { templateUrl: templateUrls[0]})
            .when('/about',     { templateUrl: templateUrls[1]})
            .when('/impressum', { templateUrl: templateUrls[2]})
            .when('/profile',   { templateUrl: templateUrls[3]})
            .otherwise({ redirectTo: '/' });
};



           
        