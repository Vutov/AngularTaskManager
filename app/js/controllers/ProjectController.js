﻿'use strict';

app.controller('ViewProjectController',
   function ($scope, $routeParams, $location, projectService, notifyService, pageSize, _, authService) {
       $scope.isDisabled = true;
       $scope.projectView = "Project";

       projectService.getProjectById(
              $routeParams.id,
              function success(data) {
                  data.StringPriorities =  _(data.Priorities).map(c => c.Name).value().join(", ");
                  data.StringLabels = _(data.Labels).map(c => c.Name).value().join(", ");
                  $scope.project = data;
                  if (data.Lead.Username === authService.getCurrentUser().userName) {
                      $scope.isProjectLeader = true;
                  } else {
                      $scope.isProjectLeader = false;
                  }

                  // TODO transition id 
              },
              function error(err) {
                  notifyService.showError("Failed loading data...", err);
              });

       $scope.addIssue = function () {
           //$location.path("projects/" + id + "/add-issue");
           throw Error("Implement!")
       }

       $scope.editProject = function () {
           $location.path("projects/" + $routeParams.id + "/edit");
       }
   }
);

app.controller('EditProjectController',
   function ($scope, $routeParams, $location, projectService, notifyService, pageSize, _, authService, userService) {
       $scope.isDisabled = false;
       $scope.projectView = "Edit Project";

       projectService.getProjectById(
              $routeParams.id,
              function success(data) {
                  data.StringPriorities =  _(data.Priorities).map(c => c.Name).value().join(", ");
                  data.StringLabels = _(data.Labels).map(c => c.Name).value().join(", ");
                  $scope.project = data;
                  if (data.Lead.Username === authService.getCurrentUser().userName) {
                      $scope.isProjectLeader = true;
                  } else {
                      $scope.isProjectLeader = false;
                  }

                  // TODO transition id 

                  userService.getAllUsers(function success(data) {
                      $scope.leaders = data.sort(function(a, b) {
                          return a.Username.localeCompare(b.Username);
                      });
                  }, function error(err) {
                      notifyService.showError("Failed loading data...", err);
                  });
              },
              function error(err) {
                  notifyService.showError("Failed loading data...", err);
              });

       $scope.addIssue = function () {
           //$location.path("projects/" + id + "/add-issue");
           throw Error("Implement!")
       }

       $scope.saveProject = function (projectData) {
           projectData.LeadId = projectData.Lead.Id;
           projectData.StringLabels.split(", ").forEach(function(l) {
               projectData.Labels.push({ Name: l });
           }); 
           
           projectData.StringPriorities.split(", ").forEach(function(p) {
               projectData.Priorities.push({ Name: p });
           });

           projectService.updateProjectById(
               $routeParams.id,
               projectData,
               function success() {
                   $location.path("projects/" + $routeParams.id);
               }, 
               function error(err) {
                   notifyService.showError("Failed loading data...", err);
               });
       }
   }
);

app.controller('AddProjectController',
   function ($scope, $routeParams, $route, $location, notifyService, pageSize) {
       $scope.isDisabled = false;
       $scope.projectView = "Add Project";

       $scope.addIssue = function () {
           //$location.path("projects/" + id + "/add-issue");
           throw Error("Implement!")
       }

       $scope.saveProject = function (projectData) {
           // TODO call service
       }
   }
);

app.controller('ViewAllProjectsController',
   function ($scope, $routeParams, $location, projectService, notifyService, pageSize, _, authService) {
       $scope.isDisabled = true;
       $scope.projectView = "All Project";

       projectService.getAllProjects(
              function success(data) {
                  $scope.projects = data;
              },
              function error(err) {
                  notifyService.showError("Failed loading data...", err);
              });

       $scope.viewProject = function(id) {
           $location.path("projects/" + id);
       }
       //$scope.addIssue = function () {
       //    //$location.path("projects/" + id + "/add-issue");
       //    throw Error("Implement!")
       //}

       //$scope.editProject = function () {
       //    $location.path("projects/" + $routeParams.id + "/edit");
       //}
   }
);