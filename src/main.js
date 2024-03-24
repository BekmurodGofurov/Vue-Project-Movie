import { createApp } from 'vue'
import App from '@/components/app/App.vue'
import components from './components'
import uiComponents from './ui-components'
import './index.css'

const app = createApp(App)

components.map(component => {
  app.component(component.name, component)
})

uiComponents.map(component => {
  app.component(component.name, component)
})
app.mount('#app')
