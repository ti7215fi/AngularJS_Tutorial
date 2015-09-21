/**
 * @namespace Test
 * @description Testet den locationhandler Service
 
(function(){
    
    describe('Test locationhandler Factory', function(){
    
    var locationHandler;
    var $httpBackend;
    var map;
    L = { LatLng : function(){ return 0 } };
    
   beforeEach(function(){
       
       module('app');
            
       inject(function(_locationHandler_, _$httpBackend_, _map_){
           
           locationHandler  = _locationHandler_;
           $httpBackend     = _$httpBackend_;
           map = _map_;
           map.setView = function(){ return 0 };
            
        });//end inject
       
       
   });// end beforeEach 
   
   
   it('should be have to be defined', function(){
      
       expect(locationHandler).toBeDefined(true);
       
   });
   
   it('should be have an initialize array with some locations', (function(){
       
      var distances = ['Jena', 'Gotha', 'Gera', 'Weimar', 'Erfurt'];
      
       $httpBackend.expectPOST('/getLocation', { location : 'Erfurt' }).respond(200, distances);
       locationHandler.changeCity('Erfurt');
       $httpBackend.flush();
       
       expect(locationHandler.getDistances().length === 5).toBe(true);
       
   }));
  
    
});//end describe
    
})();
*/