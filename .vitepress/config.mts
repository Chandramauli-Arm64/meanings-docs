import { defineConfig } from 'vitepress'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  title: "Meanings",
  description: "An Open-sourced Discord Bot Documentation built with Vitepress",
  base: "/meanings-docs/",

  markdown: {
    vue: true, // Enable vue components inside the markdown files
  },

  themeConfig: {
    siteTitle: 'Meanings Docs',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/guide/intro' },
      { text: 'Our Contributors', link: '/License-Credits/contributor' }
    ],

    editLink: {
      pattern: 'https://github.com/Chandramauli-Arm64/meanings-docs/edit/master/:path',
      text: 'Edit this page on Github'
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    sidebar: [
      {
        text: 'Guide',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/guide/intro' },
          { text: 'Installation & Setup', link: '/guide/installation' },
          { text: 'Commands Reference', link: '/guide/commands-reference' },
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'FAQ/Troubleshoot', link: '/guide/faq' }
        ]
      },
      {
        text: 'Contribution',
        collapsed: true,
        items: [
          { text: 'Development Docs (For Contributors)', link: '/devDocs/docsdev' }
        ]
      },
      {
        text: 'Credits',
        collapsed: true,
        items: [
          { text: 'Contributor Acknowledgements', link: '/License-Credits/contributor' }
        ]
      }
    ],

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xFanexx/meanings' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © xFanexx 2025'
    }
  },

  vite: {
    plugins: [
      Components({
        resolvers: IconsResolver({
          compiler: 'vue3',
          prefix: '',
        }),
      }),
      Icons({
        compiler: 'vue3'
      }),
    ]
  }
})
