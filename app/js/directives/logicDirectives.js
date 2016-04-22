'use strict';

app.directive("ngComparePasswords", [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.ngComparePasswords;
            elem.on('keyup', function () {
                scope.$apply(function () {
                    var valid = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('matchingPasswords', valid);
                });
            });
        }
    };
}]);

app.directive("ngToggleUsers", [function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            var controllScope = scope;
            $(elem).click(function () {
                if (controllScope.showUsers) {
                    this.innerHTML = this.innerHTML.replace('Hide', 'Show');
                } else {
                    this.innerHTML = this.innerHTML.replace('Show', 'Hide');
                }

                controllScope.showUsers = !controllScope.showUsers;
            });
        }
    };
}]);

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (isLoading) {
                if (isLoading) {
                    $(elem).show();
                    $(elem).parent().addClass("loading");
                } else {
                    $(elem).hide();
                    $(elem).parent().removeClass("loading");
                }
            });
        }
    };

}]);