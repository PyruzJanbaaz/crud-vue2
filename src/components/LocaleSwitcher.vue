<template>
  <div>
    <ul>
      <li class="lang-link" :selected="isActive === 'active' && indexClicked === locale" v-for="locale in supportedLocales" :key="locale" @click="switchLocale(locale)">
        {{ $t('menu.' + locale) }}
      </li>
    </ul>
  </div>
</template>

<script>
import {Trans} from '@/plugins/Translation'

export default {
  name: 'LocaleSwitcher',
  data() {
    return {
      isActive: 'active',
      indexClicked: 'en',
    };
  },
  computed: {
    supportedLocales() {
      return Trans.supportedLocales
    },
  },
  methods: {
    switchLocale(locale) {
      if (this.$i18n.locale !== locale) {
        this.isActive = 'active';
        this.indexClicked = locale;
        this.$router.resolve({params: {locale}})
        return Trans.changeLocale(locale);
      }
    }
  }
}
</script>

