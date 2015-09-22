/**
 * @namespace Test
 * @description 
 */
(function(){
    
    'use strict';
    
    describe('', function(){
       
        beforeEach();
        
        it('', function(){
            
        });
        
    });
    
})();

        //verify the $httpBackend-Service
        afterEach(function(){
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        