<template>
    <AnalysisPage />
</template>
  
<script>
import { defineComponent } from 'vue';

// Components

import AnalysisPage from '@/components/AnalysisPage.vue';

export default defineComponent({
    name: 'AnalysisView',

    components: {
    AnalysisPage
},
});
</script>