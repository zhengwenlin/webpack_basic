//react的核心库
import React from 'react'
//负责渲染dom的
import ReactDOM from 'react-dom'

// 组件： 分为函数组件和类组件
// 函数组件本质上就是一个函数，接收props，返回React元素
// function Panel(props) {
//    return <div>面板{props.name}</div>
// }
class Panel extends React.Component {
  constructor(props){
    super(props)
    this.props = props
  }
  render(){
    return (
    <div>{this.props.name}</div>
    )
  }
}
let element = <div title="100"><Panel name={'zf'} /><span>xxx</span></div>
console.log('element', element)
ReactDOM.render(element, document.getElementById('root'))


/*
  函数组件和类组件的区别：
  1. 类组件消耗性能，因为类组件需要创建组件的实例，调用render方法，返回React元素；类组件不会
     被销毁，因为不知道什么时候组件会更新
  2. 函数组件不消耗性能，因为函数组件不需要new创建实例，调用完成返回React就会被销毁
*/
