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

    adminHandler.$inject = ['$resource', 'modalInstance', '$rootScope', '$modal'];

    function adminHandler($resource, modalInstance, $rootScope, $modal) {

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

                $resource('/saveImage').save(postPizza,
                        function (success) {
                            console.log(success);
                        },
                        function (error) {
                            console.log(error);
                        });


            }

        }

        function saveLocation(location, longitude, latitude) {

            var coordinates = [longitude, latitude];

            var postLocation = {
                location: location,
                coordinates: coordinates
            };

            $resource('/saveLocation').save(postLocation,
                    function (success) {
                        console.log(success);
                    },
                    function (error) {
                        console.log(error);
                    });
        }

        function getOrders() {

            $resource('/getOrders', { isArray : true }).query(
                    function (success) {
                        console.log(success);
                        $rootScope.orders = success;
                    },
                    function (error) {
                        console.log(error);
                    });
        }




        function getCustomers() {

            $resource('/getCustomers', { isArray : true }).query(
                    function (success) {
                        for (var index = 0; index < success.length; ++index) {
                            success[index].edit = false;

                            if (typeof success[index].firstname === 'undefined') {
                                success[index].deleted = true;
                            }

                        }

                        $rootScope.customers = success;
                    },
                    function (error) {
                        console.log(error);
                    });

        }

        function getCustomerById(Id) {

            $resource('/getCustomer/:Id', {Id: Id}).get(
                    function (success) {
                        if (typeof success.firstname === "undefined") {

                            success.deleted = true;

                        }

                        $rootScope.customer = success;
                        modalInstance = $modal.open({
                            templateUrl: '/static/app/user/admin/views/customerinformation.view.html',
                            controller: 'AdminController',
                            controllerAs: 'vm'

                        });
                        console.log('/getCustomer/:%i successful', Id);
                    },
                    function (error) {
                        console.log(error);
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