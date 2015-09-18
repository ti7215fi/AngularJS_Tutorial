(function(){
    
   'use strict';
   
   describe('app Modul', function(){
       
       var $http;
       var $rootScope;
      
       beforeEach(function(){
           
          module('app');
          
          inject(function(_$http_, _$rootScope_){
              
              $http = _$http_;
              $rootScope = _$rootScope_;
              
          });
           
       });
       
       it('should have a variable', function(){
           expect($rootScope.userSession).toBeDefined(true);
       });
       
       
   });
    
})();