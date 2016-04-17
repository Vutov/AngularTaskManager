'use strict';

app.factory('commentService',
    function($http, baseServiceUrl, authService) {

        return {
            getCommentForIssueId: function (issueId, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'issues/' + issueId + '/comments',
                    headers: authService.getAuthHeaders()
                };

                $http(request).success(function(data) {
                    success(data);

                }).error(error);
            },

            saveComment : function(issueId, data, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'issues/' + issueId + '/comments',
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
