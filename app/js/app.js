'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net');
app.constant('pageSize', 5);

app.config(function ($routeProvider) {
    $routeProvider.when('#/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/user/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
});

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        var allowedGuestURI = ['/login', '/register'];
        var currentURI = $location.path().toLowerCase();
        if (!authService.isLoggedIn() &&
            allowedGuestURI.indexOf(currentURI) === -1) {
            $location.path('/');
        }
    });
});
