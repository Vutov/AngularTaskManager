'use strict';

app.controller('AppController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $rootScope.pageTitle = '';
        $scope.authService = authService;

        $scope.logout = function() {
            authService.logout();
            notifyService.showInfo("Logout successful");
            $location.path('#/');
        };
    }
);
