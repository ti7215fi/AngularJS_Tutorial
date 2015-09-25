/**
 * @namespace Service
 * @description Organize and handle the admin functions.
 */
(function () {

    'use strict';

    angular
            .module('app.user.admin')
            .value('modalInstance', null)
            .factory('adminHandler', adminHandler);

    adminHandler.$inject = ['$state', 'modalInstance', '$rootScope', '$modal',
        'locationResource', 'pizzaResource', 'userResource'];

    function adminHandler($state, modalInstance, $rootScope, $modal,
            locationResource, pizzaResource, userResource) {

        var actions = {
            saveImage: saveImage,
            saveLocation: saveLocation,
            getOrders: getOrders,
            getCustomers: getCustomers,
            getCustomerById: getCustomerById,
            closePopupWindow: closePopupWindow
        };
        return actions;

        /////////////////////////

        function saveImage(fileInput, price, name) {

            fileInput = document.getElementById('input-file');

            var files = fileInput.files;
            var imageFile = files[0];
            var reader = new FileReader();
            reader.onload = loadFunction;
            reader.readAsDataURL(imageFile);

            /////////////////////////////////////////////////////////

            function loadFunction(e) {

                price = parseFloat(price);

                var pizza = {
                    name: name,
                    price: price,
                    image: e.target.result
                };

                pizzaResource.save(pizza).$promise.then(function(success){
                    $state.go('home');
                });

            }

        }

        function saveLocation(location, longitude, latitude) {

            var coordinates = [longitude, latitude];

            var postLocation = {
                location: location,
                coordinates: coordinates
            };

            locationResource.save(postLocation);
        }

        //ToDo
        function getOrders() {

            var customers = userResource.query();
            var pizzen = pizzaResource.query();
            var items = '';
            var date, time, sum;

            var orders = [];

            customers.$promise.then(function () {
                pizzen.$promise.then(function () {


                    for (var userIndex = 0; userIndex < customers.length; ++userIndex) {
                        for (var orderIndex = 0; orderIndex < customers[userIndex].order.length; ++orderIndex) {

                            date = new Date(customers[userIndex].order[orderIndex].date);
                            time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                            date = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
                            sum = customers[userIndex].order[orderIndex].sum;

                            for (var itemIndex = 0; itemIndex < customers[userIndex].order[orderIndex].items.length; ++itemIndex) {

                                var item = customers[userIndex].order[orderIndex].items[itemIndex];

                                for (var pizzaIndex = 0; pizzaIndex < pizzen.length; ++pizzaIndex) {
                                    if (item.pizza_id === pizzen[pizzaIndex]._id) {
                                        items += item.quantity + 'x ' + pizzen[pizzaIndex].name + ', ';
                                    }
                                }//end for 4
                            }//end for 3
                            orders.push({
                                id: customers[userIndex].id,
                                date: date,
                                time: time,
                                sum: sum,
                                items: items
                            });
                            
                            items = '';

                        }//end for 2



                    }//end for 1

                    $rootScope.orders = orders;
                });
            });


        }

        function getCustomers() {

            var response = userResource.query();

            for (var index = 0; index < response.length; ++index) {
                response[index].edit = false;

                if (typeof response[index].firstname === 'undefined') {
                    response[index].deleted = true;
                }

            }

            $rootScope.customers = response;
        }

        function getCustomerById(Id) {

            userResource.get({Id: Id}).$promise.then(function (response) {
                if (typeof response.firstname === "undefined") {

                    response.deleted = true;

                }

                $rootScope.customer = response;
                modalInstance = $modal.open({
                    templateUrl: '/static/app/user/admin/views/customerinformation.view.html',
                    controller: 'AdminController',
                    controllerAs: 'vm'

                });
            });
        }

        function closePopupWindow() {

            if (modalInstance !== null) {
                modalInstance.close();
            } else {
                console.log('Modal does`nt exist!');
            }

        }

    }

})();

//ToDo: Umkreissuche GeoJSON, Best Practice MongoDB (Vorgehensweise, wie geht man vor bei der Erstellung) 