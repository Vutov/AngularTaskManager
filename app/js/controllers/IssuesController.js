'use strict';

app.controller('IssuesController',
   function ($scope, $location, authService, issueService, notifyService, pageSize) {
       $scope.issuesParams = {
           'startPage': 1,
           'pageSize': pageSize
       };

       $scope.predicate = 'DueDate';
       $scope.reverse = true;
       $scope.order = function (predicate) {
           $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
           $scope.predicate = predicate;
       };

       $scope.viewProject = function (id) {
           $location.path("/projects/" + id);
       }

       $scope.getIssues = function () {
           if (authService.isLoggedIn()) {
               issueService.getUsersIssues(
               $scope.issuesParams,
               function success(data) {
                   $scope.issues = data.Issues;
                   $scope.allIssues = data.TotalPages * $scope.issuesParams.pageSize;
               },
               function error(err) {
                   notifyService.showError("Failed loading data...", err);
               });
           }
       };

       $scope.getIssues();

       $scope.addProject = function() {
           $location.path('/projects/add');
       }

       $scope.viewAllProjects = function () {
           $location.path("/projects");
       }
   }
);

app.controller('AddIssuesController',
   function ($scope, $location, authService, issueService, notifyService, pageSize) {
       $scope.issueView = "Add Issue";

        $scope.saveIssue = function(issueData) {
            
        }
   }
);
