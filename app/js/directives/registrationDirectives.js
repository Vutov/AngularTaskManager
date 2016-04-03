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