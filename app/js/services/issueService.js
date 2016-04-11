'use strict';

app.factory('issueService',
    function ($http, baseServiceUrl, authService) {
        
        return {
            getUsersIssues: function (params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'issues/me?orderBy=Project.Name desc, IssueKey&pageSize=2&pageNumber=1',
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function (data) {
                    success(data);

                }).error(error);
            },

        }
    }
);
