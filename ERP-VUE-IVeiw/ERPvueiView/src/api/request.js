import $http from './http.js'
// 个人信息接口
const userBase = 'cloudfactory/erp/user/'
const user = {
  // 登录
  login(data) {
    return $http.get(userBase + 'logi', data)
  },
  // 退出
  logout() {
    return $http.get(userBase + 'logout')
  },
  // 修改密码
  changePassword(data) {
    return $http.post(userBase + 'changePassword', data)
  },
  // 添加用户
  // { username: "",mobilenumber: "","technology[0]": "", "technology[1]": "" }
  adduser(data) {
    return $http.post(userBase + 'adduser', data)
  },
  // 修改用户
  // { userid:"", username: "",mobilenumber: "","technology[0]": "", "technology[1]": "" }
  edituser(data) {
    return $http.post(userBase + 'edituser', data)
  },
  // 获取用户详情
  getuserbyid(data) {
    return $http.post(userBase + 'getuserbyid', data)
  },
  // 删除用户
  // { useid:'' }
  delbyuserid(data) {
    return $http.post(userBase + 'delbyuserid', data)
  },
  // 用户列表
  // { sortBy:"userid",pageindex:1,pageSize=15,keyword="159" }
  query(data) {
    return $http.get(userBase + 'query', data)
  },
  // 权限列表
  getAuthoritys(data) {
    return $http.post(userBase + 'getAuthoritys', data)
  }
}
// 订单跟踪接口
const orderBase = 'cloudfactory/erp/order/'
const order = {
  // 获取订单列表
  getorders(data) {
    return $http.post(orderBase + 'getorders', data)
  },
  // 更新订单
  upodateorders(data) {
    return $http.post(orderBase + 'upodateorders', data)
  },
  // 订单导入
  uploadordersfile(data) {
    return $http.post(orderBase + 'uploadordersfile', data)
  },
  // 订单关闭
  updateorderforstatus(data) {
    return $http.post(orderBase + 'updateorderforstatus', data)
  },
  // 订单加急
  updateorderforurgent(data) {
    return $http.post(orderBase + 'updateorderforurgent', data)
  },
  // 工艺列表
  gettechnologys(data) {
    return $http.post(orderBase + 'gettechnologys', data)
  },
  // 已选工艺(产品进度)
  // { inorderid:'',productmodel:'',serialno:'' }
  gettechnologysbyorderid(data) {
    return $http.post(orderBase + 'gettechnologysbyorderid', data)
  },
  // 保存工艺
  updatetechnologybyorderid(data) {
    return $http.post(orderBase + 'updatetechnologybyorderid', data)
  },
  // 打印二维码
  getorderdetail(data) {
    return $http.post(orderBase + 'getorderdetail', data)
  },
  // 订单统计
  getorderstatistics(data) {
    return $http.post(orderBase + 'getorderstatistics', data)
  },
  // 用户录入数据展示接口(流程负责人列表)
  // { inorderid:'',productmodel:'',serialno:'',sequence:''}
  getusertechnologysbyorderid(data) {
    return $http.post(orderBase + 'getusertechnologysbyorderid', data)
  },
  // 更新产品详情的工艺路线接口
  // {inorderid:'',productmodel:'',productserialno:'', sequence:'',headstr:'1*25*25*15*1$',detailstr='1*30*30*gc$'}
  updatetechnologyroute(data) {
    return $http.post(orderBase + 'updatetechnologyroute', data)
  },
  // 图纸列表
  // {inorderid:'',productmodel:'',productserialno:''}
  getdrawingsheetbyorderid(data) {
    return $http.post(orderBase + 'getdrawingsheetbyorderid', data)
  },
  // 图纸删除
  // {inorderid:'',productmodel:'',productserialno:''}
  deletedrawingsheetbyorderid(data) {
    return $http.post(orderBase + 'deletedrawingsheetbyorderid', data)
  },
  // 操作记录查询
  // {inorderid:'',productmodel:'',productserialno:''}
  getoperationlog(data) {
    return $http.post(orderBase + 'getoperationlog', data)
  },
  // 图纸上传接口
  uploaddrawingsheet(data) {
    return $http.post(orderBase + 'uploaddrawingsheet', data)
  },
  // 导出Excel
  downloadorders(data) {
    return $http.post(orderBase + 'downloadorders', data)
  }
}
const TechnologyBase = 'cloudfactory/erp/Technology/'
const Technology = {
  //  获取工序
  getAllTechnology(data) {
    return $http.get(TechnologyBase + 'getAllTechnology', data)
  },
  //  添加工序
  add(data) {
    return $http.post(TechnologyBase + 'add', data)
  }
}
// 报价需求单接口
const willorderBase = 'cloudfactory/willorder/'
const willorders = {
  //  报价需求单列表接口
  getwillorders(data) {
    return $http.post(willorderBase + 'getwillorders', data)
  },
  //  报价需求单接口
  getwillorderbyid(data) {
    return $http.post(willorderBase + 'getwillorderbyid', data)
  },
  //  6.	提醒供应商报价
  remindsupplier(data) {
    return $http.post(willorderBase + 'remindsupplier', data)
  },
  // 7.	向供应商询价
  getsuppliers(data) {
    return $http.post(willorderBase + 'getsuppliers', data)
  },
  // 8.	向供应商询价-确认询价
  buildsupplierquote(data) {
    return $http.post(willorderBase + 'buildsupplierquote', data)
  },
  // 9.	采用最优报价
  usebestsupplierquote(data) {
    return $http.post(willorderBase + 'usebestsupplierquote', data)
  },
  // 10.	采用最近报价
  uselastsupplierquote(data) {
    return $http.post(willorderBase + 'uselastsupplierquote', data)
  },
  // 11.	采用最低报价
  useminsupplierquote(data) {
    return $http.post(willorderBase + 'useminsupplierquote', data)
  },
  // 12.	导出
  downloadorder(data) {
    return $http.post(willorderBase + 'downloadorder', data)
  },
  // 13.	导入
  uploadorder(data) {
    return $http.post(willorderBase + 'uploadorder', data)
  },
  // 14.	下载图纸
  downloadattachment(data) {
    return $http.post(willorderBase + 'downloadattachment', data)
  },
  // 15.	保存
  updatewillorder(data) {
    return $http.post(willorderBase + 'updatewillorder', data)
  },
  // 16.	保存明细
  updateorderdetail(data) {
    return $http.post(willorderBase + 'updateorderdetail', data)
  },
  // 17.	确认建议售价
  confirmwillorder(data) {
    return $http.post(willorderBase + 'confirmwillorder', data)
  },
  // 18.	采用供应商报价
  usesupplierquote(data) {
    return $http.post(willorderBase + 'usesupplierquote', data)
  }
}
// 供应商报价接口    询价单相关接口
const inquiryorderBase = 'cloudfactory/inquiryorder/'
const inquiryorder = {
  //  查看历史报价
  getinquiryordershistory(data) {
    return $http.post(inquiryorderBase + 'getinquiryordershistory', data)
  },
  // 4.	供应商报价
  getordersbywillorderid(data) {
    return $http.post(inquiryorderBase + 'getordersbywillorderid', data)
  },
  // 5.	供应商报价标记已读:
  markReadByWillOrderId(data) {
    return $http.post(inquiryorderBase + 'markReadByWillOrderId', data)
  },
  // 询价单列表
  getinquiryorders(data) {
    return $http.post(inquiryorderBase + 'getinquiryorders', data)
  },
  // 询价单详情
  getinquiryorderbyid(data) {
    return $http.post(inquiryorderBase + 'getinquiryorderbyid', data)
  },
  // 询价单详情 更新
  updateinquiryorder(data) {
    return $http.postB(inquiryorderBase + 'updateinquiryorder', data)
  },
  // 询价单详情 报价
  confirmwillorder(data) {
    return $http.post(inquiryorderBase + 'quoteinquiryorder', data)
  },
  // 下载图纸
  downloadattachment(data) {
    return $http.post(inquiryorderBase + 'downloadattachment', data)
  },
  // 标记询价单
  markbyid(data) {
    return $http.post(inquiryorderBase + 'markbyid', data)
  },
  // 取消询价单标记
  unmarkbyid(data) {
    return $http.post(inquiryorderBase + 'unmarkbyid', data)
  },
  // 导出询价单详情列表
  downloadorder(data) {
    return $http.post(inquiryorderBase + 'downloadorder', data)
  },
  // 19.	新增供应商报价
  newsupplierquote(data) {
    return $http.post(inquiryorderBase + 'newsupplierquote', data)
  },
  // 20.	新增供应商报价-导出
  downloadorderbywillorderid(data) {
    return $http.post(inquiryorderBase + 'downloadorderbywillorderid', data)
  },
  // 21.	新增供应商报价-导入
  uploadorderbywillorderid(data) {
    return $http.post(inquiryorderBase + 'uploadorderbywillorderid', data)
  },
  // 22.	新增供应商报价-报价
  addsupplierquote(data) {
    return $http.post(inquiryorderBase + 'addsupplierquote', data)
  }
}

// 客户
const customerBase = 'cloudfactory/customer/'
const customer = {
  // 获取用户列表
  getCustomerList(data) {
    return $http.get(customerBase + 'getCustomerList', data)
  },
  // 客户名称模糊查询10条用户信息
  getCustomerByName(data) {
    return $http.get(customerBase + 'getCustomerByName', data)
  },
  // 客户行业
  getAllCusttrades(data) {
    return $http.get('cloudfactory/custtrades/getAllCusttrades', data)
  },
  // 获取客户详情
  getCustomerById(data) {
    return $http.get(customerBase + 'getCustomerById', data)
  },
  // 保存行业信息 { custid: number custtradesid：String, mainproduct: String, contacttarget: String, competitor: String }
  saveCustomer(data) {
    return $http.post(customerBase + 'saveCustomer', data)
  }
}

// 供应商列表
const supplierBase = 'cloudfactory/supplier/'
const supplier = {
  // 获取供应商列表
  getsupplierlist(data) {
    return $http.get(supplierBase + 'getsupplierlist', data)
  },
  // 供应商详情
  getSupplierDeital(data) {
    return $http.get(supplierBase + 'getSupplierDeital', data)
  },
  // 公司类别   公司性质   公司规模
  getDictByTypeNumber(data) {
    return $http.get(supplierBase + 'getDictByTypeNumber', data)
  },
  getDictByTypeNumbers(data) {
    return $http.get('/cloudfactory/codedict/getDictByTypeNumbers', data)
  },
  // 品牌列表
  getbrandslist(data) {
    return $http.get('/cloudfactory/productbrands/getbrandslist', data)
  },
  // 主营产品分类
  productcatalog(data) {
    return $http.get('/cloudfactory/productcatalog/getTree', data)
  },
  // 供应商主营行业
  suppliertrades(data) {
    return $http.get('/cloudfactory/suppliertrades/getTree', data)
  },
  // 保存供应商商务信息
  supplierbusiness(data) {
    return $http.get('/cloudfactory/supplierbusiness/save', data)
  },
  // 23.	供应商列表
  getsuppliers(data) {
    return $http.post(supplierBase + 'getsuppliers', data)
  }
}

const equipmentBase = 'cloudfactory/supplierdevice/'
const equipment = {
  // 设备清单、设备管理列表
  supplierdeviceList(data) {
    return $http.post(equipmentBase + 'supplierdeviceList', data)
  },
  // 获取选项列表
  addSupplierdevice(data) {
    return $http.post(equipmentBase + 'addSupplierdevice', data)
  },
  // 设备保存
  saveSupplierdevice(data) {
    return $http.post(equipmentBase + 'saveSupplierdevice', data)
  },
  // 删除设备 新增设备
  delSupplierdevice(data) {
    return $http.post(equipmentBase + 'delSupplierdevice', data)
  },
  // 设备导出
  excelExp(data) {
    return $http.post(equipmentBase + 'excelExp', data)
  },
  // 设备导入
  excelImp(data) {
    return $http.post(equipmentBase + 'excelExp', data)
  }
}

export default {
  // 用户模块
  user,

  // 订单模块
  order,

  // 工序模块
  Technology,

  // 报价需求单
  willorders,

  // 供应商报价 询价单相关接口
  inquiryorder,

  // 客户
  customer,

  // 供应商列表
  supplier,

  // 设备模块
  equipment
}
