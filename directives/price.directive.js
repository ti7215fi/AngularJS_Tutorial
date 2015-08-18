app.directive('price', PriceFunction)

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

