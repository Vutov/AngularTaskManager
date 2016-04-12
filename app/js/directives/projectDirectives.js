'use strict';

app.directive("ngProjectView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/project.html'
    };
}]);


app.directive("ngIssueView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/issue.html'
    };
}]);