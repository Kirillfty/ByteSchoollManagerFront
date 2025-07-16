// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwind from '@tailwindcss/vite'
import { addComponentsDir } from 'nuxt/kit'

export default defineNuxtConfig({
  css:['~/assets/css/tailwind.css'],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  vite:{
    plugins:[tailwind()]
  },

  modules: ['shadcn-nuxt'],
  shadcn:{
    prefix:'',
   

    
  }
})