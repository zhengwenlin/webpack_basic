
import React from './react'
import ReactDOM from './react-dom'

// import React from 'react'
// import ReactDOM from 'react-dom'

// 组件的状态和事件
class Counter extends React.Component {
  constructor(props){
    super(props)
    //声明组件的私有状态
    this.state = {
      count: 0
    }
  }
  handleClick = (e)=> {
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count)
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count)
    this.setState(prevState => ({count: prevState.count + 1}))
    console.log(this.state.count)
    this.setState(prevState => ({count: prevState.count + 1}))
    console.log(this.state.count)

    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      })
      console.log(this.state.count)
    }, 1000)
  }
  render(){
    return (
      <div>
         {this.state.count}
         <button onClick={this.handleClick}>点我</button>
      </div>
    )
  }
}
let element = <Counter></Counter>
//使用render方法将element这个React元素渲染到root这个容器中
ReactDOM.render(element, document.getElementById('root'))