'use strict';

app.controller('DashboardController',
   function ($scope, $location, notifyService, pageSize) {

       // TODO remove when called service
       var projects = [
           { id: 1, project: 'SIT', issue: 'Bad Request has no message describing the problem', date: '28/03/2016' },
           { id: 2, project: 'Cart Management', issue: "Adding new product doesn't list correct price", date: '30/03/2016' },
           { id: 3, project: 'Nasdaq informational site', issue: 'English version broken', date: '02/04/2016' },
           { id: 4, project: 'Nasdaq informational site2', issue: 'English version broken2', date: '02/04/2016' },
           { id: 5, project: 'Nasdaq informational site3', issue: 'English version broken3', date: '02/04/2016' },
           { id: 6, project: 'Nasdaq informational site4', issue: 'English version broken4', date: '02/04/2016' },
           { id: 7, project: 'Nasdaq informational site5', issue: 'English version broken5', date: '02/04/2016' },
           { id: 8, project: 'Nasdaq informational site6', issue: 'English version broken6', date: '02/04/2016' },
           { id: 9, project: 'Nasdaq informational site7', issue: 'English version broken7', date: '02/04/2016' },
           { id: 10, project: 'Nasdaq informational site8', issue: 'English version broken8', date: '02/04/2016' },
           { id: 11, project: 'Nasdaq informational site9', issue: 'English version broken9', date: '02/04/2016' },
       ];


       $scope.projectsParams = {
          'startPage' : 1,
          'pageSize' : pageSize
       };

       $scope.predicate = 'date';
       $scope.reverse = false;
       $scope.order = function (predicate) {
           $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
           $scope.predicate = predicate;
       };

       $scope.viewProject = function(id) {
           $location.path("/projects/" + id);
       }

       $scope.getProjects = function () {
           // TODO call service

           var offset = ($scope.projectsParams.startPage - 1) * $scope.projectsParams.pageSize;
           var limit = $scope.projectsParams.pageSize;
           $scope.projects = _(projects).slice(offset).take(limit).value();
       }

       $scope.allProjects = function () {
           // TODO rework
           return projects.length;
       }

       $scope.getProjects();
   }
);
