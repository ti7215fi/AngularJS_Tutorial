app
        .factory('Cart', CartFactory)
        .controller('CartCtrl', CartController);

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

function CartController($scope, Cart)
{
    $scope.cart = Cart;
};
