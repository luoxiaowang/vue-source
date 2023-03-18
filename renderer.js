function createRenderer() {
  function mountElement(vnode, container) {

  }
  function patch(n1, n2, container) {
    // 
  }
  function render(vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        container.innerHTML = ''
      }
    }
     container._vnode = vnode
  }

  return {
    render,
  }
}

const vnode = {
  type: 'h1',
  children: 'hello',
}
// 创建一个渲染器
const renderer = createRenderer()
renderer.render(vnode, document.querySelector('#app'))