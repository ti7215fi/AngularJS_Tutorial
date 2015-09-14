/**
 * @namespace Factories
 * @description Service zur Übermittlung der eingegebenen Daten an die Datenbank.
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.admin')
            .value('orders', null)
            .factory('adminHandler', adminHandler);
    
    adminHandler.$inject = ['$http', 'orders', '$rootScope'];
    
    function adminHandler($http, orders, $rootScope){
        
        var actions = {
            saveImage       : saveImage,
            saveLocation    : saveLocation,
            getOrders       : getOrders,
            getCustomers    : getCustomers
        };
        return actions;
        
        /////////////////////////
               
        function saveImage(fileInput, price, name){
          
            fileInput = document.getElementById('input-file');
          
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
        
        function getOrders(){
                    
            $http.get('/getOrders')
                .success(successHandler)
                .error(errorHandler);
                   
            
            ///////////////////////////////
                    
            function successHandler(response){
               
               $rootScope.orders = response;
                
                console.log(response);
                console.log('/getOrders successful!');
                
            };
            
            function errorHandler(){
                console.log('/getOrders failed!');
            };
        }
            
            
        
        
        function getCustomers(){
                    
            $http.get('/getCustomers')
                .success(successHandler)
                .error(errorHandler);
                   
            
            ///////////////////////////////
                    
            function successHandler(response){
               
               
               for(var index = 0; index < response.length; ++index){
                   response[index].edit = false;
               }
               
               $rootScope.customers = response;
                
                console.log(response);
                console.log('/getCustomers successful!');
                
            };
            
            function errorHandler(){
                console.log('/getCustomers failed!');
            };
            
            
        };
        
    }
    
})();

//ToDo: Umkreissuche GeoJSON, Best Practice MongoDB (Vorgehensweise, wie geht man vor bei der Erstellung) 