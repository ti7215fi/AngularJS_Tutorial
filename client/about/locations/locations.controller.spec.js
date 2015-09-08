
/**
 * 
 * @namespace Test
 */
(function(){
   
    describe('Test LocationController', function(){
   
   var controller;
   var $rootScope;
   var $httpBackend;
   var map;
   L = { Map : function(){ new map()} };

    beforeEach(function(){
        
        module('tutorialApp');
        
       
        inject(function(_$controller_, _locationHandler_, _$rootScope_, _$httpBackend_, _map_){
           
            var $controller = _$controller_;
            var locationHandler = _locationHandler_;
            
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            map = _map_;
            
            controller = $controller('LocationController', { locationHandler : locationHandler });
            
           

        });
        
    });
    
    it('should be have an defined loc variable', function(){
       
        expect(controller.loc).toBeDefined(true);
        
    });
    
    it('should be have an existing changeCity-function', function(){
        
        expect(angular.isFunction(controller.loc.changeCity)).toBe(true);
        
    });
    
    it('should be have an existing getDistances-function', function(){
        
        expect(angular.isFunction(controller.loc.getDistances)).toBe(true);
        
    });
    
    it('should be have an initialized $rootScope variable named "locations", after HTTP_GET', function(){
                
        $httpBackend.expectGET('/locations').respond(200, ['Erfurt', 'Jena', 'Weimar']);   
        $httpBackend.flush();       
        
        expect($rootScope.locations.length > 0).toBe(true);
        
    });
    
});
})()
    

    
    




