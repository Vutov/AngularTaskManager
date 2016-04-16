'use strict';

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
              },
              function error(err) {
                  notifyService.showError("Failed loading data...", err);
              });

       $scope.predicate = 'DueDate';
       $scope.reverse = true;
       $scope.order = function (predicate) {
           $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
           $scope.predicate = predicate;
       };

       projectService.getIssuesForProjectById(
              $routeParams.id,
              function success(data) {
                  $scope.issues = data;
              },
              function error(err) {
                  notifyService.showError("Failed loading data...", err);
              });

       $scope.viewIssue = function(id) {
           $location.path("issues/" + id);
       }
   }
);

app.controller('EditProjectController',
   function ($scope, $routeParams, $location, projectService, notifyService, pageSize, _, authService, userService, lableService) {
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

       $scope.saveProject = function (projectData) {
           projectData.LeadId = projectData.Lead.Id;
           projectData.Labels = [];
           projectData.Priorities = [];

           if (projectData.StringLabels) {
               projectData.StringLabels.split(",").forEach(function(l) {
                   if (l.trim()) {
                       projectData.Labels.push({ Name: l.trim() });
                   }
               }); 
           }
           
           projectData.StringPriorities.split(",").forEach(function(p) {
               if (p.trim()) {
                   projectData.Priorities.push({ Name: p.trim() });
               }
           });

           projectService.updateProjectById(
               $routeParams.id,
               projectData,
               function success(data) {
                   $location.path("projects/" + $routeParams.id);
               }, 
               function error(err) {
                   notifyService.showError("Failed loading data...", err);
               });
       }

       $scope.addIssue = function() {
           $location.path('projects/'+ $routeParams.id +'/add-issue');
       }

       $scope.getLabels = function() {
           var filter = $scope.project.StringLabels;
           if (filter) {
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
           }
       };

       $scope.addLabel = function(label) {
           var lastComma = $scope.project.StringLabels.lastIndexOf(',');
           if (lastComma !== -1) {
               $scope.project.StringLabels = $scope.project.StringLabels.slice(0, lastComma) + ', ';
           } else {
               $scope.project.StringLabels = '';
           }

           $scope.project.StringLabels += label.Name + ', ';
           $scope.labels = [];
       }

   }
);

app.controller('AddProjectController',
   function ($scope, $routeParams, $route, $location, projectService, notifyService, pageSize, userService, lableService) {
       $scope.isDisabled = false;
       $scope.projectView = "Add Project";
       $scope.project = {};

       userService.getAllUsers(function success(data) {
           $scope.leaders = data.sort(function(a, b) {
               return a.Username.localeCompare(b.Username);
           });
       }, function error(err) {
           notifyService.showError("Failed loading data...", err);
       });

       $scope.saveProject = function (projectData) {
           projectData.LeadId = projectData.Lead.Id;
           projectData.Labels = [];
           projectData.Priorities = [];

           if (projectData.StringLabels) {
               projectData.StringLabels.split(",").forEach(function(l) {
                   if (l.trim()) {
                       projectData.Labels.push({ Name: l.trim() });
                   }
               }); 
           }
           
           projectData.StringPriorities.split(",").forEach(function(p) {
               if (p.trim()) {
                   projectData.Priorities.push({ Name: p.trim() });
               }
           });

           projectService.addNewProject(
               projectData,
               function success(data) {
                   $location.path("projects/" + data.Id);
               }, 
               function error(err) {
                   notifyService.showError("Failed loading data...", err);
               });
       }

       $scope.addIssue = function() {
           $location.path('projects/add-issue');
       }

       $scope.getLabels = function() {
           var filter = $scope.project.StringLabels;
           if (filter) {
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
           }
       };

       $scope.addLabel = function(label) {
           var lastComma = $scope.project.StringLabels.lastIndexOf(',');
           if (lastComma !== -1) {
               $scope.project.StringLabels = $scope.project.StringLabels.slice(0, lastComma) + ', ';
           } else {
               $scope.project.StringLabels = '';
           }

           $scope.project.StringLabels += label.Name + ', ';
           $scope.labels = [];
       }
   }
);

app.controller('ViewAllProjectsController',
   function ($scope, $routeParams, $location, projectService, notifyService) {
       $scope.isDisabled = true;
       $scope.projectView = "All Project";

       projectService.getAllProjects(
              function success(data) {
                  $scope.projects = data;
              },
              function error(err) {
                  notifyService.showError("Failed loading data...", err);
              });
   }
);