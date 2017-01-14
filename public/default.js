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
  vm.choreTime = { time: '' }
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

  function createChores(child, time, chore) {
    console.log("createChore in angular")
    choresData.createChore(child, time, chore)
      .then(loadUsers())
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

  function createChore(child, time, chore) {
    //child returns "child.name" time returns "morning afternoon or evening" chore returns "text"
    let config = {
      params: { childName: child,
                choreName: chore,
                choreTime: time }
    }
    console.log(config)
    return $http.post('./chores' + '/' + child, config).then(res => res.data)
  }

  function readAll() {
    return $http.get('./chores').then(res => res.data)
  }
}
