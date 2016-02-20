angular.module('starter.controllers', [])

  .controller('InitCtrl', function ($scope, $state, Room) {

    $scope.createGame = createGame;
    $scope.joinGame = joinGame;

    /**
     * Create game
     */
    function createGame() {
      Room.create()
        .success(function (room) {
          $state.go('tab.dash')
        })
    }

    /**
     * Join game
     */
    function joinGame() {

    }
  })

.controller('DashCtrl', function($scope, Room, $state) {
  $scope.answer = answer;
  
  function answer(value) {
    console.log(value);
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
