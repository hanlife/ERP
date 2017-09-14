import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    productDetail: {
         tabs: 'first',
         record: {}
    },
    adminleftnavnum: '/Track/order',
    footShow: true,
    orderList: {
        form: {}
    },
    Authoritys: [],
    isSaveEnquirySheetDetail: false,
    user: {}
}

const mutations = {
    getProductDetailRecord (state, val) {
        state.productDetail.record = 1
    },
    setOrderListForm(state, val) {
        state.orderList.form = val
    },
    isSaveEnquirySheetDetailFun(state, obj) {
         state.isSaveEnquirySheetDetail = obj.isSave
    },
    setUserInfo(state, obj) {
        state.user = obj.user
    }
}
export default new Vuex.Store({
    state,
    mutations
})
