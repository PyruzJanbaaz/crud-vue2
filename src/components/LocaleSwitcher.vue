<template>
  <div>
    <ul class="flags">
      <li class="lang-link" v-for="locale in supportedLocales" :key="locale" @click="switchLocale(locale)">
        <img :src="require(`@/assets/images/${locale}.png`)">
      </li>
    </ul>
  </div>
</template>

<script>
import {Trans} from '@/plugins/Translation'

export default {
  name: 'LocaleSwitcher',
  computed: {
    supportedLocales() {
      return Trans.supportedLocales
    },
  },
  methods: {
    switchLocale(locale) {
      if (this.$i18n.locale !== locale) {
        const to = this.$router.resolve({params: {locale}})
        return Trans.changeLocale(locale).then(() => {
          this.$router.push(to.location)
        })
      }
    }
  }
}
</script>

