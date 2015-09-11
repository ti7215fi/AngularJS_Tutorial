/**
 * @namespace Factories
 * @description Service zur Übermittlung der eingegebenen Daten an die Datenbank.
 */
(function(){
    
    'use strict';
    
    angular
            .module('app.admin')
            .factory('adminHandler', adminHandler);
    
    adminHandler.$inject = ['$http', 'user'];
    
    function adminHandler($http, user){
        
        var actions = {
            saveImage       : saveImage,
            saveLocation    : saveLocation,
            getOrders       : getOrders
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
          
     //     console.log(user);
          
           // if(user !== null){
                
              //  if(user.group === 'admin'){
                    
                    $http.get('/getOrders')
                            .success(successHandler)
                            .error(errorHandler);
                    

          /*          
                }else{
                    console.log('Access denied!');
                }
                
            }else {
                console.log('First login!');
            }*/
            
            ///////////////////////////////
                    
            function successHandler(response){
               
                user.orders = response;
                
            };
            
            function errorHandler(){
                console.log('/getOrders failed!')
            };
            
            
        };
        
    }
    
})();

//ToDo: Umkreissuche GeoJSON, Best Practice MongoDB (Vorgehensweise, wie geht man vor bei der Erstellung) 