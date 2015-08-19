app
        .factory('Cart', CartFactory)
        .controller('CartCtrl', CartController);

function CartFactory(){
    var items = [];

    var actions = {
      getItems: getItems,
      getLength: getLength,
      addArticle: addArticle,
      deleteArticles: deleteArticles,
      sum: sum
    };
    return actions;
    
    function getItems()
    {
        return items;
    };
    
    function getLength()
    {
        return items.length;
    }
    
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
