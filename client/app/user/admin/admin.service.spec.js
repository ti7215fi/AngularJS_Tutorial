/**
 * @namespace Test
 * @description Test the adminHandler factory
 */
(function () {

    'use strict';
    describe('Test the adminHandler factory', function () {

        var $httpBackend, $rootScope, $modal, adminHandler, modalInstance;
        //load the core-module for the routerHelper
        beforeEach(module('app.core'));
        //load the admin-module to test this factory
        beforeEach(module('app.user.admin'));
        //mock the modal-service
        beforeEach(module(function ($provide) {

            $provide.service('$modal', function () {
                return {
                    open: function () {
                    }
                };
            });
        }));
        //mock the services
        beforeEach(inject(function ($injector) {

            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $modal = $injector.get('$modal');
            adminHandler = $injector.get('adminHandler');
            modalInstance = $injector.get('modalInstance');
        }));
        //verify the $httpBackend-Service
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('should be POST the right values', function () {

            var request = {
                location: "Erfurt",
                coordinates: [50.038262, 12.238262]
            };
            $httpBackend.expectPOST('/location', request).respond(200, '');
            adminHandler.saveLocation("Erfurt", 50.038262, 12.238262);
            $httpBackend.flush();
        });
        describe('test getOrders()', function () {

            var response;
            beforeEach(function () {

                response = [
                    {
                        id: 1,
                        firstname: "Max",
                        lastname: "Mustermann",
                        order: [
                            {
                                ordernumber: 1,
                                date: new Date(),
                                sum: 22.50,
                                items: [
                                    {
                                        pizza_id: 1,
                                        quantity: 3
                                    },
                                    {
                                        pizza_id: 2,
                                        quantity: 2
                                    }
                                ]
                            },
                            {
                                ordernumber : 2,
                                date : new Date(),
                                sum : 15.80,
                                items : [
                                    {
                                        pizza_id : 2,
                                        quantity : 1
                                    },
                                    {
                                        pizza_id : 3,
                                        quantity : 2
                                    }
                                ]
                            }
                        ]

                    },
                    {
                        id: 2,
                        firstname: "Maria",
                        lastname: "Musterfrau",
                        order: [
                            {
                                ordernumber: 1,
                                date: new Date(),
                                sum: 18.50,
                                items: [
                                    {
                                        pizza_id: 3,
                                        quantity: 2
                                    }
                                ]
                            }
                        ]
                    },
                ];
            });
            it('should create a new rootScope-variable, called "orders" and init it with the data', function () {

                var date2 = new Date();
                var expectedDate = date2.getDate() + '.' + date2.getMonth() + '.' + date2.getFullYear();
                var expectedTime = date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds();

                $httpBackend.expectGET('/user').respond(200, response);
                $httpBackend.expectGET('/pizza').respond(200, [{
                        _id : 1,
                        name : 'Salami'
                },
                {
                    _id : 2,
                    name : 'Schinken'
                },
                {
                    _id : 3,
                    name : 'Gyros'
                }]);
                adminHandler.getOrders();
                $httpBackend.flush();
                expect($rootScope.orders).toBeDefined();
                expect($rootScope.orders[0].items).toEqual('3x Salami, 2x Schinken, ');
                expect($rootScope.orders[0].date).toEqual(expectedDate);
                expect($rootScope.orders[0].time).toEqual(expectedTime);
                expect($rootScope.orders[1].items).toEqual('1x Schinken, 2x Gyros, ');
            });
            it('should not create a new rootScope-variable, called "orders"', function () {

                $httpBackend.expectGET('/user').respond(500, '');
                $httpBackend.expectGET('/pizza').respond(200, []);
                adminHandler.getOrders();
                $httpBackend.flush();
                expect($rootScope.orders).toBeUndefined();
            });
        });
        it('should create a new rootScope-variable, called "customers", and init with some values', function () {

            var response = [
                {
                    id: 1,
                    firstname: "Max",
                    lastname: "Mustermann",
                    address: {
                        street: "Musterweg 8",
                        zip: 99085,
                        city: "Erfurt"
                    }
                },
                {
                    id: 2,
                    firstname: "Maria",
                    lastname: "Musterfrau",
                    address: {
                        street: "Musterweg 12",
                        zip: 99085,
                        city: "Erfurt"
                    }
                },
                {
                    id: 3
                }

            ];
            $httpBackend.expectGET('/user').respond(200, response);
            adminHandler.getCustomers();
            $httpBackend.flush();
            expect($rootScope.customers).toBeDefined();
            //ToDO

        });
        it('should not create a new rootScope-variable, called "customers"', function () {

            $httpBackend.expectGET('/user').respond(500, '');
            adminHandler.getCustomers();
            $httpBackend.flush();
            expect($rootScope.customers.id).toBeUndefined();
            expect($rootScope.customers.firstname).toBeUndefined();
            expect($rootScope.customers.lastname).toBeUndefined();
            expect($rootScope.customers.address).toBeUndefined();
        });
        it('should create a new rootScope-variable, called "customer" and init it with the response data', function () {

            spyOn($modal, 'open');
            var response = {
                id: 1,
                firstname: "Max",
                lastname: "Mustermann",
                address: {
                    street: "Musterweg 8",
                    zip: 99085,
                    city: "Erfurt"
                },
                orderCount: 2,
                lastOrder: '22.09.2015, 12:45:22'
            };
            $httpBackend.expectGET('/user/1').respond(200, response);
            adminHandler.getCustomerById(1);
            $httpBackend.flush();
            expect($modal.open).toHaveBeenCalled();
            expect($rootScope.customer).toBeDefined();
            expect($rootScope.customer.id).toEqual(response.id);
            expect($rootScope.customer.firstname).toEqual(response.firstname);
            expect($rootScope.customer.lastname).toEqual(response.lastname);
            expect($rootScope.customer.address).toEqual(response.address);
            expect($rootScope.customer.orderCount).toEqual(response.orderCount);
            expect($rootScope.customer.lastOrder).toEqual(response.lastOrder);
        });
        it('should create a new rootScope-variable, called "customer" and init it with the response data', function () {

            spyOn($modal, 'open');
            var response = {
                id: 3
            };
            $httpBackend.expectGET('/user/1').respond(200, response);
            adminHandler.getCustomerById(1);
            $httpBackend.flush();
            expect($modal.open).toHaveBeenCalled();
            expect($rootScope.customer).toBeDefined();
            expect($rootScope.customer.id).toEqual(response.id);
            expect($rootScope.customer.deleted).toEqual(true);
        });
        it('should not create a new rootScope-variable, called "customer"', function () {

            spyOn($modal, 'open');
            $httpBackend.expectGET('/user/1').respond(500, '');
            adminHandler.getCustomerById(1);
            $httpBackend.flush();
            expect($modal.open).not.toHaveBeenCalled();
            expect($rootScope.customer).toBeUndefined();
        });
        it('should do nothing, because the modalInstance is not init', function () {

            adminHandler.closePopupWindow();
            expect(modalInstance).toEqual(null);
        });
        //ToDo: test saveImage


    });
})();
