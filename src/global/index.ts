import { App } from 'vue'
import registerElement from './element-plus'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
}
