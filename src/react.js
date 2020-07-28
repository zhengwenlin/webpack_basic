import Component from './Component'
/**
 * 该方法用于创建React元素
 * React元素本质上是一个普通的JS对象
 * @param {*} type  类型
 * @param {*} config  属性
 * @param {*} children  子元素
 */
function createElement(type, config, children) {
    let props = { ...config }
    //chilren比较特殊，
    //1.没有子元素就没有children这个属性，undefined
    //2.如果有一个子元素，chilren就是对象
    //3.如果是多个子元素，chilren就是数组
    let args = Array.prototype.slice.call(arguments, 2)
    if (args.length === 1) {
        //只有一个元素
        props.children = children
    } else if (args.length > 1) {
        props.children = args
    }
    return {
        type,
        props
    }
}

export default {
    createElement,
    Component
}