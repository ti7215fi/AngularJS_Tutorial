describe('AdminController', function(){
   
   var $scope;
   
   beforeEach(module('tutorialApp'));
   
   beforeEach(inject(function(_$rootScope_, _$controller_){
       $scope = $rootScope.$new();
       controller = $controller('AdminController', { $scope : $scope });
       
   }));
   
   it('$scope.admin', function(){
       expect($scope.admin).toBeDefined();
   });
    
});


