function createRenderer(options) {
  const {
    createElement,
    setElementText,
    insert,
  } = options

  function mountElement(vnode, container) {
    const el = createElement(vnode.type)
    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    }
    insert(el, container)
  }
  function patch(n1, n2, container) {
    // 如果n1不存在，则意味着是挂载
    if (!n1) {
      mountElement(n2, container)
    } else {
      // patch
    }
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
const renderer = createRenderer({
  createElement(tag) {
    return document.createElement(tag)
  },
  setElementText(el, text) {
    el.textContent = text
  },
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor)
  },
})
renderer.render(vnode, document.querySelector('#app'))