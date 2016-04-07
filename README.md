# SonyCameraController

try it!
```sh
$ npm install
$ npm start 
```

# API

##### post(method&lt;String&gt;, params&lt;String?&gt;, version&lt;String?&gt;) =&gt; &lt;Promise&gt;

```js
post("getSupportedShootMode");

post("getShootMode")
.then(post("setShootMode","still"))
.then(post("actTakePicture"))
.then((res) => {
  console.log(res.data.result);
})
.then(post("getEvent", true, "1.1"))
.catch((err)=> {
  console.error(err);
});
```
##### wait(time&lt;String?&gt;) =&gt; &lt;Promise&gt;

```js
post("setShootMode", "movie")
.then(post("startMovieRec"))
.then(post("getEvent", true))
.then(wait(5000))
.then(post("stopMovieRec"))
.catch((err)=> {
  console.error(err);
});
```
