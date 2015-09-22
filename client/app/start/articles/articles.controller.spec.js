/**
 * @namespace Test
 * @description Test of the ArticlesController.
 */
(function () {

    describe('Test ArticlesController', function () {

        var controller, $httpBackend, carthandler;

        //load the core-module for the routerHelper
        beforeEach(module('app.core'));

        //load the start-module to test this controller
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

        //mock the services
        beforeEach(inject(function ($injector) {

            carthandler = $injector.get('carthandler');
            var $controller = $injector.get('$controller');
            controller = $controller('ArticlesController', {carthandler: carthandler});

            $httpBackend = $injector.get('$httpBackend');

        }));

        //verify the $httpBackend-Service
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        it('should have an defined articles variable', function () {
            
            var response = [
                {
                    _id : 1,
                    name : "Salami",
                    price : 5.00
                },
                {
                    _id : 2,
                    name : "Schinken",
                    price : 5.00
                }
            ];
            
            $httpBackend.expectGET('/pizzen').respond(200, response);
            controller.activate();
            $httpBackend.flush();
            
            expect(controller.articles).toBeDefined();
            expect(controller.articles).toEqual({
                    _id     : 1,
                    name    : "Salami",
                    price   : 5.00,
                    edit    : false
                },
                {
                    _id     : 2,
                    name    : "Schinken",
                    price   : 5.00,
                    edit    : false
                });
        });

        it('should have an defined cart variable', function () {
            $httpBackend.expectGET('/pizzen').respond(200, '');
            $httpBackend.flush();
            
            expect(controller.cart).toBeDefined();
            expect(controller.cart).toEqual(carthandler);
        });
        
        it('should have a function refreshArticles', function(){
           
            expect(controller.refreshArticles).toBeDefined();
            
        });

    });

})();



