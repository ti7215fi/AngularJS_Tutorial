(function(){
    
    'use strict';
    
    angular
            .module('app.register')
            .factory('registerhandler', registerhandler);
    
    registerhandler.$inject = ['$rootScope', '$http'];
    
    function registerhandler($rootScope, $http){
        
        var actions = {
            abort : abort,
            saveRegistration : saveRegistration
        };
        return actions;
        
        /////////////////////
        
        function abort(){
          
            $rootScope.registerPopup.close();
            
        };
        
        function saveRegistration(registerModel){
          
            console.log(registerModel);
            $http.post('/registerCustomer', registerModel)
                    .success(successHandler)
                    .error(errorHandler);
            
            ///////////////////////////////////////////
            
            function successHandler(response){
              
                console.log(response);
                $rootScope.registerPopup.close();
                
            };
            
            function errorHandler(){
              
                
                
            };
            
        };
        
    };
    
})();