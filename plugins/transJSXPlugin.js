const babel = require('@babel/core')
const t = require('@babel/types')

//将jsx转换成CreateElement语法
let code = `<h1 id="title"><span>hello</span>world</h1>`

let transJSXPlugin = {

}


let result = babel.transform(code, {
    plugins: [transJSXPlugin]
})

console.log(result.code)