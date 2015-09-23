/**
 * @namespace Service
 * @description Organize and verify the data of the registration.
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.register')
            .factory('registerhandler', registerhandler);
    
    registerhandler.$inject = ['$rootScope', '$resource'];
    
    function registerhandler($rootScope, $resource){
        
        var actions = {
            abort : abort,
            saveRegistration : saveRegistration
        };
        return actions;
        
        /////////////////////
        
        function abort(){
          
            $rootScope.registerPopup.close();
            
        }
        
        function saveRegistration(registerModel){
          
            console.log(registerModel);
            $resource('/registerCustomer').save(registerModel,
                    successHandler,
                    errorHandler);
            
            ///////////////////////////////////////////
            
            function successHandler(response){
              
                console.log(response);
                $rootScope.registerPopup.close();
                
            }
            
            function errorHandler(response){
              
                console.log(response);
                
            }
            
        }
        
    }
   
})();