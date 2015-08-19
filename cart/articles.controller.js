app.controller('ArticlesCtrl', ArticlesController)

function ArticlesController($scope, $http, Cart)
{   
   $http.get('cart/articles.json').then(function(articleResponse) {
       $scope.cart = Cart;
       $scope.articles = articleResponse.data; 
   });
};