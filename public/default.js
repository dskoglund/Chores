const app = angular.module('chores', [
  'ngRoute'
])

app.controller('AdminController', AdminController)
AdminController.$inject = ['$scope', '$window', 'choresData']
function AdminController($scope, $window, choresData) {

  const vm = this

  vm.childList = []
  vm.newChild = { name: '', chores:[] }
  vm.createChild = create
  vm.deleteChild = remove

  loadUsers()

  function loadUsers() {
    choresData.readAll()
      .then(chores => {vm.childList = chores})
      .catch(() => showError('Server Error: Unable to Load Chores'))
  }

  function create(child) {
    choresData.createChild(child)
      .then(res => vm.childList.push(res) && (vm.newChild.name = ''))
  }

  function remove(child) {
    choresData.deleteChild(child)
      .then(loadUsers())
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
    deleteChild
  }

  function createChild(item) {
      return $http.post('./chores', item).then(res => res.data)
  }

  function deleteChild(item) {
    return $http.put('./chores' + '/' +  item._id).then(res => res.data)
  }
  //
  // function createChore() {
  //   return $http.post('./chore/')
  // }

  function readAll() {
    return $http.get('./chores').then(res => res.data)
  }

}
