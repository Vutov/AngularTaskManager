'use strict';

app.controller('AdminController',
   function ($scope, $location, userService, notifyService, pageSize) {
       $scope.showUsers = false;
       $scope.isAdmin = false;

       $scope.makeAdmin = function (id) {
           var userData = { userId: id };

           userService.makeAdmin(
               userData,
               function success(data) {
                   $scope.showAllUsers();
               },
               function error(err) {
                   notifyService.showError("Failed making Admin!", err);
               });
       }

       $scope.showAllUsers = function() {
           userService.getAllUsers(
               function success(data) {
                   $scope.users = data;
               },
               function error(err) {
                   notifyService.showError("Failed loading data...", err);
               });
       }
   }
);
