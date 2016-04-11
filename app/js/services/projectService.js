'use strict';

app.factory('projectService',
    function ($http, baseServiceUrl, authService) {

        return {
            getProjectById: function (id, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/projects/' + id,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function (data) {
                    success(data);

                }).error(error);
            },
        }
    }
);
