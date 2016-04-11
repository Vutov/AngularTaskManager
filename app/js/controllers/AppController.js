'use strict';

app.controller('AppController',
    function ($scope, $location, authService, notifyService) {
        $scope.authService = authService;

        $scope.logout = function() {
            authService.logout(
                function success() {
                    notifyService.showInfo("Logout successful");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("Logout failed", err);
                }
            );
        };
    }
);
