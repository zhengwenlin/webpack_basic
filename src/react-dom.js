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
    if (props) {
        for (let key in props) {
            let current = props[key]
            if (key === 'children') {
                reconcileChildren(elm, current)
            } else {
                if (key === 'style') {
                    for (let v in current) {
                        elm.style[v] = current[v]
                    }
                } else {
                    elm[key] = current
                }
            }
        }

    }
    return elm
}
/**
 * 处理children元素
 * @param {*} dom 父dom元素
 * @param {*} children 
 */
function reconcileChildren(dom, children) {
    if (children) {
        if (Array.isArray(children)) {
            //数组
            children.forEach(child => render(child, dom))
        } else {
            //对象
            render(children, dom)
        }
    }
}


export default {
    render
}