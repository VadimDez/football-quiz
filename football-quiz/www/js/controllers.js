angular.module('starter.controllers', [])

  .controller('InitCtrl', function ($scope, $state, Room, $ionicModal) {
    $scope.user = {username: ''};
    $scope.createGame = createGame;
    $scope.done = done;
    $scope.isCreate =  true

    /**
     * Create game
     */
    function createGame() {
      $scope.modal.show();
    }

    function done() {
      localStorage.setItem('username', $scope.user.username);
      $scope.modal.hide();
      Room.create($scope.user.username)
        .success(function (room) {
          $state.go('questions', {roomId: room._id, question: 0})
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

    $state.go('questions', {roomId: roomId, question: 0});
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
.controller('DashCtrl', function($scope, Room, $state, Question, Answer, $interval, CountdownTimer) {
  var interval;
  var count = 0;
  $scope.answer = answer;
  $scope.question = null
  $scope.number = parseInt($state.params.question, 10) + 1
  $scope.timer = new CountdownTimer(10000)

  $scope.timer.start()

  var questions = [];

  function answer(value) {
    Answer.create(questions[$state.params.question]._id, value, $state.params.roomId)
      .success(function (answer) {
        $state.go('result-gif', {roomId: $state.params.roomId, question: $state.params.question, isTrue: answer.value});
      })
  }


  Question.get($state.params.roomId)
    .success(function (data) {
      questions = data
      if (data && data.hasOwnProperty(parseInt($state.params.question, 10))) {
        $scope.question = data[parseInt($state.params.question, 10)]
        interval = $interval(countdown, 1000)
      } else {
        $state.go('result', {roomId: $state.params.roomId})
      }
    })

  function countdown() {
    if (count >= 10) {
      $interval.cancel(interval)
      answer()
      return
    }

    count++;
  }
})

.controller('ResultGifCtrl', function ($scope, $state) {
  $scope.isTrue = $state.params.isTrue
  console.log($scope.isTrue);
  $scope.next = function () {
    $state.go('result-explain', {roomId: $state.params.roomId, question: $state.params.question})
  };
})

.controller('ResultExplainCtrl', function ($scope, $state, Question) {
  $scope.back = function () {
    $state.go('questions', {roomId: $state.params.roomId, question: parseInt($state.params.question, 10) + 1});
  }

  Question.get($state.params.roomId)
    .success(function (questions) {
      $scope.question = questions[$state.params.question]
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


.controller('ResultCtrl', function($scope, $state, Answer) {
  Answer.results($state.params.roomId)
    .success(function (results) {
      $scope.results = results
    })
});
