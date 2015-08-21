(function () {
    'use strict';

    angular
            .module('tutorialApp')
            .config(config);

    function config($routeProvider)
    {
        var templateUrls = ['cart/articles.html', 'about.html', 'impressum.html', 'user/loginform.html'];

        $routeProvider
                .when('/', {templateUrl: templateUrls[0]})
                .when('/about', {templateUrl: templateUrls[1]})
                .when('/impressum', {templateUrl: templateUrls[2]})
                .when('/login', {templateUrl: templateUrls[3]})
                .otherwise({redirectTo: '/'});
    };
})();

