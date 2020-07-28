
import React from './react'
import ReactDOM from './react-dom'

// import React from 'react'
// import ReactDOM from 'react-dom'

// let element = React.createElement('h1',
//   {title: '你好', style: {color: 'red'}},
//   React.createElement('span', null, 'hello '),
//   'world'
// )


// 函数组件
// function FunctionComponent(props){
//   return (
//     <div className="title" style={{color: 'red'}}>
//        <span>{props.name}</span>
//        {props.children}
//     </div>
//   )
// }
//函数组件的渲染过程：
//jsx语法是由babel做的静态语法转换（ast解析），将使用组件的jsx语法转换成了createElement语法
//然后createElement语法在浏览器中执行该方法，返回的就是该组件对应的的React元素（组件的虚拟dom）
//然后是调用ReactDOM.render将组件的React元素（组件的虚拟DOM）转换成真实的DOM，转换的过程中发现
//该React元素的type的类型是函数，并不是标签，所以判断是一个函数组件，就会调用函数，返回该组件返回
//的jsx语法，再经过babel的转换，成createElement语法，重新在浏览器中执行返回React元素，
//重新调用ReactDOM.render将组件返回的React元素（组件的虚拟DOM）转换成真实的DOM插入页面，结束。
// let element = <FunctionComponent name="hello">world</FunctionComponent>

// 类组件
class ClassComponent extends React.Component {
  render(){

   return (
      <div className="title" style={{color: 'red'}}>
          <span>{this.props.name}</span>
          {this.props.children}
      </div>
    )
  }
}
let element = <ClassComponent name="hello">world</ClassComponent>
console.log(element)
//使用render方法将element这个React元素渲染到root这个容器中
ReactDOM.render(element, document.getElementById('root'))