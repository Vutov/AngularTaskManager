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

       $scope.viewProject = function (id) {
           $location.path('/projects/' + id);
       }

       $scope.viewIssue = function (id) {
           $location.path('/issues/' + id);
       }
   }
);

app.controller('AddIssueToProjectController',
   function ($scope, $location, $routeParams, authService, issueService, userService, projectService, lableService, notifyService, pageSize, _) {
       $scope.issueView = "Add Issue";
       $scope.setProject = true;
       $scope.issueData = {};

       userService.getAllUsers(function success(data) {
           $scope.users = data;
       }, function error(err) {
           notifyService.showError("Failed loading data...", err);
       });

       projectService.getProjectById(
           $routeParams.id,
           function success(data) {
               $scope.currentProject = data;
               $scope.priorities = data.Priorities;
           }, function error(err) {
               notifyService.showError("Failed loading data...", err);
           });

       $scope.updatePriorities = function() {
           $scope.priorities = _($scope.projects).find(p => p.Id == $scope.issueData.ProjectId).Priorities;
       }

       $scope.getLabels = function() {
           var filter = $scope.issueData.StringLabels;
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

       $scope.addLabel =function (label) {
           var lastComma = $scope.issueData.StringLabels.lastIndexOf(',');
           if (lastComma !== -1) {
               $scope.issueData.StringLabels = $scope.issueData.StringLabels.slice(0, lastComma) + ', ';
           } else {
               $scope.issueData.StringLabels = '';
           }  
           
           $scope.issueData.StringLabels += label.Name + ', ';
           $scope.labels = [];
       }

       $scope.saveIssue = function (issueData) {
           issueData.projectId = $scope.currentProject.Id;
           issueData.Labels = [];

           if (issueData.StringLabels) {
               issueData.StringLabels.split(",").forEach(function(l) {
                   if (l.trim()) {
                       issueData.Labels.push({ Name: l.trim() });
                   }
               }); 
           }

           issueService.addIssue(
               issueData,
               function success(data) {
                   $location.path('/issues/' + data.Id);
               }, function error(err) {
                   notifyService.showError("Failed adding issue", err);
               }
           );
       }
   }
);

app.controller('AddIssueController',
   function ($scope, $location, $routeParams, authService, issueService, userService, projectService, lableService, notifyService, pageSize, _) {
       $scope.issueView = "Add Issue";
       $scope.setProject = false;
       $scope.issueData = {};

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

       $scope.addLabel = function (label) {
           var lastComma = $scope.issueData.StringLabels.lastIndexOf(',');
           if (lastComma !== -1) {
               $scope.issueData.StringLabels = $scope.issueData.StringLabels.slice(0, lastComma) + ', ';
           } else {
               $scope.issueData.StringLabels = '';
           }  
           
           $scope.issueData.StringLabels += label.Name + ', ';
           $scope.labels = [];
       }

       $scope.saveIssue = function (issueData) {
           issueData.projectId = $scope.currentProject;
           issueData.Labels = [];

           if (issueData.StringLabels) {
               issueData.StringLabels.split(",").forEach(function(l) {
                   if (l.trim()) {
                       issueData.Labels.push({ Name: l.trim() });
                   }
               }); 
           }

           issueService.addIssue(
               issueData,
               function success(data) {
                   $location.path('/issues/' + data.Id);
               }, function error(err) {
                   notifyService.showError("Failed adding issue", err);
               }
           );
       }
   }
);

app.controller('ViewIssueController',
    function($scope, $location, $routeParams, authService, notifyService, issueService, projectService, commentService) {
        $scope.issueView = "Issue";
        $scope.isView = true;
        $scope.isDisabled = true;

        var currentUsername = authService.getCurrentUser().userName;

        issueService.getIssueById(
            $routeParams.id,
            function success(data) {
                data.DueDate = new Date(data.DueDate);
                data.StringLabels = _(data.Labels).map(c => c.Name).value().join(", ");
                $scope.issueData = data;

                $scope.isAssignee = data.Assignee.Username === currentUsername;

                projectService.getProjectById(
                    $scope.issueData.Project.Id,
                    function success(projectData) {
                        $scope.isProjectLeader = projectData.Lead.Username === currentUsername;
                    }, function error(err) {
                        notifyService.showError("Failed loading data...", err);
                    });

                projectService.getIssuesForProjectById(
                    $scope.issueData.Project.Id,
                    function success(data) {
                        $scope.issues = data;
                        $scope.isRelated = _(data).some(i => i.Assignee.Username === "Kamigawa1234@gmail.com");
                    },
                    function error(err) {
                        notifyService.showError("Failed loading data...", err);
                    }
                );

            }, function error(err) {
                notifyService.showError("Failed loading data...", err);
            }
        );

        $scope.changeStatus = function(statusId) {
            issueService.changeStatus(
                $routeParams.id,
                statusId,
                function success(data) {
                    issueService.getIssueById(
                        $routeParams.id,
                        function success(issue) {
                            $scope.issueData.Status = issue.Status;
                        },
                        function error(err) {
                            notifyService.showError(err.Message, err);
                        });
                }, function error(err) {
                    notifyService.showError(err.Message, err);
                }
            );
        }

        var getCommentForIssueId =function() {
            commentService.getCommentForIssueId(
                $routeParams.id,
                function success(data) {
                    $scope.comments = data;
                }, function error(err) {
                    notifyService.showError(err.Message, err);
                }
            );
        }

        getCommentForIssueId();

        $scope.saveComment = function (comment) {
            commentService.saveComment(
                $routeParams.id,
                comment,
                function success(data) {
                    getCommentForIssueId();
                    notifyService.showInfo("Comment added!");
                }, function error(err) {
                    notifyService.showError("Failed saving comment", err);
                }
            );
        }
    }
);

app.controller('EditIssueController',
    function($scope, $location, $routeParams, authService, notifyService, issueService, lableService, projectService, userService) {
        $scope.issueView = "Edit Issue";
        $scope.isEdit = true;
        $scope.setProject = true;

        userService.getAllUsers(function success(data) {
            $scope.users = data;
        }, function error(err) {
            notifyService.showError("Failed loading data...", err);
        });

        issueService.getIssueById(
            $routeParams.id,
            function success(data) {
                data.DueDate = new Date(data.DueDate);
                data.StringLabels = _(data.Labels).map(c => c.Name).value().join(", ");
                $scope.currentProject = data.Project;
                $scope.issueData = data;

                $scope.isAssignee = data.Assignee.Username === authService.getCurrentUser().userName;

                projectService.getAllProjects(function success(projects) {
                    $scope.priorities = _(projects).find(p => p.Id == data.Project.Id).Priorities;
                }, function error(err) {
                    notifyService.showError("Failed loading data...", err);
                });
            }, function error(err) {
                notifyService.showError("Failed loading data...", err);
            }
        );

        $scope.getLabels = function() {
            var filter = $scope.issueData.StringLabels;
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
            var lastComma = $scope.issueData.StringLabels.lastIndexOf(',');
            if (lastComma !== -1) {
                $scope.issueData.StringLabels = $scope.issueData.StringLabels.slice(0, lastComma) + ', ';
            } else {
                $scope.issueData.StringLabels = '';
            }

            $scope.issueData.StringLabels += label.Name + ', ';
            $scope.labels = [];
        }

        $scope.saveIssue = function (issueData) {
            issueData.Labels = [];
            issueData.AssigneeId = issueData.Assignee.Id;
            issueData.PriorityId = issueData.Priority.Id;

            if (issueData.StringLabels) {
                issueData.StringLabels.split(",").forEach(function(l) {
                    if (l.trim()) {
                        issueData.Labels.push({ Name: l.trim() });
                    }
                }); 
            }

            issueService.updateIssue(
                issueData,
                function success(data) {
                    $location.path('/issues/' + data.Id);
                }, function error(err) {
                    notifyService.showError("Failed updating issue", err);
                }
            );
        }

        $scope.changeStatus = function(statusId) {
            issueService.changeStatus(
                $routeParams.id,
                statusId,
                function success(data) {
                    issueService.getIssueById(
                        $routeParams.id,
                        function success(issue) {
                            $scope.issueData.Status = issue.Status;
                        },
                        function error(err) {
                            notifyService.showError(err.Message, err);
                        });
                }, function error(err) {
                    notifyService.showError(err.Message, err);
                }
            );
        }
    }
);