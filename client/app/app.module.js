/**
 * @namespace Modules
 * @description Hauptmodul
 * @param {type} Name der Anwendung
 * @param {type} Abhängigkeiten (Animationen, Routing, Unit-Testing)'ngMock', 
 */
(function () {

    'use strict';

    angular
            .module('app', [
                'ngAnimate',
 //               'ngMock',
                'ui.bootstrap',
                'app.core',
                'app.start',
                'app.login',
                'app.register',
                'app.admin',
                'app.user.customer',
                'app.about'
            ])
            .run(runApp);
    
    runApp.$inject = ['$http', '$rootScope'];
    
    function runApp($http, $rootScope){
      
      console.log('runApp');
        $http.get('/getUserData')
                .success(successHandler)
                .error(errorHandler);
        
        ////////////////////////////////
        
        function successHandler(response){
          
          if(typeof response === "string"){
              console.log("null");
            $rootScope.userSession = null;
          }else{
              $rootScope.userSession = response;
          }
            
            console.log('User detected');
            
        };
        
        function errorHandler(){
          
            console.log('No user-session found!');
            
        };
        
    };


})();


