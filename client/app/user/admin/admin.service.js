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

    adminHandler.$inject = ['$resource', 'modalInstance', '$rootScope', '$modal',
        'locationResource', 'pizzaResource', 'userResource'];

    function adminHandler($resource, modalInstance, $rootScope, $modal,
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

                var postPizza = [];
                price = parseFloat(price);

                var pizza = {
                    name: name,
                    price: price,
                    image: e.target.result
                };

                postPizza = JSON.stringify(pizza);

                pizzaResource.addPizza(postPizza);

            }

        }

        function saveLocation(location, longitude, latitude) {

            var coordinates = [longitude, latitude];

            var postLocation = {
                location: location,
                coordinates: coordinates
            };

            locationResource.addLocation(postLocation);
        }

        //ToDo
        function getOrders() {

                $rootScope.orders = $resource('/getOrders').query();
        }

        function getCustomers() {

            var response = userResource.getUsers();

            for (var index = 0; index < response.length; ++index) {
                response[index].edit = false;

                if (typeof response[index].firstname === 'undefined') {
                    response[index].deleted = true;
                }

            }

            $rootScope.customers = response;
        }

        function getCustomerById(Id) {

            userResource.getUserById(Id).$promise.then(function (response) {
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