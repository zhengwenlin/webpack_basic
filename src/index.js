import React from './react'
import ReactDOM from './react-dom'

// import React from 'react'
// import ReactDOM from 'react-dom'

let element = React.createElement('h1',
  {title: '你好', style: {color: 'red'}},
  React.createElement('span', null, 'hello '),
  'world'
)



//处理组件
//1.函数组件
// function Panal(props){
//   return (
//     <div>
//        Panal组件：{props.name}
//     </div>
//   )
// }
// let element = <Panal name="title"> <span>hello</span></Panal>
console.log(element)
//使用render方法将element这个React元素渲染到root这个容器中
ReactDOM.render(element, document.getElementById('root'))