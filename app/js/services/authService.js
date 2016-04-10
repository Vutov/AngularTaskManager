'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        return {
            login: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'users/Login',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            register: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'users/Register',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },
            
            logout: function() {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'users/Logout'
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

                // TODO REMOVE when has api
                return {username: "Mocked", isAdmin: true}
            },

            isAnonymous : function() {
                //return sessionStorage['currentUser'] == undefined;

                // TODO REMOVE when has api
                return false;
            },

            isLoggedIn : function() {
                //return sessionStorage['currentUser'] != undefined;

                // TODO REMOVE when has api
                return true;
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
