/**
 * @namespace Test
 * @description Test the routes of the about-module
 */
(function(){
    
    'use strict';
    
    describe('test the routes of the about-module', function(){
       
       var $state, state = 'aboutUs';
       
       //load the core-module for the routerHelper
        beforeEach(module('app.core'));
        
        //load the about-module to test this route
        beforeEach(module('app.about'));
        
        //mock the service
        beforeEach(inject(function($injector){
            
            $state = $injector.get('$state');
            
        }));
        
        it('should respond to URL', function(){
            expect($state.href(state)).toEqual('#/about');
        });
        
    });
    
})();

