import Overlay from './overlay.vue'
import Vue from 'vue'

Overlay.newInstance = (properties) => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Overlay, {
        props: props,
      })
    },
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)

  const overlay = Instance.$children[0]

  return {
    open(options) {
      overlay.open(options)
    },
    close() {
      overlay.close()
    }
  }
}

let overlayInstance

function getOverlayInstance() {
  overlayInstance = overlayInstance || Overlay.newInstance()
  return overlayInstance
}

function openOverlay(options) {
  let instance = getOverlayInstance()
  instance.open(options)
}

function closeOverlay() {
  let instance = getOverlayInstance()
  instance.close()
}

export default  {
  open(options) {
    return openOverlay(options)
  },
  close() {
    return closeOverlay()
  },
}
