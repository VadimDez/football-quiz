var url = '//localhost:9000';
angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Room', ['$http', function ($http) {
  return {
    create: function (username) {
      return $http({
        method: 'POST',
        url: url + '/rooms/',
        data: {
          username: username
        }
      })
    },
    all: function () {
      return $http.get(url + '/rooms/')
    },
    join: function (id, username) {
      return $http({
        method: 'POST',
        url: url + '/rooms/join/',
        data: {
          id: id,
          username: username
        }
      })
    }
  }
}])

.factory('Answer', ['$http', function ($http) {
  return {
    create: function (id, answer, room) {
      return $http({
        method: 'POST',
        url: url + '/answers',
        data: {
          id: id,
          answer: answer,
          room: room,
          username: localStorage.getItem('username')
        }
      })
    },
    results: function(roomId) {
      return $http(url + '/answers/aggregate/' + roomId)
    }
  }
}])

.factory('Question', function ($http) {
  return {
    get: function (roomId) {
      return $http.get(url + '/questions/' + roomId)
    }
  }
});
