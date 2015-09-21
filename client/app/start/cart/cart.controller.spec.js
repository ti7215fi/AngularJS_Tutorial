
/**
 * @namespace Test
 * @description Testet den CartController

(function () {

    'use strict';

    describe('CartController', function () {

    var controller, routerHelper, $modal;
        
        // set up the core module to load the routerHelper-provider
        beforeEach(module('app.core'));
        // set up the module
        beforeEach(module('app.start'));

        beforeEach(inject(function($injector){
           
            //set up the $controller mock service
            var $controller = $injector.get('$controller');
            // set up the factory mock service
            var carthandler = $injector.get('carthandler');
            // set up the routerHelper mock service
            routerHelper = $injector.get('routerHelper');

            controller = $controller('CartController', { carthandler : carthandler });
            console.log('success');
        }));

        it('should have an cart variable', function () {        
            expect(controller.cart).toBeDefined(true);
        });

        it('should have an getItems function', function () {
            expect(angular.isFunction(controller.cart.getItems)).toBe(true);
        });

        it('should have an sum function', function () {
            expect(angular.isFunction(controller.cart.sum)).toBe(true);
        });

        it('should have an getArticleCount function', function () {
            expect(angular.isFunction(controller.cart.getArticleCount)).toBe(true);
        });
 
        it('should have an insertOrderIntoDatabase function', function () {
            expect(angular.isFunction(controller.cart.insertOrderIntoDatabase)).toBe(true);
        });

        it('should have an deleteArticles function', function () {
            expect(angular.isFunction(controller.cart.deleteArticles)).toBe(true);
        });

        it('', function () {

        });


    });


})();*/

