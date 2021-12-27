let BASE_URL = ''
let BASE_NAME = ''
const TIME_OUT = 10000

// process.env.NODE_ENV的值通过webpack内置插件definePlugin自动注入
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000'
  BASE_NAME = 'why'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://www.why.org/prod'
  BASE_NAME = 'jfw'
} else {
  BASE_URL = 'http://www.why.org/test'
  BASE_NAME = 'test'
}

export { BASE_URL, BASE_NAME, TIME_OUT }
