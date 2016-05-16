

var fitnessApp = angular.module('fitnessApp', [ 'ngResource','ui.router' ]);

fitnessApp.config(function($stateProvider){
    $stateProvider.state('new', {
        url: '/new?userId',
        templateUrl: 'exercises.html',
        controller: 'FitnessController'
    });
})

fitnessApp.controller('FitnessController', ['$scope', '$stateParams','$http', function($scope, $stateParams, $http) {
    var json;
    var userResourceUrl =
        "https://raw.githubusercontent.com/FreeFitness/fitness-log-users/master/users.json";
    //var url = "https://raw.githubusercontent.com/hhirsch/fitness_log_json/master/fitness.json";
    https://gist.githubusercontent.com/hhirsch/0543e29c3842edeb7ab8619823331bae/raw/6b82ea33ca231a1944456de2054edb92720ef054/johnwayne.json

    $http({
        url: userResourceUrl,
        method: "GET"
    }).success(function(data, status, headers, config) {
        if ($stateParams.userId === undefined) {
            $scope.userData = data['henry'];
        } else {
            $scope.userData = data[$stateParams.userId];
        }
        //console.log($scope.userData);
        $http({
            url: $scope.userData[0]['resource'],
            method: "GET"
        }).success(function(data, status, headers, config) {
            console.log($scope.userData);
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
