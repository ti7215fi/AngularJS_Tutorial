/**
 * @namespace Service
 * @description Organize and handle the data of the customer area.
 */
(function () {

    'use strict';

    angular
            .module('app.user.customer')
            .factory('customerAreaHandler', customerAreaHandler);

    customerAreaHandler.$inject = ['$rootScope', 'userResource', 'sessionResource', '$state', 'pizzaResource'];

    function customerAreaHandler($rootScope, userResource, sessionResource, $state, pizzaResource) {

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
            $rootScope.currentCustomer = sessionResource.get();
        }

        function updateUsername(username) {

            var postUsername = {
                update: 'username',
                username: username
            };

            var id = $rootScope.currentCustomer.ID;

            userResource.update({Id: id}, postUsername).$promise.then(function () {
                getCustomerData();
            });
        }

        function updateAddress(address) {

            var postAddress = {
                update: 'address',
                address: address
            };

            var id = $rootScope.currentCustomer.ID;

            userResource.update({Id: id}, postAddress).$promise.then(function () {
                getCustomerData();
            });

        }

        function updatePassword(oldPassword, newPassword, newPasswordConfirm) {

            var postPassword = {
                update: 'password',
                oldPassword: oldPassword,
                newPassword: newPassword,
                newPasswordConfirm: newPasswordConfirm
            };

            var id = $rootScope.currentCustomer.ID;

            userResource.update({Id: id}, postPassword).$promise.then(function () {
                getCustomerData();
            });

        }

        function deleteCustomer() {

            sessionResource.delete().$promise.then(function () {
                $rootScope.userSession = null;
                $state.go('home');
            });

        }

        function getOrder() {

            if ($rootScope.currentCustomer === undefined) {
                getCustomerData();
            }

            pizzaResource.query().$promise.then(function (success) {

                var order = $rootScope.currentCustomer.order;
                var viewOrder = [];

                for (var orderIndex = 0; orderIndex < order.length; ++orderIndex) {
                    for (var itemIndex = 0; itemIndex < order[orderIndex].items.length; ++itemIndex) {
                        
                        var items = order[orderIndex].items;
                        
                        for (var pizzaIndex = 0; pizzaIndex < success.length; ++pizzaIndex) {

                            var item = order[orderIndex].items[itemIndex];
                            
                            if(item.pizza_id === success[pizzaIndex]._id){
                                items[itemIndex].name = success[pizzaIndex].name;
                                break;
                            }
                        }
                    }
                    
                    var date = new Date(order[orderIndex].date);
                    
                    date = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' +
                            date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                   
                        viewOrder.push({
                            ordernumber: order[orderIndex].ordernumber,
                            date: date,
                            sum: order[orderIndex].sum,
                            items : items
                        });
                }
                
                $rootScope.customerOrder = viewOrder;

            });


        }

    }

})();