/**
 * @namespace Controller
 * @description Control the location data
 *
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.about')
            .controller('LocationController', LocationController);
    
    LocationController.$inject = ['locationHandler'];
    
    function LocationController(locationHandler){
        
        var vm = this;
        vm.loc = locationHandler;
        activate();
       
        ////////////////////////////////////////////
        function activate(){

            return vm.loc.getLocations();
        }
        
    }
    
})();

