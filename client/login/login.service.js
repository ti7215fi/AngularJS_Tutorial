/*
 * @namespace Factories
 */
(function()
{
   'use strict';
   
   angular
           .module("loginModule")
           .factory("loginHandler", loginHandler);
   
   function loginHandler()
   {
       var username     = "test";
       var password     = "";
       var firstname    = "";
       var lastname     = "";
       var address      = [];
       
       var actions = {
           getUsername  : getUsername,
           getFirstname : getFirstname,
           getLastname  : getLastname,
           setUsername  : setUsername,
           setPassword  : setPassword,
           setData      : setData,
           test         : test
       };
       return actions;
       
       ////////////////
       
       function test(){
            alert("succesful!");
       };
       
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
       
       function setData(name, passwd)
       {
            username = name;
            password = passwd;
            
            console.log("name: ", name);
            console.log("password: ", passwd);
       };
       
   };
   
})();