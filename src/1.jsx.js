//react的核心库
import React from 'react'
//负责渲染dom的
import ReactDOM from 'react-dom'

let element = React.createElement('h1',
  {
    className: 'title',
    style: {color: 'red'}
  },
  React.createElement('span', null, 'world'),
  'xx'
)
console.log('elemenet', element)
ReactDOM.render(element, document.getElementById('root'))
