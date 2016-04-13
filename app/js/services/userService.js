'use strict';

app.factory('userService',
    function ($http, baseServiceUrl, authService) {

        return {
            getAllUsers: function (success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'users',
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function (data) {
                    success(data);

                }).error(error);
            },
            makeAdmin: function(data, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + 'users/makeadmin',
                    data: data,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function (data) {
                    success(data);

                }).error(error);
            }

        }
    }
);
