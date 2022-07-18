import Snackbar from './snackbar.vue'
import Vue from 'vue'

// global singleton component

Snackbar.newInstance = (properties) => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Snackbar, {
        props: props,
      })
    },
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)

  const snackbar = Instance.$children[0]

  return {
    alert(options) {
      snackbar.alert(options)
    },
  }
}

let snackbarInstance

function getSnackbarInstance() {
  snackbarInstance = snackbarInstance || Snackbar.newInstance()
  return snackbarInstance
}

function openSnackbar(options) {
  let instance = getSnackbarInstance()
  instance.alert(options)
}

export default {
  success(message) {
    return openSnackbar({ type: 'success', message })
  },
  warn(message) {
    return openSnackbar({ type: 'warning', message })
  },
  error(message) {
    return openSnackbar({ type: 'error', message })
  },
}
