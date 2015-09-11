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
   
   loginHandler.$inject = ['$http', '$cookies', 'user'];
   
   function loginHandler($http, $cookies, user)
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
             
               user = response;               
           };
           
           function errorHandler(){
             console.log('Access denied!');
           };
           
       };
       
       function getUserInformation(){
           return user;
           
       };
       
       function logout(){
          user = null;
       };
       
       
   };
   
})();            