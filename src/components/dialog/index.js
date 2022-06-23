import Dialog from './dialog.vue'
import Vue from 'vue'

Dialog.newInstance = (properties) => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Dialog, {
        props: props,
      })
    },
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)

  const dialog = Instance.$children[0]

  return {
    open(options) {
      dialog.open(options)
    },
  }
}

let dialogInstance

function getDialogInstance() {
  dialogInstance = dialogInstance || Dialog.newInstance()
  return dialogInstance
}

function openDialog(options) {
  let instance = getDialogInstance()
  instance.open(options)
}

export default (options) => {
  return openDialog(options)
}
