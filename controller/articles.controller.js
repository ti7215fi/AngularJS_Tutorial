app.controller('ArticlesCtrl', ArticlesController)

function ArticlesController($scope, $http, Cart)
{   
   $http.get('data/articles.json').then(function(articleResponse) {
       $scope.cart = Cart;
       $scope.articles = articleResponse.data; 
   });
};