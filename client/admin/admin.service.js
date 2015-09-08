/**
 * 
 * @namespace Factories
 */
(function(){
    
    'use strict';
    
    angular
            .module('tutorialApp')
            .factory('adminHandler', adminHandler)
    
    adminHandler.$inject = ['$http'];
    
    function adminHandler($http){
        
        var actions = {
            saveImage       : saveImage,
            saveLocation    : saveLocation,
        };
        return actions;
        
        /////////////////////////
               
        function saveImage(fileInput, price, name){
       
            var files       = fileInput.files;
            var imageFile   = files[0];
            var reader      = new FileReader();
            reader.onload   = loadFunction;   
            reader.readAsDataURL(imageFile);
 
            /////////////////////////////////////////////////////////
            
            function successHandler(e){
                console.log('POST image successful', e);
            };
            
            function errorHandler(e){
                console.log('An error is occured! POST image failed', e);
            }
            
            function loadFunction(e){
                
                var postPizza = [];
                price     = parseFloat(price);
                
                var pizza     = {
                                    name :  name,
                                    price:  price,
                                    image:  e.target.result
                                };
                
                postPizza = JSON.stringify(pizza);
                    
                $http.post('/saveImage', postPizza)
                                .success(successHandler(e))
                                .error(errorHandler(e));
                        
            }
            
        };
        
        function saveLocation(location, longitude, latitude){
          
            var coordinates = [longitude, latitude];
            
            var postLocation =  {
                                    location    : location,
                                    coordinates : coordinates
                                };
            
            $http.post('/saveLocation', postLocation)
                    .success(successHandler)
                    .error(errorHandler);
            
            ////////////////////////////////////////
            
            function successHandler(){
                console.log("POST saveLocation successful!");
            };
            
            function errorHandler(){
                console.log("POST saveLocation failes!");
            };
            
        };
        
    }
    
})();

//ToDo: Umkreissuche GeoJSON, Best Practice MongoDB (Vorgehensweise, wie geht man vor bei der Erstellung) 