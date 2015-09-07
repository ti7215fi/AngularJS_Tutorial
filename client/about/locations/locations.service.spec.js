describe('Test locationhandler Factory', function(){
    
    var locationHandler;
    var $httpBackend;
    
    
   beforeEach(function(){
      
       module('tutorialApp');
       
       module(function($provide){           
           
       });
            
       inject(function(_locationHandler_, _$httpBackend_, _map_){
           
           locationHandler  = _locationHandler_;
           $httpBackend     = _$httpBackend_;
           var map = _map_;

            
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


/*
 *
 * 
 *  
 *          module(function($provide){
          
           $provide.value('$document', { getElementById : function(){ 
                                            return { selectedIndex : 'Erfurt', 
                                                     options        : {   'Erfurt' :  {
                                                                                            text : "Erfurt"
                                                                                        }}} ;
                                        }                           });
           
       });
 *     
 * 
 *            
        locationHandler = _locationHandler_;
        $httpBackend = _$httpBackend_;

        console.log(locationHandler.getDistances());
      
        locationHandler.city = 'Erfurt';
       $httpBackend.expectPOST('/getLocation', { location : locationHandler.city } ).respond(200, '');
       //$httpBackend.whenPOST('/getLocation', { location : locationHandler.city } ).respond(200, '');

       //$compile('<select id="select_location" name="select_location" class="form-control"> <option value="Erfurt">Erfurt</option> </select>');
       //document.getElementById('select_location').innerHTML = "Erfurt";
       //$document.getElementByID('select_location'); h
       //spyOn($document, 'getElementById');
       locationHandler.changeCity();
       $httpBackend.flush();
       
       expect(locationHandler.getDistances).toBeDefined(true);
 * 
 * 
 * 
 */