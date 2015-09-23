/**
 * @namespace Module
 * @description Main module of the app.
 */
(function () {

    'use strict';

    angular
            .module('app', [
                'ngAnimate',
 //               'ngMock',
                'ngResource',
                'ui.bootstrap',
                'app.core',
                'app.start',
                'app.login',
                'app.register',
                'app.user',
                'app.about'
            ])
            .run(runApp);
    
    runApp.$inject = ['$http', '$rootScope', '$state'];
    
    function runApp($http, $rootScope, $state){
      
      console.log('runApp');
        $http.get('/getUserData')
                .success(successHandler)
                .error(errorHandler);
        
        ////////////////////////////////
        
        function successHandler(response){
          
          $state.go('home');
          
          if(typeof response === "string"){
              console.log("null");
            $rootScope.userSession = null;
          }else{
              $rootScope.userSession = response;
          }
            
            console.log('User detected');
            
        }
        
        function errorHandler(){
          
            console.log('No user-session found!');
            
        }
        
    }


})();


