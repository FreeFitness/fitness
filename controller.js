

var fitnessApp = angular.module('fitnessApp', [ 'ngResource','ui.router' ]);

fitnessApp.config(function($stateProvider){
    $stateProvider.state('exercise', {
        url: '/exercise?userId',
        templateUrl: 'exercises.html',
        controller: 'FitnessController',
    });
})

fitnessApp.directive('onFinishRenderFilters', function ($timeout) {
    return {
        link: function (scope, element, attr) {

           if (scope.$last === true) {
               $timeout(function () {
                   drawExerciseChart();
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});


fitnessApp.controller('FitnessController', ['$scope', '$stateParams','$http', function($scope, $stateParams, $http) {
    var json;
    var userResourceUrl =
        "https://raw.githubusercontent.com/FreeFitness/fitness-log-users/master/users.json";

    $http({
        url: userResourceUrl,
        method: "GET"
    }).success(function(data, status, headers, config) {
        if ($stateParams.userId === undefined) {
            $scope.userData = data['henry'];
        } else {
            $scope.userData = data[$stateParams.userId];
        }
        $scope.users = data;
        $http({
            url: $scope.userData[0]['resource'],
            method: "GET"
        }).success(function(data, status, headers, config) {
            $scope.strengths = data['strength'];
            $scope.name = data['name'];
            $scope.id = $stateParams.userId;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        });
    }).error(function(data, status, headers, config) {
        $scope.status = status;
    });


    $scope.foo = "bar";
}]);
