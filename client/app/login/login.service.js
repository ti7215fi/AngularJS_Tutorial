/*
 * @namespace Factories
 * @description Dient der Datenhaltung, kontrolliert auf Korrektheit der Daten
 */
(function()
{
   'use strict';
   
   angular
           .module("app.login")
           .factory("loginHandler", loginHandler);
   
   loginHandler.$inject = ['$http', '$rootScope', 'user'];
   
   function loginHandler($http, $rootScope, user)
   {
       
       var actions = {
           authentication       : authentication,
           getUserInformation   : getUserInformation,
           logout               : logout
       };
       return actions;
       
       ////////////////
       
       function authentication(username, password){
         
         var credentials = { username : username , password : password }; 
         
           $http.post('/login', credentials)         
                   .success(successHandler)
                   .error(errorHandler);
           
           //////////////////////////////////
           
           function successHandler(){
               console.log('POST LOGIN successful!');                  
               getUserData();
           };
           
           function errorHandler(){
               console.log('POST LOGIN failed!');
           };
           
       };
       
       function getUserData(){
           
           $http.get('/getUserData')
                   .success(successHandler)
                   .error(errorHandler);
           
           /////////////////////////////////
           
           function successHandler(response){
             
               $rootScope.userSession = response;               
           };
           
           function errorHandler(){
             console.log('Access denied!');
           };
           
       };
       
       function getUserInformation(){
           
           return $rootScope.userSession;
           
       };
       
       function logout(){
          $rootScope.userSession = null;
       };
       
       
   };
   
})();            