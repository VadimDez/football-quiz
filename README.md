#Football quiz
![image](https://raw.githubusercontent.com/VadimDez/football-quiz/master/unspecified.jpeg)

### Server

install dependencies

```
sudo npm i
```

Mongo db

navigate into mongo db folder and run:

```
./bin/mongod --dbpath {path}
```


### App


install ionic and cordova globally:

```
npm install -g cordova ionic
```

install dependencies

```
npm i
```

serve ionic

```
ionic serve
```

#### Team
- Volker Heinrich (Designer)
- Ronja Brettschneider (Designer)
- Benedict Witzenberger (Journalist)
- Michael Haas (Journalist)
- Florian Dietsche  (Journalist)
- Vadym Yatsyuk (Developer)

#### INFO

Example question format:

```js
[{
    question: String,
    explanation: String,
    answer: Boolean,
    player: String,
    team: String
}]
```
