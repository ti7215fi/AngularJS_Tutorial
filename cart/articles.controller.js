app.controller('ArticlesCtrl', ArticlesController)

function ArticlesController($scope, $http, Cart)
{   
   $http.get('/pizzen').then(function(articleResponse) {
       console.log(articleResponse);
       $scope.cart = Cart;
       $scope.articles = articleResponse.data; 
   });
};