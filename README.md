- 自己写一个 babel插件,把jsx转换成js
转换前
```js
<h1 id="title"><span>hello</span>world</h1>
```
转换后
```js
React.createElement("h1", {
  id: "title"
},React.createElement("span", null, "hello"), "world");
```
