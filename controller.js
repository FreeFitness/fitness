

var fitnessApp = angular.module('fitnessApp', [ 'ngResource','ui.router' ]);

fitnessApp.config(function($stateProvider){
    $stateProvider.state('exercise', {
        url: '/exercise?userId',
        templateUrl: 'exercises.html',
        controller: 'FitnessController',
    });
    $stateProvider.state('fat', {
        url: '/fat?userId',
        templateUrl: 'fat.html',
        controller: 'FitnessController',
    });
})

fitnessApp.controller('FitnessController', ['$scope', '$stateParams','$http', '$timeout', function($scope, $stateParams, $http, $timeout) {
    var json;
    var userResourceUrl =
        "https://raw.githubusercontent.com/FreeFitness/fitness-log-users/master/users.json";

    $scope.$on('$viewContentLoaded',
            function(event){
                $timeout(function () {
                    drawExerciseChart();
                }, 100);
    });

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
            url: $scope.userData['resource'] + 'strength.json',
            method: "GET"
        }).success(function(data, status, headers, config) {
            $scope.strengths = data;
            $scope.id = $stateParams.userId;
        }).error(function(data, status, headers, config) {
            $scope.status = status;
        });
    }).error(function(data, status, headers, config) {
        $scope.status = status;
    });


    $scope.foo = "bar";
}]);
