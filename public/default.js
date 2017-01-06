const app = angular.module('chores', [
])

app.controller('HomeController', HomeController)
HomeController.$inject = ['$scope', '$window']
function HomeController($scope, $window) {

  const vm = this

  vm.test = 'angular-test'
}
