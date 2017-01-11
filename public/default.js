const app = angular.module('chores', [
  'ngRoute'
])

app.controller('HomeController', HomeController)
HomeController.$inject = ['$scope', '$window', 'choresData']
function HomeController($scope, $window, choresData) {

  const vm = this

  vm.childList = []
  vm.newChild = { name: '', dailyChores:[] }
  vm.create = create

  loadUsers()

  function loadUsers() {
    choresData.readAll()
      .then(chores => {vm.childList = chores})
      .catch(() => showError('Server Error: Unable to Load Chores'))
  }

  function create(child) {
    choresData.createChild(child)
      .then(res => vm.chores.push(res) && (vm.newChild.name = ''))
      .catch(() => showError('Server Error: Unable to Create Child'))
  }
}

app.factory('choresData', choresData)
choresData.$inject = ['$http']
function choresData($http) {

  return {
    createChild,
    // createChore,
    readAll,
    // updateChore,
    // deleteChore,
    // deleteChild
  }

  function createChild(item) {
      return $http.post(URL, item).then(res => data)
  }
  //
  // function createChore() {
  //   return $http.post('./chore/')
  // }

  function readAll() {
    return $http.get('./chores').then(res => res.data)
  }

}
