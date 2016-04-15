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

       $scope.addProject = function () {
           $location.path('/projects/add');
       }

       $scope.viewAllProjects = function () {
           $location.path("/projects");
       }
   }
);

app.controller('AddIssuesController',
   function ($scope, $location, authService, issueService, userService, projectService, lableService, notifyService, pageSize, _) {
       $scope.issueView = "Add Issue";

       userService.getAllUsers(function success(data) {
           $scope.users = data;
       }, function error(err) {
           notifyService.showError("Failed loading data...", err);
       });

       projectService.getAllProjects(function success(data) {
           $scope.projects = data;
       }, function error(err) {
           notifyService.showError("Failed loading data...", err);
       });

       $scope.updatePriorities = function() {
           $scope.priorities = _($scope.projects).find(p => p.Id == $scope.issueData.ProjectId).Priorities;
       }

       $scope.getLabels = function() {
           var filter = $scope.issueData.StringLabels;
           var allFilters = filter.split(',');
           var lastFilter = allFilters[allFilters.length - 1].trim();

           if (lastFilter.length >= 2) {
               lableService.getLablesFor(
                   lastFilter,
                   function success(data) {
                       $scope.labels = data;
                   }, function error(err) {
                       notifyService.showError("Failed loading data...", err);
                   }
               );
           } else {
               $scope.labels = [];
           }
       }; 

       $scope.saveIssue = function (issueData) {

       }
   }
);