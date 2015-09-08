/*
 * @namespace Config
 * @description Konfiguration der Routen 
 */
(function () {
    'use strict';

    angular
            .module('tutorialApp')
            .config(config);

    function config($routeProvider)
    {
        var templateUrls = ['cart/articles.html', 
                            'about/locations/locations.view.html', 
                            'impressum.view.html', 
                            'login/login.view.html',
                            'admin/admin.view.html',

        ];

        $routeProvider
                .when('/',          {templateUrl: templateUrls[0]})
                .when('/about',     {templateUrl: templateUrls[1]})
                .when('/impressum', {templateUrl: templateUrls[2]})
                .when('/login',     {templateUrl: templateUrls[3]})
                .when('/admin',     {templateUrl: templateUrls[4]})
                .otherwise({redirectTo: '/'});
    };
})();

