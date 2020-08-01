
// import React from './react'
// import ReactDOM from './react-dom'

import React from 'react'
import ReactDOM from 'react-dom'

// ref
class Calcutlator extends React.Component {
  constructor(props){
    super(props)
    this.a = React.createRef()
    this.b = React.createRef()
    this.result = React.createRef()
  }
  add = () => {
   this.result.current.value = this.a.current.value + this.b.current.value  
  }
  render(){
    return (
       <div>
         <input ref={this.a} />  +    
         <input ref={this.b} />  <button onClick={this.add}>=</button>   
         <input ref={this.result} />     
      </div>
    )
  }
}
let element = <Calcutlator />
//使用render方法将element这个React元素渲染到root这个容器中
ReactDOM.render(element, document.getElementById('root'))