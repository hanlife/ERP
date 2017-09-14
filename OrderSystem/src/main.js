// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import axios from 'axios'
import './common/style/detailpage.styl'
import 'element-ui/lib/theme-default/index.css'
import './common/style/reset.css'
import './common/style/public.css'
import routes from './router/routes.js'
import Vuex from 'vuex'
import store from './vuex/store.js'
import api from './api/request.js'
import $util from './common/js/util.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$util = $util
Vue.config.productionTip = false

/* eslint-disable no-new */

let router = new VueRouter({
  mode: 'history',
  routes
})

let vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

vue.$mount('#app')

function getTreeCheckedArray(arr, Url, cb) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].menupath == Url && arr[i].checked == false) {
      cb()
      return
    }
    if (Object.prototype.toString.call(arr[i].children) === '[object Array]') {
      getTreeCheckedArray(arr[i].children)
    }
  }
}

// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem('token')
//   if (to.meta.authoritys) {
//     let authorityList = vue.$store.state.Authoritys
//     let Url = to.path
//     // for (var i = 0; i < authorityList.length; i++) {
//     //   if (authorityList[i].menupath == Url && authorityList[i].checked == false) {
//     //     next({ path: '/' })
//     //   }
//     //   if (Object.prototype.toString.call(authorityList[i].children) === '[object Array]') {
//     //     getTreeCheckedArray(authorityList[i].children)
//     //   }
//     // }
//     getTreeCheckedArray(authorityList, Url, function() { next({ path: '/' }) })
//   }
//   if (token && to.path === '/') {
//     next(false)
//   } else {
//     console.log(111)
//     if (!token && to.path !== '/') {
//       console.log(to.path)
//       next({
//         path: '/'
//       })
//     } else {
//       // 对询价单修改为保存处理
//       if (store.state.isSaveEnquirySheetDetail) {
//         vue.$confirm('你的修改未保存, 是否继续?', '提示', {
//           confirmButtonText: '继续',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           next()
//           store.commit('isSaveEnquirySheetDetailFun', { isSave: false })
//         }).catch(() => {
//           store.state.adminleftnavnum = '/EnquirySheet/enquirySheet'
//           next(false)
//         })
//         return
//       }
//       next()
//     }
//   }
// })

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  if (token) { // 有token
    if (to.path === '/') { next(false); return }
    if (to.meta.authoritys) { // 判断该页面是不是有权限判断
      let authorityList = store.state.Authoritys
      let Url = to.path
      if (authorityList.length) {
        getTreeCheckedArray(authorityList, Url, function () { next({ path: '/' }) })

        //  对询价单修改为保存处理
        if (store.state.isSaveEnquirySheetDetail) {
          vue.$confirm('你的修改未保存, 是否继续?', '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            next()
            store.commit('isSaveEnquirySheetDetailFun', { isSave: false })
          }).catch(() => {
            store.state.adminleftnavnum = '/EnquirySheet/enquirySheet'
            next(false)
          })
          return
        }
        next()
        return
      } else {
        next(false)
      }
      return
    }
    next()
  } else { // 没有token
    if (to.path !== '/' && to.path !== '/admin') {
      next({ path: '/' })
    } else {
      next()
    }
  }
})