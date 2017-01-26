const app = angular.module('chores', [
  'ngRoute'
])

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/ChooseChild', {
        templateUrl: '/templates/choose-child.html',
        controller: 'ChooseChildController',
        controllerAs: 'choose'
      })
      .when('/Admin', {
        templateUrl: '/templates/admin.html',
        controller: 'AdminController',
        controllerAs: 'admin'
      })
      .when('/DailyChores', {
        templateUrl: '/templates/daily.html',
        controller: 'ChoresController',
        controllerAs: 'childchores'
      })
      .when('/MorningChores', {
        templateUrl: '/templates/morning.html',
        controller: 'ChoresController',
        controllerAs: 'childchores'
      })
      .when('/AfternoonChores', {
        templateUrl: '/templates/afternoon.html',
        controller: 'ChoresController',
        controllerAs: 'childchores'
      })
      .when('/EveningChores', {
        templateUrl: '/templates/evening.html',
        controller: 'ChoresController',
        controllerAs: 'childchores'
      })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false});
  }
])

app.controller('HomeController', HomeController)
HomeController.$inject = ['$scope', '$window', 'choresData', '$anchorScroll', '$location' ]
function HomeController($scope, $window, choresData, $anchorScroll, $location) {

  const vm = this
  vm.viewAdmin = gotoAdmin
  vm.viewChooseChild = gotoChooseChild

  function gotoAdmin() {
    $location.path('/Admin')
  }

  function gotoChooseChild() {
    $location.path('/ChooseChild')
  }

}

app.controller('ChooseChildController', ChooseChildController)
ChooseChildController.$inject = ['$scope', '$window', 'choresData', 'childChores', '$anchorScroll', '$location' ]
function ChooseChildController($scope, $window, choresData, childChores, $anchorScroll, $location) {

  const vm = this
  vm.childList = []
  vm.thisChild = loadThisChild

  loadUsers()

  function loadUsers() {
    choresData.readAll()
      .then(chores => {vm.childList = chores})
      .catch(() => showError('Server Error: Unable to Load Chores'))
  }

  function loadThisChild(child) {
    $location.path('/DailyChores')
    childChores.loadChild(child)
  }

}

app.controller('ChoresController', ChoresController)
ChoresController.$inject = ['$scope', '$window', '$location', 'choresData', 'childChores']
function ChoresController($scope, $window, $location, choresData, childChores) {

  const vm = this
  vm.allChores = childChores.allChores
  vm.childName = childChores.childName
  vm.morningChores = childChores.morningChores
  vm.afternoonChores = childChores.afternoonChores
  vm.eveningChores = childChores.eveningChores
  vm.loadMorningChores = loadMorningChores
  vm.loadAfternoonChores = loadAfternoonChores
  vm.loadEveningChores = loadEveningChores

  function loadMorningChores() {
    console.log('it worked')
    $location.path('/MorningChores')
  }
}

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
      .then(loadUsers())
      .catch(() => showError('Server Error: Unable to Create Chore'))
  }

  function removeChores(chore, child) {
    choresData.deleteChore(chore, child)
      .then(loadUsers())
      .catch(() => showError('Server Error: Unable to Remove Chore'))
  }

}

app.factory('childChores', childChores)
function childChores() {
  let allChores
  const chores = {
    loadChild,
    childName: '',
    allChores,
    morningChores: [],
    afternoonChores: [],
    eveningChores: []
  }

  return chores

  function loadChild(child) {
    chores.allChores = child.chores
    chores.childName = child.name
    chores.morningChores = child.chores.filter(function(item) {
      return item.time === "Morning"
    })
    chores.afternoonChores = child.chores.filter(function(item) {
      return item.time === "Afternoon"
    })
    chores.eveningChores = child.chores.filter(function(item) {
      return item.time === "Evening"
    })
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
    let params = {
      child: child,
      chore: chore
    }
    return $http.put('./chores/' + child._id, params).then(res => res.data)
  }

  function readAll() {
    return $http.get('./chores').then(res => res.data)
  }
}
