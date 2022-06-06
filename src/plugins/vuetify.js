// Vuetify Documentation https://vuetifyjs.com

import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import ripple from 'vuetify/lib/directives/ripple'

Vue.use(Vuetify, { directives: { ripple } })

const theme = {
    primary: '#607d8b',
    secondary: '#2196f3',
    accent: '#03a9f4',
    error: '#f44336',
    warning: '#ffc107',
    info: '#3f51b5',
    success: '#4caf50'
}

export default new Vuetify({
    breakpoint: { mobileBreakpoint: 960 },
    icons: {
        values: { expand: 'mdi-menu-down' },
    },
    theme: {
        themes: {
            dark: theme,
            light: theme,
        },
    },
})
