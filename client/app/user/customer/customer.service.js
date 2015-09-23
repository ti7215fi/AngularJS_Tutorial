/**
 * @namespace Service
 * @description Organize and handle the data of the customer area.
 */
(function () {

    'use strict';

    angular
            .module('app.user.customer')
            .factory('customerAreaHandler', customerAreaHandler);

    customerAreaHandler.$inject = ['$resource', '$rootScope', 'userResource', 'sessionResource', '$state'];

    function customerAreaHandler($resource, $rootScope, userResource, sessionResource, $state) {

        var actions = {
            getCustomerData: getCustomerData,
            updateUsername: updateUsername,
            updateAddress: updateAddress,
            updatePassword: updatePassword,
            deleteCustomer: deleteCustomer,
            getOrder: getOrder
        };
        return actions;

        /////////////////////////////

        function getCustomerData() {
            $rootScope.currentCustomer = sessionResource.getSessionData();
        }

        function updateCustomer(id, data) {
            userResource.updateUser(id, data);
        }


        function updateUsername(username) {

            var postUsername = {username: username};


            $resource('/updateUsername').save(postUsername,
                    successHandler,
                    errorHandler);

            ///////////////////////////////////////////        

            function successHandler(response) {
                getCustomerData();
                console.log(response);
            }

            function errorHandler(response) {
                console.log(response);
            }

        }

        function updateAddress(address) {

            var postAddress = {address: address};

            $resource('/updateAddress').save(postAddress,
                    successHandler,
                    errorHandler);

            //////////////////////////////////////////

            function successHandler(response) {
                getCustomerData();
                console.log(response);
            }

            function errorHandler(response) {
                console.log(response);
            }

        }

        function updatePassword(oldPassword, newPassword, newPasswordConfirm) {

            var postPassword = {
                oldPassword: oldPassword,
                newPassword: newPassword,
                newPasswordConfirm: newPasswordConfirm

            };



            $resource('/updatePassword').save(postPassword,
                    successHandler,
                    errorHandler);

            function successHandler() {
                console.log('Password was updated!');
                getCustomerData();
            }

            function errorHandler() {
                console.log("An error occured! Password was not updated!");
            }

        }

        function deleteCustomer() {

            sessionResource.deleteUser().$promise.then(function () {
                $rootScope.userSession = null;
                $state.go('home');
            });

        }

        function getOrder() {

            $resource('/getCustomerOrder', {isArray: true}).query(
                    successHandler,
                    errorHandler);

            ///////////////////////////////

            function successHandler(responseOrder) {


                $resource('/pizzen', {isArray: true}).query(
                        successHandler2,
                        errorHandler);

                /////////////////////////////

                function successHandler2(responsePizzen) {

                    var item = "";


                    for (var orderIndex = 0; orderIndex < responseOrder.length; ++orderIndex) {
                        for (var itemIndex = 0; itemIndex < responseOrder[orderIndex].items.length; ++itemIndex) {
                            for (var pizzaIndex = 0; pizzaIndex < responsePizzen.length; ++pizzaIndex) {
                                item = responseOrder[orderIndex].items[itemIndex];

                                if (item.pizza_id === responsePizzen[pizzaIndex]._id) {
                                    responseOrder[orderIndex].items[itemIndex].name = responsePizzen[pizzaIndex].name;
                                } // end if
                            } // end for 3
                        } // end for 2
                    }// end for 1

                    $rootScope.customerOrder = responseOrder;
                    console.log('/getCustomerOrder successful!');
                }

                function errorHandler() {
                    console.log('/pizzen failed!');
                }


            }

            function errorHandler() {
                console.log('/getCustomerOrder failed!');
            }

        }

    }

})();