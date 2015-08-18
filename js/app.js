'use strict';

angular
        .module('tutorialApp', ['ngAnimate', 'ngRoute'])               
        .factory('Cart', CartFactory)
        .factory('UserF', UserFactory)
        .controller('ArticlesCtrl', ArticlesController)
        .controller('CartCtrl', CartController)
        .controller('UserCtrl', UserController)
        .directive('price', PriceFunction)
        .config(RouteFunction)

function UserFactory(){
    var user = [
        ["admin","123"],
        ["user","123"]
    ];
    
    var actions = {
        getUser : getUser,
        getUsernameByID: getUsernameByID,
        getPasswordByID: getPasswordByID
    };
    return actions;
    
    function getUser()
    {
        return user;
    }
    
    function getUsernameByID(ID)
    {
        return user[ID][0];
    }
    
    function getPasswordByID(ID)
    {
        return user[ID][1];
    }
}

function CartFactory(){
    var items = [];

    var actions = {
      getItems: getItems,
      addArticle: addArticle,
      deleteArticles: deleteArticles,
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
    
    function deleteArticles(){
        items.length = 0;
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
    var templateUrls = ['articles.html', 'about.html', 'impressum.html', 'loginform.html'];
    
    $routeProvider
            .when('/',          { templateUrl: templateUrls[0]})
            .when('/about',     { templateUrl: templateUrls[1]})
            .when('/impressum', { templateUrl: templateUrls[2]})
            .when('/login',   { templateUrl: templateUrls[3]})
            .otherwise({ redirectTo: '/' });
};

function UserController($scope, User)
{
    $scope.user = User;
}


           
        