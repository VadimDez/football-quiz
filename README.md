#Football quiz

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