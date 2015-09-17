(function(){
    
    'use strict';
    
    angular
            .module('app.user.customer')
            .factory('customerAreaHandler', customerAreaHandler);
    
    customerAreaHandler.$inject = ['$http', '$rootScope'];
    
    function customerAreaHandler($http, $rootScope){
      
        var actions = {
            getCustomerData : getCustomerData,
            updateUsername : updateUsername,
            updateAddress : updateAddress,
            updatePassword : updatePassword,
            deleteCustomer : deleteCustomer,
            getOrder : getOrder
        };
        return actions;
        
        /////////////////////////////
        
        function getCustomerData(){
            $http.get('/getCurrentCustomer')
                    .success(successHandler)
                    .error(errorHandler);
            
            ///////////////////////////////
            
            function successHandler(response){
                
                $rootScope.currentCustomer = response;
                console.log(response);
                console.log('/getCurrentCustomer was successful!');
            };
            
            function errorHandler(){
              
                console.log('An error occured! /getCurrentCustomer failed!');
                
            };
            
        };
        
        function updateUsername(username){
          
            var postUsername = { username : username };
          
            $http.post('/updateUsername', postUsername)
                    .success(successHandler)
                    .error(errorHandler);
            
            ////////////////////////////////////
            
            function successHandler(){
                console.log('Username was changed!');
                getCustomerData();
            };
            
            function errorHandler(){
                console.log('An error occured! Username was not changed!');
            };
            
        };
        
        function updateAddress(address){
            
            var postAddress = { address : address };
            
            $http.post('/updateAddress', postAddress)
                    .success(successHandler)
                    .error(errorHandler);
            ///////////////////////////////////////
            
            function successHandler(){
              
                console.log('Address was changed!');
                getCustomerData();
                
            };
            
            function errorHandler(){
              
                console.log('An error occured! Address was not changed!');
                
            };                        
        };
        
        function updatePassword(oldPassword, newPassword, newPasswordConfirm){
          
            var postPassword = {
              
                oldPassword : oldPassword,
                newPassword : newPassword,
                newPasswordConfirm : newPasswordConfirm
                
            };
            
            $http.post('/updatePassword', postPassword)
                    .success(successHandler)
                    .error(errorHandler);
            
            function successHandler(){
                console.log('Password was updated!');
                getCustomerData();
            };
            
            function errorHandler(){
                console.log("An error occured! Password was not updated!");
            };
            
        };
        
        function deleteCustomer(){
          
            $http.get('/deleteCustomer')
                    .success(successHandler)
                    .error(errorHandler);
            
            //////////////////////////////
            
            function successHandler(){
                $rootScope.userSession = null;
                console.log('User was deleted!');
            };
            
            function errorHandler(){
                
            };
            
        };
        
        function getOrder(){
            
            $http.get('/getCustomerOrder')
                    .success(successHandler)
                    .error(errorHandler);
            
            ///////////////////////////////
            
            function successHandler(responseOrder){
                
                
                $http.get('/pizzen')
                        .success(successHandler)
                        .error(errorHandler);
                
                /////////////////////////////
                
                function successHandler(responsePizzen){
                  
                  var item = "";
                    
                    for(var orderIndex = 0; orderIndex < responseOrder.length; ++orderIndex){
                        for(var itemIndex = 0; itemIndex < responseOrder[orderIndex].items.length; ++itemIndex){
                            for(var pizzaIndex = 0; pizzaIndex < responsePizzen.length; ++pizzaIndex){
                                item = responseOrder[orderIndex].items[itemIndex];
                                
                                if(item.pizza_id === responsePizzen[pizzaIndex]._id){
                                    responseOrder[orderIndex].items[itemIndex].name = responsePizzen[pizzaIndex].name;
                                } // end if
                            } // end for 3
                        } // end for 2
                    }// end for 1
                    
                    $rootScope.customerOrder = responseOrder;
                    console.log('/getCustomerOrder successful!'); 
                };
                
                function errorHandler(){
                    console.log('/pizzen failed!');
                };
                
                
            };
            
            function errorHandler(){
                console.log('/getCustomerOrder failed!');
            };
            
        };
        
    };
    
})();