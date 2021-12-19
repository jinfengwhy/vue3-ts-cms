import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'

const components = [ElButton, ElInput, ElForm, ElFormItem]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
