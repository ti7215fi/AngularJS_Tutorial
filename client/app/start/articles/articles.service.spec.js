/**
 * @namespace Test
 * @description Test the articlehandler service
 */
(function () {

    'use strict';

    describe('test the articlehandler factory', function () {

        var $httpBackend, articlehandler;

        //load core-module for the routerHelper
        beforeEach(module('app.core'));

        //load start-module to test this factory
        beforeEach(module('app.start'));

        //mock the service
        beforeEach(inject(function ($injector) {

            $httpBackend = $injector.get('$httpBackend');
            articlehandler = $injector.get('articlehandler');

        }));

        //verify the $httpBackend-Service
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should delete the article successful', function () {
            var article = {
                id : 1,
                name : "Salami",
                price : 5.00
            };
            
            $httpBackend.expectPOST('/deleteArticle', article).respond(200, '');
            articlehandler.deleteArticle(article);
            $httpBackend.flush();
        });
        
        it('should edit the article successful', function(){
           
            var article = {
                _id      : 1,
                name    : "Salami",
                price   : 5.00
            };
            
            var name = "Salami+";
            var price = 5.10;
            
            var expectedPost = {
                _id : 1,
                name : "Salami+",
                price : 5.10
            };
            
            $httpBackend.expectPOST('/editArticle', expectedPost).respond(200,'');
            articlehandler.editArticle(name, price, article);
            $httpBackend.flush();
            
        });

    });

})();