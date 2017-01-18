const app = angular.module('chores', [
  'ngRoute'
])

app.controller('AdminController', AdminController)
AdminController.$inject = ['$scope', '$window', 'choresData']
function AdminController($scope, $window, choresData) {

  const vm = this
  vm.childList = []
  vm.newChild = { name: '', chores: []}
  vm.createChild = create
  vm.deleteChild = remove
  vm.createChore = createChores
  vm.deleteChore = removeChores

  loadUsers()

  function loadUsers() {
    choresData.readAll()
      .then(chores => {vm.childList = chores})
      .catch(() => showError('Server Error: Unable to Load Chores'))
  }

  function create(child) {
    choresData.createChild(child)
      .then(res => (vm.newChild.name = ''))
      .then(loadUsers())
      .catch(() => showError('Server Error: Unable to Create Child'))
  }

  function remove(child) {
    choresData.deleteChild(child)
      .then(loadUsers())
      .catch(() => showError('Server Error: Unable to Remove Child'))
  }

  function createChores(child, time, description) {
    choresData.createChore(child, time, description)

      .catch(() => showError('Server Error: Unable to Create Chore'))
  }

  function removeChores(chore, child) {
    choresData.deleteChore(chore, child)

      .catch(() => showError('Server Error: Unable to Remove Chore'))
  }

}

app.factory('choresData', choresData)
choresData.$inject = ['$http']
function choresData($http) {

  return {
    createChild,
    createChore,
    readAll,
    // updateChore,
    deleteChore,
    deleteChild
  }

  function createChild(item) {
      return $http.post('./chores', item).then(res => res.data)

  }

  function deleteChild(item) {
    return $http.delete('./chores' + '/' +  item._id).then(res => res.data)
  }

  function createChore(child, time, description) {
    let params = {
      id: child._id,
      chore: description,
      time: time
    }
    return $http.post('./chores' + '/' + child._id, params).then(res => res.data)
  }

  function deleteChore(chore, child) {
    console.log(child._id)
    let params = {
      id: chore.id,
    }
    return $http.put('./chores/' + child._id, params).then(res => res.data)
  }

  function readAll() {
    return $http.get('./chores').then(res => res.data)
  }
}
