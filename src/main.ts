import { createApp } from 'vue'
import App from './App.vue'
import initializeRouter from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { customTheme } from './config/vuetify.config'

const app = createApp(App)

initializeRouter()
  .then((router) => {
    const vuetify = createVuetify({
      components,
      directives,
      theme: {
        defaultTheme: 'customTheme',
        themes: {
          customTheme
        }
      }
    })

    app.use(router)
    app.use(vuetify)
    app.mount('#app')
  })
  .catch((error) => {
    console.error('Erro ao inicializar o roteador:', error)
  })
