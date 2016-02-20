angular.module('starter.controllers', [])

  .controller('InitCtrl', function ($scope, $state, Room) {

    $scope.createGame = createGame;

    /**
     * Create game
     */
    function createGame() {
      Room.create()
        .success(function (room) {
          $state.go('tab.dash')
        })
    }
  })

.controller('JoinCtrl', function($scope, Room, $state, $ionicModal) {
  $scope.rooms = [];
  $scope.user = {username: ''};
  $scope.join = join;
  $scope.done = done;
  var roomId;

  Room.all()
    .success(function (data) {
      $scope.rooms = data
    });

  /**
   *
   * @param id
   */
  function join(id) {
    roomId = id
    $scope.modal.show();
  }

  /**
   *
   */
  function done() {
    localStorage.setItem('username', $scope.user.username);

    $state.go('tab.dash', {roomId: roomId});
    $scope.modal.hide();

    Room.join(roomId, $scope.user.username)
  }

  $ionicModal.fromTemplateUrl('templates/username-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})
.controller('DashCtrl', function($scope, Room, $state, Question, Answer) {
  $scope.answer = answer;
  $scope.question = null

  function answer(value) {
    $state.go('result-gif');
    //Answer.create()
  }

  Question.get()
    .success(function (data) {
      $scope.question = data
    })
})

.controller('ResultGifCtrl', function ($scope, $state) {
  $scope.next = function () {
    $state.go('result-explain')
  };
})

.controller('ResultExplainCtrl', function ($scope, $state) {
  $scope.back = function () {
    $state.go('tab.dash');
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
