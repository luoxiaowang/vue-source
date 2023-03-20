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
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => {
        patch(null, child, el)
      })
    }

    // 如果存在props时的处理
    if (vnode.props) {
      for(const key in vnode.props) {
        // 无论是使用 setAttribute 函数，还是直接设置元素的 DOM Properties，都存在缺陷，我们只能做特殊处理
        // 即优先设置元素的 DOM Properties，但当值为空字符串时，要手动将值矫正为 true
        // key是否存在对应的DOM Properties
        if (key in el) {
          const type = typeof el[key]
          const value = vnode.props[key]

          // 这种情况特殊处理，例如模板中的disabled属性设置
          if (type === 'boolean' && value === '') {
            el[key] = true
          } else {
            el[key] = value
          }
        } else {
          // setAttribute设置的值总是会被字符串化
          el.setAttribute(key, vnode.props[key])
        }
      }
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
  type: 'div',
  props: {
    id: 'foo',
  },
  children: [
    {
      type: 'p',
      children: 'hello',
    }
  ],
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