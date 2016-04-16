'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 5);
app.constant('_', window._);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/dashboard.html',
        controller: 'IssuesController',
        access: {
            requiresLogin: true,
        }
    });

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController',
        access: {
            requiresAnonymous: true,
        }
    });

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController',
        access: {
            requiresAnonymous: true,
        }
    });

    $routeProvider.when('/projects/add-issue', {
        templateUrl: 'templates/issue.html',
        controller: 'AddIssueController',
        access: {
            requiresLogin: true,
        }
    });

    $routeProvider.when('/projects/add', {
        templateUrl: 'templates/project.html',
        controller: 'AddProjectController',
        access: {
            requiresLogin: true,
        }
    });

    $routeProvider.when('/projects/:id', {
        templateUrl: 'templates/project.html',
        controller: 'ViewProjectController',
        access: {
            requiresLogin: true,
        }
    });

    $routeProvider.when('/projects/:id/edit', {
        templateUrl: 'templates/project.html',
        controller: 'EditProjectController',
        access: {
            requiresLogin: true,
        }
    });

    $routeProvider.when('/projects', {
        templateUrl: 'templates/admin/projectsView.html',
        controller: 'ViewAllProjectsController',
        access: {
            requiresAdmin: true,
        }
    });
    
    $routeProvider.when('/admin', {
        templateUrl: 'templates/admin/home.html',
        controller: 'AdminController',
        access: {
            requiresAdmin: true,
        }
    });

    $routeProvider.when('/profile/password', {
        templateUrl: 'templates/change-password.html',
        controller: 'AppController',
        access: {
            requiresLogin: true,
        }
    });

    $routeProvider.when('/projects/:id/add-issue', {
        templateUrl: 'templates/issue.html',
        controller: 'AddIssueToProjectController',
        access: {
            requiresLogin: true,
        }
    });

    $routeProvider.otherwise({
        redirectTo: '/',
        access: {
            requiresAnonymous: true,
        }
    });
});

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
        if (next.access.requiresAnonymous && authService.isLoggedIn()) {
            $location.path('/');
        }

        if (next.access.requiresLogin && !authService.isLoggedIn()) {
            $location.path('/');
        }

        if (next.access.requiresAdmin && !authService.isAdmin()) {
            $location.path('/');
        }
    });
});
