/**
 * @namespace Test
 * @description Test the customerAreaHandler-Factory
 */
(function () {

    'use strict';

    describe('Test the customerAreaHandler Factory', function () {

        var $httpBackend, $rootScope, customerAreaHandler;

        //load the core module for the routerHelper
        beforeEach(module('app.core'));

        //load the customer module to test the factory
        beforeEach(module('app.user.customer'));

        //set up the mock services
        beforeEach(inject(function ($injector) {

            //mock the http service
            $httpBackend = $injector.get('$httpBackend');

            //mock the rootScope service
            $rootScope = $injector.get('$rootScope');

            //mock the customerAreaHandler service
            customerAreaHandler = $injector.get('customerAreaHandler');

        }));

        //verify the $httpBackend service after each test
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation;
            $httpBackend.verifyNoOutstandingRequest;
        });

        it('should initialize a variable called "currentCustomer" in the rootScope', function () {
            var customerData = {
                id: 1,
                firstname: "Max",
                lastname: "Mustermann"
            };

            $httpBackend.expectGET('/getCurrentCustomer').respond(200, customerData);
            customerAreaHandler.getCustomerData();
            $httpBackend.flush();

            expect($rootScope.currentCustomer).toBeDefined();
            expect($rootScope.currentCustomer).toEqual(customerData);
        });

        it('should not exist a variable called "currentCustomer"', function () {

            $httpBackend.expectGET('/getCurrentCustomer').respond(500, '');
            customerAreaHandler.getCustomerData();
            $httpBackend.flush();

            expect($rootScope.currentCustomer).toBeUndefined();
        });

        describe('test updateUsername(username)', function () {

            var username, userData;

            beforeEach(function () {

                username = {username: 'newusername'};
                userData = {
                    id: 1,
                    firstname: "Max",
                    lastname: "Mustermann",
                    login: {
                        username: 'newusername'
                    }
                };


            });

            it('should do a HTTP-POST and HTTP-GET', function () {

                $httpBackend.expectPOST('/updateUsername', username).respond(200, '');
                $httpBackend.expectGET('/getCurrentCustomer').respond(200, userData);
                customerAreaHandler.updateUsername('newusername');
                $httpBackend.flush();

                expect($rootScope.currentCustomer).toEqual(userData);

            });

            it('should do only one HTTP_POST', function () {

                $httpBackend.expectPOST('/updateUsername', username).respond(500, 'fail');
                customerAreaHandler.updateUsername('newusername');
                $httpBackend.flush();

                expect($rootScope.currentCustomer).toBeUndefined();

            });

            it('should do a HTTP-POST and a HTTP-GET and fail', function () {

                $httpBackend.expectPOST('/updateUsername', username).respond(200, '');
                $httpBackend.expectGET('/getCurrentCustomer').respond(500, '');
                customerAreaHandler.updateUsername('newusername');
                $httpBackend.flush();

                expect($rootScope.currentCustomer).toBeUndefined();

            });

        });

        describe('test updateAddress(address)', function () {

            var newAddress;

            beforeEach(function () {

                newAddress = {address: {
                        street: 'teststreet 92',
                        zip: 09090,
                        city: 'test'
                    }};
            });


            it('should successful do a POST and a GET', function () {

                var userData = {
                    id: 1,
                    firstname: "Max",
                    lastname: "Mustermann",
                    address: newAddress
                };

                $httpBackend.expectPOST('/updateAddress', newAddress).respond(200, '');
                $httpBackend.expectGET('/getCurrentCustomer').respond(200, userData);
                customerAreaHandler.updateAddress({
                    street: 'teststreet 92',
                    zip: 09090,
                    city: 'test'
                });
                $httpBackend.flush();

                expect($rootScope.currentCustomer).toEqual(userData);

            });

            it('should do a POST and a GET with an error', function () {

                $httpBackend.expectPOST('/updateAddress', newAddress).respond(500, '');
                customerAreaHandler.updateAddress({
                    street: 'teststreet 92',
                    zip: 09090,
                    city: 'test'
                });
                $httpBackend.flush();

                expect($rootScope.currentCustomer).toBeUndefined();

            });

        });

        describe('test updatePassword(oldPassword, newPassword, newPasswordConfirm)', function () {

            var newPassword, userData;

            beforeEach(function () {
                newPassword = {
                    oldPassword: 'oldie',
                    newPassword: 'newbie',
                    newPasswordConfirm: 'newbie'
                };
                userData = {
                    id: 1,
                    firstname: "Max",
                    lastname: "Mustermann",
                    login: {
                        username: "MaxMu",
                        password: 'newbie'
                    }
                };
            });

            it('should successful do a POST and a GET', function () {

                $httpBackend.expectPOST('/updatePassword', newPassword).respond(200, '');
                $httpBackend.expectGET('/getCurrentCustomer').respond(200, userData);
                customerAreaHandler.updatePassword(
                        'oldie',
                        'newbie',
                        'newbie');
                $httpBackend.flush();

                expect($rootScope.currentCustomer).toEqual(userData);

            });

            it('should successful do a POST and a GET', function () {

                $httpBackend.expectPOST('/updatePassword', newPassword).respond(500, '');
                customerAreaHandler.updatePassword(
                        'oldie',
                        'newbie',
                        'newbie');
                $httpBackend.flush();

                expect($rootScope.currentCustomer).toBeUndefined();

            });

        });

        describe('test deleteCustomer()', function () {
            it('should update the value of the "usersession"-variable to null', function () {

                $httpBackend.expectGET('/deleteCustomer').respond(200, '');
                customerAreaHandler.deleteCustomer();
                $httpBackend.flush();

                expect($rootScope.userSession).toBeDefined();
                expect($rootScope.userSession).toEqual(null);
            });

            it('should not update the value of the "usersession"-variable to null', function () {

                $rootScope.userSession = {
                    id: 1,
                    firstname: "Max",
                    lastname: "Mustermann",
                    address: {},
                    login: {}
                };

                $httpBackend.expectGET('/deleteCustomer').respond(500, '');
                customerAreaHandler.deleteCustomer();
                $httpBackend.flush();

                expect($rootScope.userSession).toBeDefined();
                expect($rootScope.userSession).toEqual({
                    id: 1,
                    firstname: "Max",
                    lastname: "Mustermann",
                    address: {},
                    login: {}
                });
            });

            it('should update the value of the "usersession"-variable to null', function () {

                $rootScope.userSession = {
                    id: 1,
                    firstname: "Max",
                    lastname: "Mustermann",
                    address: {},
                    login: {}
                };

                $httpBackend.expectGET('/deleteCustomer').respond(200, '');
                customerAreaHandler.deleteCustomer();
                $httpBackend.flush();

                expect($rootScope.userSession).toBeDefined();
                expect($rootScope.userSession).toEqual(null);
            });
        });
        
        describe('test getOrder', function(){
            
           
            it('should have after two HTTP-GET an array with orders and the name of the pizza', function(){
                
                var order =  [
                      {
                          ordernumber : 1,
                          sum : 25.50,
                          items : [
                              {
                                  pizza_id : 1,
                                  quantity: 2
                              },
                              {
                                  pizza_id : 2,
                                  quantity : 1
                              }
                          ]
                      },
                      {
                        ordernumber : 2,
                        sum : 15,
                        items : [
                            {
                                pizza_id : 2,
                                quantity : 1
                            },
                            {
                                pizza_id : 1,
                                quantity : 1
                            }
                        ]
                      }
                  ]  
                ;
                
                var responsePizzen = [
                {
                    _id : 1,
                    name : 'Salami'
                },
                {
                    _id : 2,
                    name : 'Pilze'
                }];
                
                $httpBackend.expectGET('/getCustomerOrder').respond(200, order);
                $httpBackend.expectGET('/pizzen').respond(200, responsePizzen);
                customerAreaHandler.getOrder();
                $httpBackend.flush();
                
                expect($rootScope.customerOrder[0].items[0].name).toEqual(responsePizzen[0].name);
                expect($rootScope.customerOrder[0].items[1].name).toEqual(responsePizzen[1].name);
                expect($rootScope.customerOrder[1].items[0].name).toEqual(responsePizzen[1].name);
                expect($rootScope.customerOrder[1].items[1].name).toEqual(responsePizzen[0].name);

                
            });
            
            it('should not have an declared and initialized rootScope-variable, called "customerOrder"', function(){
                
               $httpBackend.expectGET('/getCustomerOrder').respond(500, '');
               customerAreaHandler.getOrder();
               $httpBackend.flush();
               
               expect($rootScope.customerOrder).toBeUndefined();
                
            });
            
            it('should not have an declared and initialized rootScope-variable, called "customerOrder" - 2', function(){
                
                var order =  [
                      {
                          ordernumber : 1,
                          sum : 25.50,
                          items : [
                              {
                                  pizza_id : 1,
                                  quantity: 2
                              },
                              {
                                  pizza_id : 2,
                                  quantity : 1
                              }
                          ]
                      },
                      {
                        ordernumber : 2,
                        sum : 15,
                        items : [
                            {
                                pizza_id : 2,
                                quantity : 1
                            },
                            {
                                pizza_id : 1,
                                quantity : 1
                            }
                        ]
                      }
                  ]  
                ;                
                
               $httpBackend.expectGET('/getCustomerOrder').respond(200, order);
               $httpBackend.expectGET('/pizzen').respond(500, '');
               customerAreaHandler.getOrder();
               $httpBackend.flush();
               
               expect($rootScope.customerOrder).toBeUndefined();
                
            });
            
            
        });

    });

})();