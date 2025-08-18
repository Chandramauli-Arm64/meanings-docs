import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { Icon } from '@iconify/vue'

export default {
  extends: DefaultTheme,

  // Use the default layout directly, no override needed if no slot changes:
  Layout: DefaultTheme.Layout,

  enhanceApp({ app, router, siteData }) {
    app.component('Icon', Icon)
  }
} satisfies Theme
