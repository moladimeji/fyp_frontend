<template>
    <v-dialog v-model="visible" max-width="500">
      <v-card>
        <v-card-title class="headline">FYI</v-card-title>
        <v-card-text>
          <p>If there is currently nothing being displayed on the page then this is because you need to start a cloudtrail on your AWS account</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: ['message'], 
    data() {
      return {
        visible: false 
      }
    }
  }
  </script>