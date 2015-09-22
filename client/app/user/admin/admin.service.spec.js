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

            $httpBackend.expectPOST('/saveLocation', request).respond(200, '');
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
                        items: [
                            {
                                sum: 22.50,
                                item: "2x Pilze, 3x Salami"
                            },
                            {
                                sum: 15.40,
                                item: "2x Gyros"
                            }
                        ]
                    },
                    {
                        id: 2,
                        firstname: "Maria",
                        lastname: "Musterfrau",
                        items: [
                            {
                                sum: 18.50,
                                item: "1x Vegetaria, 2x Salami"
                            },
                            {
                                sum: 10.40,
                                item: "2x Pilze"
                            }
                        ]
                    },
                ];
            });

            it('should create a new rootScope-variable, called "orders" and init it with the response', function () {

                $httpBackend.expectGET('/getOrders').respond(200, response);
                adminHandler.getOrders();
                $httpBackend.flush();

                expect($rootScope.orders).toBeDefined();
                expect($rootScope.orders).toEqual(response);

            });

            it('should not create a new rootScope-variable, called "orders"', function () {

                $httpBackend.expectGET('/getOrders').respond(500, '');
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

            $httpBackend.expectGET('/getCustomers').respond(200, response);
            adminHandler.getCustomers();
            $httpBackend.flush();

            expect($rootScope.customers).toBeDefined();
            expect($rootScope.customers).toEqual([
                {
                    id: 1,
                    firstname: "Max",
                    lastname: "Mustermann",
                    address: {
                        street: "Musterweg 8",
                        zip: 99085,
                        city: "Erfurt"
                    },
                    edit: false
                },
                {
                    id: 2,
                    firstname: "Maria",
                    lastname: "Musterfrau",
                    address: {
                        street: "Musterweg 12",
                        zip: 99085,
                        city: "Erfurt"
                    },
                    edit: false
                },
                {
                    id: 3,
                    edit: false,
                    deleted: true
                }

            ]);

        });

        it('should not create a new rootScope-variable, called "customers"', function () {

            $httpBackend.expectGET('/getCustomers').respond(500, '');
            adminHandler.getCustomers();
            $httpBackend.flush();

            expect($rootScope.customers).toBeUndefined();

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

            $httpBackend.expectGET('/getCustomer/1').respond(200, response);
            adminHandler.getCustomerById(1);
            $httpBackend.flush();

            expect($modal.open).toHaveBeenCalled();
            expect($rootScope.customer).toBeDefined();
            expect($rootScope.customer).toEqual(response);
        });

        it('should create a new rootScope-variable, called "customer" and init it with the response data', function () {

            spyOn($modal, 'open');

            var response = {
                id : 3
            };

            $httpBackend.expectGET('/getCustomer/1').respond(200, response);
            adminHandler.getCustomerById(1);
            $httpBackend.flush();

            expect($modal.open).toHaveBeenCalled();
            expect($rootScope.customer).toBeDefined();
            expect($rootScope.customer).toEqual({
                id : 3,
                deleted : true
            });
            
        });

        it('should not create a new rootScope-variable, called "customer"', function () {

            spyOn($modal, 'open');

            $httpBackend.expectGET('/getCustomer/1').respond(500, '');
            adminHandler.getCustomerById(1);
            $httpBackend.flush();
            
            expect($modal.open).not.toHaveBeenCalled();
            expect($rootScope.customer).toBeUndefined();
        });
        
        it('should do nothing, because the modalInstance is not init', function(){
           
            adminHandler.closePopupWindow();
            
            expect(modalInstance).toEqual(null);
            
        });
        
        //ToDo: test saveImage
        

    });

})();
