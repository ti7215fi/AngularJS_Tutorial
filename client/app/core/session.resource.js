(function(){
    
    'use strict';
    
    angular
            .module('app.core')
            .factory('sessionResource', sessionResource);
    
    sessionResource.$inject = ['$resource'];
    
    function sessionResource($resource){
        
        return $resource('/sessionData');
        
    }
    
})();



