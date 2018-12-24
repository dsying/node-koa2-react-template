import React, { Component } from 'react'

export default (loadComponent, placeHolder = '正在加载中') => {
   class AsyncComponent extends Component{
    unmount = false
    constructor () {
      super()
      
      this.state = {
        Child: null
      }
    }

    componentWillUnmount (){
      console.log('willUnmount')
      this.unmount = true
    }
    
     componentDidMount (){
       //loadComponent 传进来 的是  import('./views/home) import 其实就是promise
      console.log('didMount')
      // const { default: Child } = await loadComponent()
      let p1 = loadComponent()
      p1.then((result) => {
        const { default: Child } = result
        if (this.unmount) return

        this.setState({
          Child
        })
      })

    }

    render () {
      const { Child } = this.state
      console.log(Child)
      return (
          Child 
          ? <Child {...this.props} /> 
          : placeHolder
      )
    }
  }

  return AsyncComponent
}