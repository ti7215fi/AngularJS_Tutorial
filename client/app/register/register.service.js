(function(){
    
    'use strict';
    
    angular
            .module('app.register')
            .factory('registerhandler', registerhandler);
    
    registerhandler.$inject = ['$rootScope'];
    
    function registerhandler($rootScope){
        
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
        };
        
    };
    
})();