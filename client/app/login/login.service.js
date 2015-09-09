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
   
   loginHandler.$inject = ['$http', '$cookies'];
   
   function loginHandler($http, $cookies)
   {
       
       var actions = {
           authentication : authentication,
           getUserData    : getUserData
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
               console.log('cookie', $cookies.get('XSRF-TOKEN'));
           };
           
           function errorHandler(){
               console.log('POST LOGIN failed!');
           };
           
       };
       
       function getUserData(){
           var data = $cookies.get('XSRF-TOKEN');
           console.log('data ', data );
           
           return data;
       };
       
       
   };
   
})();                //$httpProvider.defaults.headers.common["X-AUTH-TOKEN"] = response.data.token;