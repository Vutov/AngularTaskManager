'use strict';

app.directive("ngProjectView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/project.html'
    };
}]);

app.directive("ngProjectForm", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/project-form.html'
    };
}]);

app.directive("ngIssueView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/issue-view.html'
    };
}]);

app.directive("ngIssueHeaderView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/issue-header.html'
    };
}]);

app.directive("ngUserView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/user.html'
    };
}]);

app.directive("ngIssueForm", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/issue-form.html'
    };
}]);

app.directive("ngIssueStatuses", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/issue-statuses.html'
    };
}]);

app.directive("spinKit", [function () {
    return {
        restrict: 'A',
        templateUrl: 'lib/spinKit/spinKit.html'
    };
}]);

app.directive("ngCommentForm", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/comment-form.html'
    };
}]);

app.directive("ngCommentView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partial/comment-view.html'
    };
}]);