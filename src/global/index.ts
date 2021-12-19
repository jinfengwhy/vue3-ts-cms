import { App } from 'vue'
import registerElement from './element-plus'

export function globalRegister(app: App): void {
  app.use(registerElement)
}
