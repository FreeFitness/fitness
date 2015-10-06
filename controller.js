

var fitnessApp = angular.module('fitnessApp', []);

fitnessApp.controller('FitnessController', ['$scope', '$http', function($scope, $http) {
    var json;
    var url = "https://raw.githubusercontent.com/hhirsch/fitness_log_json/master/fitness.json";
    $http({
        url: url,
        method: "GET"
    }).success(function(data, status, headers, config) {
        $scope.strengths = data['strength'];
        $scope.name = data['name'];
    }).error(function(data, status, headers, config) {
        $scope.status = status;
    });
    $scope.foo = "bar";
}]);
