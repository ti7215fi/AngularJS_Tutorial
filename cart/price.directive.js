(function () {
    'use strict';

    angular
            .module('tutorialApp')
            .directive('price', PriceFunction)

    function PriceFunction()
    {
        var restrict = 'E';
        var scope = {
            value: '='
        };
        var template = 'price.tpl.html';
        var directive = {
            restrict: restrict,
            scope: scope,
            templateUrl: template
        };

        return directive;
    };
})();
