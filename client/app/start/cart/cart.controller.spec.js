/**
 * @namespace Test
 * @description Test of the CartController
 */
(function () {

    'use strict';

    describe('CartController', function () {

        var controller, routerHelper, carthandler;

        // set up the core module to load the routerHelper-provider
        beforeEach(module('app.core'));
        // set up the module
        beforeEach(module('app.start'));

        //mock the modal-service
        beforeEach(module(function ($provide) {

            $provide.service('$modal', function () {
                return {
                    open: function () {
                    }
                };
            });
        }));

        beforeEach(inject(function ($injector) {

            //set up the $controller mock service
            var $controller = $injector.get('$controller');
            // set up the factory mock service
            carthandler = $injector.get('carthandler');
            // set up the routerHelper mock service
            routerHelper = $injector.get('routerHelper');

            controller = $controller('CartController', {carthandler: carthandler});
            console.log('success');
        }));

        it('should have an cart variable init with the carthandler factory', function () {
            expect(controller.cart).toBeDefined();
            expect(controller.cart).toEqual(carthandler);
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


})();

