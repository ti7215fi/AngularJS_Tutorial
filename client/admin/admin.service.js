(function(){
    
    'use strict';
    
    angular
            .module('tutorialApp')
            .factory('adminHandler', adminHandler)
    
    adminHandler.$inject = ['$http'];
    
    function adminHandler($http){
        
        var postArray       = [];
        
        var actions = {
            saveImage       : saveImage,
        };
        return actions;
        
        /////////////////////////
        
        function saveImage(){
       
            var fileInput   = document.getElementById("filebutton");
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
                var price     = parseFloat(document.getElementById("price_input").value);
                
                var pizza     = {
                                    name :  document.getElementById("name_input").value,
                                    price:  price,
                                    image:  e.target.result
                                };
                
                postPizza = JSON.stringify(pizza);
                    
                $http.post('/saveImage', postPizza)
                                .success(successHandler(e))
                                .error(errorHandler(e));
                        
            }
            
        };
        
    }
    
})();

