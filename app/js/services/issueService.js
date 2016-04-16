'use strict';

app.factory('issueService',
    function ($http, baseServiceUrl, authService) {

        return {
            getUsersIssues: function(params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function(data) {
                    success(data);

                }).error(error);
            },

            addIssue: function(issueData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'issues',
                    data: issueData,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function(data) {
                    success(data);

                }).error(error);
            },

            getIssueById: function(id, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'issues/' + id,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function(data) {
                    success(data);

                }).error(error);
            },

            updateIssue: function(issueData, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + 'issues/' + issueData.Id,
                    data: issueData,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function(data) {
                    success(data);

                }).error(error);
            },

            changeStatus: function (issueId, statusId, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + 'issues/' + issueId + '/changestatus?statusId=' + statusId,
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function (data) {
                    success(data);

                }).error(error);
            },
        }
    }
);
