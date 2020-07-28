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
function createDOM(vdom) {
    // vdom有两种情况，一种是普通的文本，
    // 第二种是通过createElement创建出来的React元素
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom)
    }
    //处理React元素
    let { type, props } = vdom
    //1.创建该类型的元素
    let elm = document.createElement(type)
    //2.处理该元素的属性
    updateProps(elm, props)
    //3.处理子元素
    if(props.children){
        if(typeof props.children === 'number' || typeof props.children === 'string'){
            elm.textContent = props.children
        }else if(typeof props.children === 'object' && props.children.type){
            render(props.children, elm)
        }else if(Array.isArray(props.children)){
            props.children.forEach(child => render(child, elm))
        }
    }
    return elm
}

/**
 * 处理属性
 * @param {*} dom 目标元素
 * @param {*} props 属性
 */
function updateProps(dom, props) {
    if (!props) return
    for (let key in props) {
        if(key === 'className'){
           dom[key] = props[key]
        }else if(key === 'style'){
            for(let attr in props[key]){
                dom.style[attr] = props[key][attr]
            }
        }
    }
}

export default {
    render
}