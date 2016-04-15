'use strict';

app.factory('lableService',
    function ($http, baseServiceUrl, authService) {

        return {
            getLablesFor: function (filter, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'labels?filter=' + filter,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function (data) {
                    success(data);

                }).error(error);
            },

        }
    }
);
