import { Message } from 'element-ui'

var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd'
function padding(s, len) {
    var lens = len - (s + '').length
    for (var i = 0; i < lens; i++) { s = '0' + s }
    return s
};

export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        var context = ''
        if (r != null) {
            context = r[2]
        }
        reg = null
        r = null
        return context == null || context === '' || context === 'undefined' ? '' : context
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length)
                    case 'M': return padding(date.getMonth() + 1, $0.length)
                    case 'd': return padding(date.getDate(), $0.length)
                    case 'w': return date.getDay() + 1
                    case 'h': return padding(date.getHours(), $0.length)
                    case 'm': return padding(date.getMinutes(), $0.length)
                    case 's': return padding(date.getSeconds(), $0.length)
                }
            })
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP)
            var matchs2 = dateString.match(/(\d)+/g)
            if (matchs1.length === matchs2.length) {
                var _date = new Date(1970, 0, 1)
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i])
                    var sign = matchs1[i]
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break
                        case 'M': _date.setMonth(_int - 1); break
                        case 'd': _date.setDate(_int); break
                        case 'h': _date.setHours(_int); break
                        case 'm': _date.setMinutes(_int); break
                        case 's': _date.setSeconds(_int); break
                    }
                }
                return _date
            }
            return null
        },

        getDate: function (time) {
            let date = new Date(time)
            return this.format(date, 'yyyy-MM-dd hh:mm')
        }
    },

    GetDateDiff: function (startDate, endDate) {
        var startTime = new Date(Date.parse(startDate.replace(/-/g, '/'))).getTime()
        var endTime = new Date(Date.parse(endDate.replace(/-/g, '/'))).getTime()
        var dates = parseInt((endTime - startTime)) / (1000 * 60 * 60 * 24)
        return dates
    },

    swapItems: function (arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0]
        return arr
    },
    checkMoblie(rule, value, callback) {
        value = parseInt(value)
        if (!value) {
            return callback(new Error('手机号不能为空'))
        }
        setTimeout(() => {
            if (!(/^1[34578]\d{9}$/.test(value)) || !Number.isInteger(value)) {
                callback(new Error('手机号有误，请重填'))
            } else {
                callback()
            }
        }, 500)
    },
    // "yyyy-MM-dd HH:mm:ss"
    DateFormat(date, fmt) {
        date = new Date(date)
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        return fmt
    },
    ShowBeforeDate(Arr) {
        let DataArray = this.isArray(Arr)
        if (DataArray.length) {
            let NowData = new Date().getTime()
            let FullYear = new Date().getFullYear()
            let NowDayTime = new Date(new Date().toLocaleDateString()).getTime()
            let NowYear = new Date(FullYear + '/1/1').getTime()
            for (let i = 0; i < DataArray.length; i++) {
                // X<1小时 N分钟前，如“45分钟前”
                // 1小时≤X，当天  显示发布时与分，如“14:59”
                // X的年份=当年 月+日+时间展示，如“04-27    14:59”
                // X的年份≠当年 日期+时间展示，如“2016-05-01 14:59”
                if (NowData - DataArray[i].creattime <= 60 * 60 * 1000) { DataArray[i].creattime = parseInt((NowData - DataArray[i].creattime) / 1000 / 60) + '分钟前'; continue }
                if ((DataArray[i].creattime - NowDayTime >= 0) && (DataArray[i].creattime - NowDayTime) <= 24 * 60 * 60 * 1000) { DataArray[i].creattime = this.DateFormat(DataArray[i].creattime, 'hh:mm'); continue }
                if (DataArray[i].creattime - NowYear <= 365 * 24 * 60 * 60 * 1000) { DataArray[i].creattime = this.DateFormat(DataArray[i].creattime, 'MM-dd hh:mm'); continue }
                DataArray[i].creattime = this.DateFormat(DataArray[i].creattime, 'yyyy/MM/dd hh:mm:ss')
            }
        }
        return Arr
    },
    outputdollars(number) {
        if (number.length <= 3) {
            return (number === '' ? '0' : number)
        } else {
            var mod = number.length % 3
            var output = (mod === 0 ? '' : (number.substring(0, mod)))
            for (var i = 0; i < Math.floor(number.length / 3); i++) {
                if ((mod === 0) && (i === 0)) {
                    output += number.substring(mod + 3 * i, mod + 3 * i + 3)
                } else {
                    output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3)
                }
            }
            return (output)
        }
    },
    checkDateFormat(val) {
        if (val === '') {
            return true
        }
        let str = /^(\d{4})-(0[1-9]|1[0-2])-([0-2][1-9]|[1-3]0|31)$/
        return str.test(val)
    },
    checkDateDaterange(val) {
        if (val === '') {
            return true
        }
        let str = /^(\d{4})-(0[1-9]|1[0-2])-([0-2][1-9]|[1-3]0|31)( - )(\d{4})-(0[1-9]|1[0-2])-([0-2][1-9]|[1-3]0|31)$/
        return str.test(val)
    },
    // 数组去重
    arrayToHeavy(arr) {
        var res = []
        var json = {}
        for (var i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
                res.push(arr[i])
                json[arr[i]] = 1
            }
        }
        return res
    },
    // 检测数据类型
    isArray(val) {
        return Object.prototype.toString.call(val) === '[object Array]' ? val : []
    },
    isObject(val) {
        return Object.prototype.toString.call(val) === '[object Object]' ? val : {}
    },
    isNumber(val) {
        return Object.prototype.toString.call(val) === '[object Number]' ? val : 0
    },
    isString(val) {
        return Object.prototype.toString.call(val) === '[object String]' ? val : ''
    },
    getCookie(name) {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(name + '=')
            if (start != -1) {
                start = start + name.length + 1
                let end = document.cookie.indexOf(';', start)
                if (end == -1) end = document.cookie.length
                return unescape(document.cookie.substring(start, end))
            }
        }
        return ''
    },
    forbiddenScroll(bool) {
        let s = bool ? 'hidden' : 'auto'
        let body = document.querySelectorAll('body')[0]
        body.style.overflowY = s
        body.style.paddingRight = bool ? '17px' : '0'
    },
    startDrop(obj, target) {
        obj.onmousedown = function (event) {   // 按下鼠标
            event = event || window.event
            let pagey = event.pageY || event.clientY + document.documentElement.scrollTop
            let pagex = event.pageX || event.clientX + document.documentElement.scrollLeft
            let x = pagex - target.offsetLeft  // 鼠标在盒子的距离
            let y = pagey - target.offsetTop

            document.onmousemove = function (event) {   // 移动鼠标
                event = event || window.event
                let pageym = event.pageY || event.clientY + document.documentElement.scrollTop
                let pagexm = event.pageX || event.clientX + document.documentElement.scrollLeft
                let xx = pagexm - x  // 每次移动减去  鼠标到盒子的距离
                let yy = pageym - y

                // if (xx <= 0) { xx = 0 }
                // if (yy <= 0) { yy = 0 }

                // if (xx >= (window.innerWidth - target.offsetWidth)) { xx = window.innerWidth - target.offsetWidth }
                // if (yy >= (window.innerHeight - target.offsetHeight)) { yy = window.innerHeight - target.offsetHeight }

                target.style.left = xx + 'px'
                target.style.top = yy + 'px'
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
            }
        }
        document.onmouseup = function (event) {
            document.onmousemove = null
            event = event || window.event
        }
    },
    isError(response) {
        Message.closeAll()
        if (!response) { return }
        if (response.code === 'URC0001') { // 未登录
            Message.error('未登录')
            return
        }
        if (response.code === 'URC0002') { // 用户名或手机号不存在
            Message.error('用户名或手机号不存在')
            return
        }
        if (response.code === 'URC0003') { // 该用户以禁用
            Message.error('该用户以禁用')
            return
        }
        if (response.code === 'URC0005') { // 旧密码错误
            Message.error('旧密码错误')
            return
        }
        if (response.code === 'URC0007') { // 用户名不能为空
            Message.error('用户名不能为空')
            return
        }
        if (response.code === 'URC0008') { // 手机号码为空
            Message.error('手机号码为空')
            return
        }
        if (response.code === 'URC0009') { // 用户已存在
            Message.error('用户已存在')
            return
        }
        if (response.code === 'URC0010') { // 手机号码已存在
            Message.error('手机号码已存在')
            return
        }
        if (response.code === 'URC0011') {
            Message.error('密码错误')
            return
        }
        if (response.code === 'URC0012') { // 用户不存在
            Message.error('用户不存在')
            return
        }
        if (response.code === 'URC0013') { // 手机号码已存在
            Message.error('工厂已禁用')
            return
        }

        if (response.data) {
            Message.error(response.data)
        } else if (response.message) {
            Message.error(response.message)
        } else if (response.msg) {
            Message.error(response.msg)
        } else {
            Message.error('服务端错误')
        }
    },
    Ajax: function (options) {
        options = options || {}
        options.type = (options.type || 'GET').toUpperCase()
        options.dataType = options.dataType || 'json'
        // 创建 - 非IE6 - 第一步
        // if (window.XMLHttpRequest) {
        //     var xhr = new XMLHttpRequest()
        // } else { // IE6及其以下版本浏览器
        //     var xhr = new ActiveXObject('Microsoft.XMLHTTP')
        // }
        var xhr = new XMLHttpRequest()
        // 接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML)
                } else {
                    options.fail && options.fail(status)
                }
            }
        }
        // 连接 和 发送 - 第二步
        if (options.type == 'GET') {
            var params = this.formatParams(options.data)
            xhr.open('GET', options.url + '?' + params, true)
            if (sessionStorage.getItem('token') !== undefined) { // 判断是否存在token，如果存在的话，则每个http header都加上token
                let sessidId = sessionStorage.getItem('token')
                xhr.setRequestHeader('sessid_id', sessidId)
            }
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.send(null)
        } else if (options.type == 'POST') {
            xhr.open('POST', options.url, true)
            // 设置表单提交时的内容类型
            xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            if (sessionStorage.getItem('token') !== undefined) { // 判断是否存在token，如果存在的话，则每个http header都加上token
                let sessidId = sessionStorage.getItem('token')
                xhr.setRequestHeader('sessid_id', sessidId)
            }
            let parms = JSON.stringify(options.data)
            xhr.send(parms)
        }
    },
    // 格式化参数
    formatParams: function (data) {
        var arr = []
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
        }
        return arr.join('&')
    },
    stopBubble(event) {
        if (event && event.stopPropagation) {
            event.stopPropagation()
        } else if (window.event) {
            window.event.cancelBubble = true
        }
    }
}
