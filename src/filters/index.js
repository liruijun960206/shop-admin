import dataForMat from './data-format'

export default {
  install (Vue, options) {
    Vue.filter('dataForMat', dataForMat)
  }
}
