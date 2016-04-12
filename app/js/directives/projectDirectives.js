'use strict';

app.directive("ngProjectView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/project.html'
    };
}]);