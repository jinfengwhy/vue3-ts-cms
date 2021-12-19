import axios from 'axios'

// axios实例对象
// 1.模拟get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log('---get default:', res.data)
})

// 2.get请求，并传入参数（get请求通过params传参）
axios
  .get('https://httpbin.org/get', {
    params: {
      name: 'jfw',
      age: 27,
      height: 180
    }
  })
  .then((res) => {
    console.log(`---get param: `, res)
  })

// 3.post请求，并传入参数（post请求通过data传参）
axios
  .post('https://httpbin.org/post', {
    data: {
      name: '南师',
      age: 100
    }
  })
  .then((res) => {
    console.log(`---post param: `, res)
  })

// 额外补充，Promise中类型的使用
new Promise<string>((resovle) => {
  resovle('abc')
}).then((res) => {
  console.log(`---promise: `, res)
})

// 4.axios的配置选项
// 4.1.全局的配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000 // 毫秒
axios
  .post('post', {
    data: {
      name: '孔子',
      age: '2000'
    }
  })
  .then((res) => {
    console.log(`---post baseUrl: `, res)
  })
// 4.2.每一个请求单独配置
axios
  .post('post', {
    data: {
      name: '子贡',
      age: 1960
    },
    timeout: 1000
  })
  .then((res) => {
    console.log(`---post timeout: `, res)
  })

// 5.axios.all
axios
  .all([
    axios.get('/get', { params: { name: 'jfw', age: 27 } }),
    axios.get('/get', { params: { name: 'jfw', age: 30 } })
  ])
  .then((res) => {
    console.log(`---axios.all: `, res[0], res[1])
  })

// 6.axios的拦截器
// 6.1.请求拦截器
axios.interceptors.request.use(
  (config) => {
    console.log(`---请求被拦截了：`, config)
    return config
  },
  (err) => {
    console.log(`---请求发送失败`)
    return err
  }
)
// 6.2.响应拦截器
axios.interceptors.response.use(
  (data) => {
    console.log(`---响应被拦截了`, data)
    return data
  },
  (err) => {
    console.log(`---服务器响应失败`)
    return err
  }
)
// 只有位于拦截器定义之后的请求才会被拦截
axios.get('http://httpbin.org/get')
