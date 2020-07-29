/**
 * 给真实dom添加事件，react中的事件是合成事件，不是原生的
 * @param {*} dom 添加事件的真实dom元素
 * @param {*} type 事件的类型onclick
 * @param {*} listener 事件处理函数
 */
export function addListener(dom, eventType, listener) {
    //将事件的类型、处理函数等信息保存到dom的store属性上
    let store = dom.store || (dom.store = {})
    store[eventType] = listener
    //这里的思路是将所有的事件都绑定给document，事件代理
    document.addEventListener(eventType.slice(2), dispatchEvent, false)
}

/**
 * 合成事件的作用：
 * 1. 为了性能，快速回收event对象
 * 2. 为了兼容性，屏蔽浏览器差异
 * 3. 为了实现批量更新
 */
let syntheticEvent = {}
/**
 * 事件的处理函数
 * @param {*} event 原生的事件对象
 */
function dispatchEvent(event){
    let target = event.target
    let type = event.type
    let eventType = 'on' + type
    let listener = target.store && target.store[eventType] //事件监听函数
    if(listener){
        //处理合成事件对象
        syntheticEvent.nativeEvent = event
        for(let key in event){
            syntheticEvent[key] = event[key]
        }
        //页面中触发的点击事件的事件对象是React处理好的合成事件
        listener(syntheticEvent)
        for(let key in event){
            syntheticEvent[key] = null
        }
    }
}

