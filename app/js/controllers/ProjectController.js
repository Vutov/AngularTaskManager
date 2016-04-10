'use strict';

app.controller('ProjectController',
   function ($scope, $routeParams, $route, $location, notifyService, pageSize) {
       $scope.isEdit = false;

       if ($route.current.originalPath.indexOf("edit") !== -1) {
           $scope.isEdit = true;
       }

       var id = $routeParams.id;
       console.log(id);

       // TODO call service
       if ($scope.isEdit) {
           $scope.projectView = "Edit Project";
           $scope.project = {
               name: "SIT", leader: "Pesho", key: "1234", priorities: "Low, Medium, Urgent",
               labels: "Softuni, software", description: "Project for managing issues for specific projects with priorities, status transitions and labels"
           }

           // TODO get from service
           $scope.leaders = ["Pesho", 'IVAN'];
       } else {
           $scope.projectView = "Project";
           $scope.project = {
               name: "SIT", leader: "Pesho", key: "1234", priorities: "Low, Medium, Urgent",
               labels: "Softuni, software", description: "Project for managing issues for specific projects with priorities, status transitions and labels"
           }
       }

       $scope.isProjectLeader = function () {
           // TODO call service or check id against leader id, depeding on what is returned from the server
           return true;
       }

       $scope.addIssue = function () {
           //$location.path("projects/" + id + "/add-issue");
           throw Error("Implement!")
       }

       $scope.editProject = function () {
           $location.path("projects/" + id + "/edit");
       }

       $scope.saveProject = function (projectData) {
           // TODO call service
       }
   }
);
