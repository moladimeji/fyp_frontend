<template>
    <LogsPage :log=this.$store.state.logs />
</template>
  
<script>
import { defineComponent } from 'vue';

// Components
import LogsPage from '@/components/LogsPage.vue';

export default defineComponent({
    name: 'LogsView',

    props: {
        log: String
    },

    components: {
    LogsPage
},
});
</script>