<template>
  <LogininPage />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import LogininPage from '../components/LogininPage.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    LogininPage,
  },
});
</script>
