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
            updateProjectById: function(id, data, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/projects/' + id,
                    data: data,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function (data) {
                    success(data);

                }).error(error);
            },
            getAllProjects: function(success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/projects',
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function (data) {
                    success(data);

                }).error(error);
            }
        }
    }
);
