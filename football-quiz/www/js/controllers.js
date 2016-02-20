angular.module('starter.controllers', [])

  .controller('InitCtrl', function ($scope, $state, Room, $ionicModal) {
    $scope.user = {username: ''};
    $scope.createGame = createGame;
    $scope.done = done;

    /**
     * Create game
     */
    function createGame() {
      $scope.modal.show();
    }

    function done() {
      $scope.modal.hide();
      Room.create($scope.user.username)
        .success(function (room) {
          $state.go('tab.dash', {roomId: room._id, question: 0})
        })
    }

    $ionicModal.fromTemplateUrl('templates/username-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
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

    $state.go('tab.dash', {roomId: roomId, question: 0});
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
  var questions = [];
  $scope.answer = answer;
  $scope.question = null

  function answer(value) {
    $state.go('result-gif', {roomId: $state.params.roomId, question: $state.params.question});
    //Answer.create(questioin._id, value)
  }


  Question.get($state.params.roomId)
    .success(function (data) {
      $scope.question = data[parseInt($state.params.question, 10)]
      questions = data
    })
})

.controller('ResultGifCtrl', function ($scope, $state) {
  $scope.next = function () {
    $state.go('result-explain', {roomId: $state.params.roomId, question: $state.params.question})
  };
})

.controller('ResultExplainCtrl', function ($scope, $state) {
  $scope.back = function () {
    $state.go('tab.dash', {roomId: $state.params.roomId, question: parseInt($state.params.question, 10) + 1});
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
