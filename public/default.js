const app = angular.module('chores', [
  'ngRoute'
])

app.controller('HomeController', HomeController)
HomeController.$inject = ['$scope', '$window', 'choresData']
function HomeController($scope, $window, choresData) {

  const vm = this

  vm.test = 'angular-test'
  vm.userList = []

  choresData.loadUsers().then(chores => {
    vm.userList = chores
    console.log(vm.userList)
  })

}

app.factory('choresData', choresData)
choresData.$inject = ['$http']
function choresData($http) {

  return {
    loadUsers
  }

  function loadUsers() {
    return $http.get('./chores').then(res => res.data)
  }
}
