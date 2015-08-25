(function()
{
   'use strict';
   
   angular
           .module("loginModule")
           .factory("loginData", loginHandler);
   
   function loginHandler()
   {
       var username     = "";
       var password     = "";
       var firstname    = "";
       var lastname     = "";
       var address      = [];
       
       var actions = {
           getUsername  : getUsername,
           getFirstname : getFirstname,
           getLastname  : getLastname,
           setUsername  : setUsername,
           setPassword  : setPassword
       };
       return actions;
       
       ////////////////
       
       function getUsername(){
           return username;
       };
       
       function setUsername(name){
           username = name;
       }
       
       function getFirstname(){
           return firstname;
       };
       
       function getLastname(){
          return lastname;  
       };
       
       function setPassword(passwd){
         password = passwd;  
       };
       
   };
   
})();