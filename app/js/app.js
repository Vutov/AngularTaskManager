'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 5);
app.constant('_', window._);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/projects/:id', {
        templateUrl: 'templates/project.html',
        controller: 'ProjectController'
    });

    $routeProvider.when('/projects/:id/edit', {
        templateUrl: 'templates/project.html',
        controller: 'ProjectController'
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

        if (authService.isLoggedIn() &&
            allowedGuestURI.indexOf(currentURI) !== -1) {
            $location.path('/');
        }
    });
});
