/**
 * @namespace Test
 * @description Test the routes of the start-module.
 */
(function () {

    'use strict';

    describe('test the routes of the start-module', function () {

        var $state,
                state1 = 'home',
                state2 = 'ourImpressum';

        //load the core-module for the routerHelper
        beforeEach(module('app.core'));

        //load the about-module to test this route
        beforeEach(module('app.start'));

        //mock the service
        beforeEach(inject(function ($injector) {

            $state = $injector.get('$state');

        }));

        it('should respond to URL', function () {
            expect($state.href(state1)).toEqual('#/');
        });

        it('should respond to URL', function () {
            expect($state.href(state2)).toEqual('#/impressum');
        });

    });

})();