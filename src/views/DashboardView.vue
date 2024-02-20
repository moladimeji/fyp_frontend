<template>
    <DashboardPage />
</template>
  
<script>
import { defineComponent } from 'vue';

// Components
import DashboardPage from '@/components/DashboardPage.vue';

export default defineComponent({
    name: 'HomeView',

    components: {
    DashboardPage
},
});
</script>