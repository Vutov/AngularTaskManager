'use strict';

app.controller('AdminController',
   function ($scope, $location, authService, issueService, notifyService, pageSize) {
       $scope.issuesParams = {
           'startPage': 1,
           'pageSize': pageSize
       };

       $scope.viewProjects = function() {
           $location.path('/projects');
       }

       $scope.addProject = function () {
           $location.path('/projects/add');
       }
       //$scope.predicate = 'date';
       //$scope.reverse = false;
       //$scope.order = function (predicate) {
       //    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
       //    $scope.predicate = predicate;
       //};

       //$scope.viewProject = function (id) {
       //    $location.path("/projects/" + id);
       //}

       //$scope.getIssues = function () {
       //    if (authService.isLoggedIn()) {
       //        issueService.getUsersIssues(
       //        $scope.issuesParams,
       //        function success(data) {
       //            $scope.issues = data.Issues;
       //            $scope.allIssues = data.TotalPages * $scope.issuesParams.pageSize;
       //        },
       //        function error(err) {
       //            notifyService.showError("Failed loading data...", err);
       //        });
       //    }
       //};

       //$scope.getIssues();
   }
);
