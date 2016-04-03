'use strict';

app.controller('HomeController',
   function ($scope, $rootScope, notifyService, pageSize) {
       $rootScope.pageTitle = "Home";

      $scope.adsParams = {
          'startPage' : 1,
          'pageSize' : pageSize
      };
   }
);
