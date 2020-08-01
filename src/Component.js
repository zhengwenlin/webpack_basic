
import { isFunction } from './utils'
import { createDOM } from './react-dom'
//这个对象作用是处理批量更新
export const updateQueue = {
    isBatchingUpdate: false, //是否处于批量更新模式
    //存放所有要更新的updater的实例
    updaters: [],
    //
    add(updater){
        if(!this.updaters.includes(updater)){
            this.updaters.push(updater)
        }
    },
    //批量更新，在合适的时候（比如事件处理函数执行完成后），调用该方法，批量更新组件
    batchUpdate(){
        this.isBatchingUpdate = true
        this.updaters.forEach(updater => updater.updateComponent())
        //更新成功后，重置参数
        this.updaters.length = 0//重置数组最好的方法就是将长度值为零
        this.isBatchingUpdate = false
    }
}

class Updater {
    constructor(classInstance){
        //参数接受类组件的实例
        this.classInstance = classInstance

        this.pendingStates = [] // 等待更新的状态
    }
    /**
     * 添加分状态的方法
     * @param {*} partialState 分状态（对象或者是函数）
     */
    addSatate(partialState){
        this.pendingStates.push(partialState)
        //根据当前的更新模式，决定是批量更新还是直接更新

        if(updateQueue.isBatchingUpdate){
            updateQueue.add(this)
        }else{
            //否则就是同步更新，直接更新组件
            this.updateComponent()
        }
    }
    /**
     * 更新组件的思路： 获取到新的状态，赋值给组件的state，然后调用组件的render方法重新渲染
     */
    updateComponent(){
        if(this.pendingStates.length > 0) {
            this.classInstance.state = this.getState()
            this.classInstance.forceUpdate()
        }
    }
    //获取新的状态
    getState(){
        //函数的实例，等待更新的状态
        let { classInstance, pendingStates } = this
        //类实例老的状态
        let { state } = classInstance
        
        //本质上就是一个状态的合并操作
        let nextState = pendingStates.reduce((nextState, partialState) => {
            if(isFunction(partialState)){
                nextState =  partialState(nextState)
            }else{
                nextState = {...nextState, ...partialState}
            }
            return nextState
        }, state)

        pendingStates.length = 0
        return nextState
    }
}

/**
 * Component组件类
 * - 每个组件都有一个updater更新器，是Updater的实例，用于组件的更新
 */
class Component {
    constructor(props){
        this.props = props //组件的属性
        this.state = {} //组件的状态

        this.$updater = new Updater(this)
    }


    /**
     * setState方法，调用该方法表示组件要更新
     * @param {*} partialState 分状态（对象或者函数）
     */
    setState(partialState){
        this.$updater.addSatate(partialState)
    }

    /**
     * 强制更新组件思路：
     * 1. 调用组件的render方法，可以获取到该组件返回的最新的虚拟DOM
     * 2. 调用createDOM，可以将虚拟DOM转换成真实的DOM，
     * 3. 重新插入到页面中指定的位置（原来DOM的父节点中）
     */
    forceUpdate(){
        let newVdom = this.render()
        let oldDOM = this.dom //老的真实的dom
        let newDOM = createDOM(newVdom)

        //将新的DOM插入到指定的位置
        oldDOM.parentNode.replaceChild(newDOM, oldDOM)
        //这里更新完心的dom后，一定要将该实例对应的真实dom属性也进行更新，否则下次更新就会出错
        this.dom = newDOM
    }
}
//表示为一个类组件
Component.prototype.isReactComponent = {}
export default Component