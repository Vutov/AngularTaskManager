'use strict';

app.controller('RegisterController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $rootScope.pageTitle = "Register";

        $scope.userData = {};
        $scope.genders = [{ id: 0, name: "Other" }, { id: 1, name: "Male" }, { id: 2, name: "Female" }];

        $scope.register = function(userData) {
            authService.register(userData,
                function success() {
                    notifyService.showInfo("User registered successfully");
                    $location.path("#/");
                },
                function error(err) {
                    notifyService.showError("User registration failed", err);
                }
            );
        };
    }
);
