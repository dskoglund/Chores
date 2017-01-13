const app = angular.module('chores', [
  'ngRoute'
])

app.controller('AdminController', AdminController)
AdminController.$inject = ['$scope', '$window', 'choresData']
function AdminController($scope, $window, choresData) {

  const vm = this
  vm.childList = []
  vm.newChild = { name: '', dailyChores:[ { time: 'morning', chores: [{ chore: 'Brush Your Teeth', completed: false }] }, { time: 'afternoon', chores: [{ chore: '', completed: false }] }, { time: 'evening', chores: [{ chore: 'Brush Your Teeth', completed: false}] } ] }
  vm.createChild = create
  vm.deleteChild = remove
  vm.choreTime = { time: '', chores: [vm.newChore]}
  vm.newChore = { chore: '', complete: false}
  vm.createChore = createChores

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

  function createChores(chore) {
    choresData.createChore(chore)
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
    // deleteChore,
    deleteChild
  }

  function createChild(item) {
      return $http.post('./chores', item).then(res => res.data)
  }

  function deleteChild(item) {
    return $http.delete('./chores' + '/' +  item._id).then(res => res.data)
  }

  function createChore() {
    return $http.post('./chore/')
  }

  function readAll() {
    return $http.get('./chores').then(res => res.data)
  }
}
