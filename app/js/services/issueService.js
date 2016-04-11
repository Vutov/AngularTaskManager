'use strict';

app.factory('issueService',
    function ($http, baseServiceUrl, authService) {
        
        return {
            getUsersIssues: function (params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function (data) {
                    success(data);

                }).error(error);
            },

        }
    }
);
