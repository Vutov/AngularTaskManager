'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        var login = function(userData, success, error) {
            var loginData = {
                Username: userData.Email,
                Password: userData.Password,
                grant_type: "password"
            };
            
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'Token',
                data: loginData
            };

            $http(request).success(function(data) {
                sessionStorage['currentUser'] = JSON.stringify(data);
                success(data);
            }).error(error);
        };

        return {
            login: login,

            register: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'Account/Register',
                    data: userData
                };

                $http(request).success(function(data) {
                    login(userData, success, error);

                }).error(error);
            },
            
            logout: function (success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'Account/Logout'
                };

                $http(request).success(function(data) {
                    delete sessionStorage['currentUser'];
                    success(data);
                }).error(error);
            },

            getCurrentUser : function() {
                var userObject = sessionStorage['currentUser'];
                if (userObject) {
                    return JSON.parse(sessionStorage['currentUser']);
                }

                return { username: "Mocked", isAdmin: true }
            },

            isAnonymous : function() {
                return sessionStorage['currentUser'] == undefined;

                //// TODO REMOVE when has api
                //return false;
            },

            isLoggedIn : function() {
                return sessionStorage['currentUser'] != undefined;

                //// TODO REMOVE when has api
                //return true;
            },

            isNormalUser : function() {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (!currentUser.isAdmin);
            },

            isAdmin : function() {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (currentUser.isAdmin);
            },


            // TODO Rework when has api
            //getAuthHeaders : function() {
            //    var headers = {};
            //    var currentUser = this.getCurrentUser();
            //    if (currentUser) {
            //        headers['Authorization'] = 'Bearer ' + currentUser.access_token;
            //    }
            //    return headers;
            //}
        }
    }
);
