/**
 * 
 * @namespace Config
 */
(function(){
    
   'use strict';
   
   angular
           .module('app.core')
           .config(RouteConfig);
   
   RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
   
   function RouteConfig($stateProvider, $urlRouterProvider){
       
       $urlRouterProvider.otherwise("#/");
       
       $stateProvider
               .state('start', {
                   url: '#/',
                   templateUrl : 'cart/articles.html'
       })
               .state('about', {
                   url : "#/about",
                   templateUrl : 'about/locations/locations.view.html'
       })
               .state('impressum', {
                   url : '#/impressum',
                   templateUrl : 'impressum.view.html'
       })
               .state('login', {
                   url : '#/login', 
                   templateUrl : 'login/login.view.html'
       })
               .state('admin', {
                   url : '#/admin', 
                   templateUrl : 'admin/admin.view.html'
       });
       
   };// end function RouteConfig
   
})();
