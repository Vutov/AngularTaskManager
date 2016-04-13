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
                    this.innerText = this.innerText.replace('Hide', 'Show');
                } else {
                    this.innerText = this.innerText.replace('Show', 'Hide');
                }

                controllScope.showUsers = !controllScope.showUsers;
            });
        }
    };
}]);