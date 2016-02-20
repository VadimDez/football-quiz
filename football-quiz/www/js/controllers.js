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
  $scope.username = '';
  $scope.join = join;
  $scope.done = done;

  Room.all()
    .success(function (data) {
      $scope.rooms = data
    });

  console.log('tasd');
  function join(roomId) {
    console.log('asd');
    $scope.modal.show();

    // tab.dash({roomId: roomId})
  }

  function done() {
    $scope.modal.hide();
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


  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})
.controller('DashCtrl', function($scope, Room, $state, Question, Answer) {
  $scope.answer = answer;
  $scope.question = null

  function answer(value) {
    Answer.create()
  }

  Question.get()
    .success(function (data) {
      $scope.question = data
    })
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
