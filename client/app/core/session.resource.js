(function(){
    
    'use strict';
    
    angular
            .module('app.core')
            .value('resourceSession', null)
            .service('sessionResource', sessionResource);
    
    sessionResource.$inject = ['$resource', 'resourceSession'];
    
    function sessionResource($resource, resourceSession){
        
        resourceSession = $resource('/sessionData');
        
        var actions = {
            getSessionData  : getSessionData,
            login           : login,
            logout          : logout,
            deleteUser      : deleteUser
        };
        return actions;
        
        ///////////////////////////////////
        
        function getSessionData(){
            return resourceSession.get();
        }
        
        function login(credentials){
            return resourceSession.save(credentials);
        }
        
        function logout(){
            return resourceSession.remove();
        }
        
        function deleteUser(){
            return resourceSession.delete();
        }
    }
    
})();



