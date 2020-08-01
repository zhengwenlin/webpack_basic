import {addListener} from './event'
/**
 * 渲染函数，将React元素（虚拟dom）渲染为真实的dom，挂载到dom容器上
 * @param {*} vdom 
 * @param {*} dom 
 */
function render(vdom, parentDOM) {
  //将虚拟dom转换成真实的dom，放到容器中
  let element = createDOM(vdom)
  parentDOM.appendChild(element)
}

/**
 * 将虚拟dom转成真实dom
 * @param {*} vdom 
 */
export function createDOM(vdom) {
  // vdom有两种情况，一种是普通的文本，
  // 第二种是通过createElement创建出来的React元素
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  //处理React元素
  let { type, props } = vdom
  //1.创建该类型的元素
  let elm;
  //这里的type有两种：1.标签字符串h1 2.函数（类和普通函数）
  if (typeof type === 'function') {
    //函数组件或者类组件 使用 isReactComponent 属性区分
    console.dir(type)
    console.log(type.isReactComponent,'----')
    if (type.prototype.isReactComponent) {
      //类组件
      return updateClassComponent(vdom)
    } else {
      //函数组件
      //该函数用于处理函数组件，返回真实的dom
      return updateFunctionComponent(vdom)
    }

  } else {
    elm = document.createElement(type)
  }

  //2.处理该元素的属性
  updateProps(elm, props)
  //3.处理子元素
  if (props.children) {
    if (typeof props.children === 'number' || typeof props.children === 'string') {
      elm.textContent = props.children
    } else if (typeof props.children === 'object' && props.children.type) {
      render(props.children, elm)
    } else if (Array.isArray(props.children)) {
      props.children.forEach(child => render(child, elm))
    }
  }
  return elm
}
/**
 * 解析函数组件，返回真实dom元素
 * @param {*} vdom 
 */
function updateFunctionComponent(vdom) {
  let { type, props } = vdom
  //这里的type是函数，返回jsx的React元素
  let renderedVdom = type(props)
  //递归解析
  return createDOM(renderedVdom)
}

/**
 * 该函数用于处理类组件，返回真实的DOM
 * @param {*} vdom 
 */
function updateClassComponent(vdom){
  let { type, props } = vdom;
  let instance = new type(props)
  let renderedVdom = instance.render()
  //递归解析
  let dom = createDOM(renderedVdom)
  //让组件的实例和对应的真实的dom做一个关联
  instance.dom = dom
  return dom
}

/**
 * 处理属性
 * @param {*} dom 目标元素
 * @param {*} props 属性
 */
function updateProps(dom, props) {
  if (!props) return
  for (let key in props) {
    if (key === 'className') {
      dom[key] = props[key]
    }else if(key.startsWith('on')){
      //处理事件
      addListener(dom, key.toLocaleLowerCase(), props[key])
    }else if (key === 'style') {
      for (let attr in props[key]) {
        dom.style[attr] = props[key][attr]
      }
    }
  }
}

export default {
  render
}