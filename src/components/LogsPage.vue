
<template>
  <v-container fluid>
    <!-- Log Header -->
    <v-row justify="center">
      <v-col cols="12" md="10">
        <div v-motion-roll-top>
          <h2 class="display-2" align="center">Logs</h2>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-timeline align="center" dense>
          <v-timeline-item v-for="event in data" :key="event.EventName" :dot-color="getcolor(event)"
            v-on:click="showEventDetails(event)">
            <!-- Use v-slot with v-hover -->
            <v-hover v-slot="{ isHovering, props }" open-delay="10">
              <v-card v-if="countTrails" v-bind="props" :elevation="isHovering ? 24 : 0" v-motion-slide-visible-top>
                <v-card-title>
                  Timestamp: {{ event.EventTime }}
                </v-card-title>
                <v-card-subtitle>
                  Event Name: {{ event.sourceIpAddress }}
                </v-card-subtitle>
                <v-card-title>
                  <h2 class="text2">{{ event.EventName }}</h2>
                </v-card-title>
              </v-card>
              <v-card v-else v-bind="props" :elevation="isHovering ? 24 : 0" v-motion-slide-top>
                <v-card-title>
                  Timestamp: {{ event.EventTime }}
                </v-card-title>
                <v-card-subtitle>
                  Event Name: {{ event.sourceIpAddress }}
                </v-card-subtitle>
                <v-card-title>
                  <h2 class="text2">{{ event.EventName }}</h2>
                </v-card-title>
              </v-card>
            </v-hover>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="showDialog" max-width="600">
    <v-card :color="getcolor(selectedEvent)">
      <v-card-title>
        Event Details
      </v-card-title>
      <v-card-text>
        <p>Timestamp: {{ selectedEvent.EventTime }}</p>
        <p>Event Name: {{ selectedEvent.sourceIpAddress }}</p>
        <p>Log message: {{ selectedEvent.errorMessage }}</p>
        <!-- Add more event details as needed -->
      </v-card-text>
      <v-card-actions>
        <v-btn @click="showDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

import { } from '@/utils/regex';

export default {
  props: ['log'],
  computed: {
    ...mapMutations([
      'toggleLogin'
    ]),
    ...mapActions([
      'setEmail', 'setnormalKey', 'setsecretKey'
    ]),
    ...mapState({
      // 'stateKey' is the name of the state variable you want to access
      // 'localKey' is the name you want to use for the computed property
      // You can access it using this.localKey
      trails: 'trails'
    }),
    countTrails() {
      const eventCount = this.data.length;

      eventCount;
      return eventCount > 5;

    },
  },
  data() {
    return {
      data: this.$store.state.trails[this.log],
      showDialog: false, // Initially set to false to hide the dialog
      selectedEvent: null // Store the selected event

    };
  },
  methods: {
    getcolor(event) {
      if (event.errorMessage == 'None') {
        return '#6b49e7'
      }
      if (event.errorCode == 'AccessDenied' || event.errorCode == 'UnauthorizedOperation' || event.errorCode == 'InvalidSignatureException' || event.errorCode == 'SignatureDoesNotMatch' || event.errorCode == 'Client.UnauthorizedOperation' || event.errorCode == 'Unauthorized' || event.errorCode == 'AccessDeniedException' || event.errorCode == 'NotAuthorizedException' || event.errorCode == 'AuthorizationError' || event.errorCode == 'InvalidPermission') {
        return 'red-accent-2'
      }
    },
    showEventDetails(event) {
      this.selectedEvent = event;
      this.showDialog = true;
    }


  }

};
</script>
<style scoped>
.text2 {
  background: linear-gradient(#30137e, #6b49e7);
  /* Example gradient background */
  background-attachment: fixed;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.display-2 {
  font-size: 4rem;
  /* Adjust the size as needed */
  font-weight: bold;
  /* Makes it bolder */
  color: #FFFFFF;
  /* Assuming you want white text */
  text-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  /* Optional shadow for depth */
  margin-bottom: 1rem;
  /* Adds some space below the heading */
  /* If you have a custom font, you can add it here */
  /* font-family: 'YourCustomFont', sans-serif; */
}

/* ...other styles... */</style>