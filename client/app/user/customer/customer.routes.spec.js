/**
 * @namespace Test
 * @description Test the routes of the customer-module
 */
(function () {

    'use strict';

    describe('test the routes of the customer-module', function () {

        var $state,
                state1 = 'customerSettings',
                state2 = 'customerOrderOverview';

        //load the core-module for the routerHelper
        beforeEach(module('app.core'));

        //load the about-module to test this route
        beforeEach(module('app.user.customer'));

        //mock the service
        beforeEach(inject(function ($injector) {

            $state = $injector.get('$state');

        }));

        it('should respond to URL', function () {
            expect($state.href(state1)).toEqual('#/customerSettings');
        });

        it('should respond to URL', function () {
            expect($state.href(state2)).toEqual('#/customerOrderOverview');
        });

    });

})();
