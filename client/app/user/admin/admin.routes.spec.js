/**
 * @namespace Test
 * @description Test the routes of the admin-module
 */
(function () {

    'use strict';

    describe('test the routes of the admin-module', function () {

        var $state,
                state1 = 'addPizza',
                state2 = 'addLocation',
                state3 = 'getOrders',
                state4 = 'getCustomers';

        //load the core-module for the routerHelper
        beforeEach(module('app.core'));

        //load the about-module to test this route
        beforeEach(module('app.user.admin'));

        //mock the service
        beforeEach(inject(function ($injector) {

            $state = $injector.get('$state');

        }));

        it('should respond to URL - state 1', function () {
            expect($state.href(state1)).toEqual('#/addPizza');
        });

        it('should respond to URL - state 2', function () {
            expect($state.href(state2)).toEqual('#/addLocation');
        });

        it('should respond to URL - state 3', function () {
            expect($state.href(state3)).toEqual('#/getOrders');
        });

        it('should respond to URL -state 4', function () {
            expect($state.href(state4)).toEqual('#/getCustomers');
        });

    });

})();

