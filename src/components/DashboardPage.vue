<template>
  <v-container>
    <button @click="showInfoPopup">
      <v-icon size="x-large">mdi-information</v-icon>
    </button>
    <v-row>
      <v-col v-for="(value, key) in this.$store.state.trails" :key="key" cols="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card rounded="rounded-lg" v-bind="props" :elevation="isHovering ? 12 : 2" class="mx-auto my-3" @click="getRes(key)">
            <v-container>
              <v-row>
                <v-col>
                  <v-card-title class="headline text-center">{{ key }}</v-card-title>
                  <v-icon size="x-large" class="mx-auto">mdi-account</v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="2" class="text-center">
        <v-btn block rounded="xl" size="x-large" class="analysis" @click="goToAnalysis">Analysis</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <InfoPopup :message="popupContent" v-model="isPopupVisible" />
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import InfoPopup from './ui/InfoPopup.vue';
import { } from '@/utils/regex';

export default {
  components: {
    InfoPopup 
  },
  computed: {
    ...mapMutations([
      'toggleLogin'
    ]),
    ...mapActions([
      'setEmail', 'setnormalKey', 'setsecretKey', 'setLogs'
    ]),
    ...mapState({
      // 'stateKey' is the name of the state variable you want to access
      // 'localKey' is the name you want to use for the computed property
      // You can access it using this.localKey
      trails: 'trails'
    }),
  },
  data() {
    return {
      respo: {},
      popupContent: 'If there is currently nothing being displayed on the page then this is because you need to start a cloudtrail on your AWS account', 
      isPopupVisible: false
    };
  },
  methods: {
    showInfoPopup() {
      this.isPopupVisible = true;
    },

    getRes(key) {
      this.$store.dispatch('setLogs', key)
      this.$router.push('/logs')
    },
    goToAnalysis() {
      // Add any logic or data changes needed for the analysis page
      this.$router.push('/analysis');
    },


    goRegister() {
      this.$router.push('/register')
    },
  },
};
</script>

<style scoped>

.analysis {
  background-color: transparent; /* Set to the color of the button in the image */
  color: #40E0D0; /* Set to the text color used in the button */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* Optional: adds a subtle shadow */
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out; /* Smooth transition for shadow and transform */
  font-weight: 500; /* Adjust font-weight as necessary */
  border: 4px solid #40E0D0;
}

.analysis:hover {
  background-color: #eeeeee; /* Slightly darker color on hover */
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3); /* Optional: deeper shadow on hover */
  transform: translateY(-2px); /* Optional: slight raise effect on hover */
}

/* Adjust button text size if needed */
.analysis .v-btn__content {
  font-size: 1rem; /* Adjust the font size as necessary */
}
.headline {
  font-weight: bold;
  color: #123456; /* Replace with your primary color */
}
.v-btn {
  font-size: 1.0em;
  padding: 1px 2px;
}

</style>