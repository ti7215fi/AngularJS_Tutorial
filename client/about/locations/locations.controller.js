/**
 * @namespace Controller
 *
 */
(function(){
    
    'use strict';
    
    angular
            .module('tutorialApp')
            .controller('LocationController', LocationController);
    
    LocationController.$inject = ['locationHandler'];
    
    function LocationController(locationHandler){
        
        var vm = this;
        vm.loc = locationHandler;
        activate();
       
        ////////////////////////////////////////////
        function activate(){

            return vm.loc.getLocations();
        };
        
    };
    
})();

