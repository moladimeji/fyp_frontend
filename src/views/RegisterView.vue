<template>
    <RegisterPage />
</template>
  
<script>
import { defineComponent } from 'vue';

// Components
import RegisterPage from '../components/RegisterPage.vue';

export default defineComponent({
    name: 'RegisterView',

    components: {
        RegisterPage,
    },
});
</script>