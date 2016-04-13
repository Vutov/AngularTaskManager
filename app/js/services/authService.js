'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        var login = function (userData, success, error) {
            var username = userData.Email ? userData.Email : userData.Username;
            var password = userData.Password;

            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/Token',
                data: "grant_type=password&username=" + username + "&password=" + password,
                headers: {
                    ContentType: "application/x-www-form-urlencoded"
                }
            };

            $http(request).success(function (data) {
                var userData = data;

                var userInfoRequest = {
                    method: 'GET',
                    url: baseServiceUrl + 'users/me',
                    headers: { Authorization: 'Bearer ' + userData.access_token }
                };

                $http(userInfoRequest).success(function (data) {
                    userData.isAdmin = data.isAdmin;
                    sessionStorage['currentUser'] = JSON.stringify(userData);
                    success(data);

                }).error(error);

            }).error(error);
        },
        getAuthHeaders = function () {
            var headers = {};
            var currentUser = getCurrentUser();
            if (currentUser) {
                headers['Authorization'] = 'Bearer ' + currentUser.access_token;
            }
            return headers;
        },
        getCurrentUser = function () {
            var userObject = sessionStorage['currentUser'];
            if (userObject) {
                return JSON.parse(sessionStorage['currentUser']);
            }
        }

        return {
            login: login,

            register: function (userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'api/Account/Register',
                    data: userData
                };

                $http(request).success(function (data) {
                    login(userData, success, error);

                }).error(error);
            },

            logout: function (success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'api/Account/Logout',
                    headers: getAuthHeaders()
                };

                $http(request).success(function (data) {
                    delete sessionStorage['currentUser'];
                    success(data);
                }).error(error);
            },

            getCurrentUser: getCurrentUser,

            isAnonymous: function () {
                return sessionStorage['currentUser'] == undefined;
            },

            isLoggedIn: function () {
                return sessionStorage['currentUser'] != undefined;
            },

            isNormalUser: function () {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (!currentUser.isAdmin);
            },

            isAdmin: function () {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (currentUser.isAdmin);
            },

            getAuthHeaders: getAuthHeaders,

            changePassword: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'api/Account/ChangePassword',
                    data: userData,
                    headers: getAuthHeaders()
                };

                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            }
        }
    }
);
