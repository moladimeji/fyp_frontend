<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="3">
          <v-card-title class="primary">
            <h2>Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" label="Email" :rules="rules.required" outlined required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" :rules="rules.required" outlined
                required></v-text-field>
              <v-btn color="primary" type="submit">Login</v-btn>
            </v-form>
            <p1 @click="goRegister">Register Here</p1>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState, mapActions } from 'vuex'
import { } from '@/utils/regex';

export default {
  computed: {
    ...mapMutations([
      'toggleLogin'
    ]),
    ...mapActions([
      'setEmail', 'setnormalKey', 'setsecretKey', 'setTrails'
    ]),
    ...mapState({
      // 'stateKey' is the name of the state variable you want to access
      // 'localKey' is the name you want to use for the computed property
      // You can access it using this.localKey
      secretKey: 'secretKey',
      trails: 'trails'
    }),
  },
  data() {
    return {
      email: "",
      password: "",
      rules: {
        required: [(v) => !!v || 'Field is required.'],
      },
    };
  },
  methods: {
    async login() {
      const formData = new FormData();
      formData.append('grant_type', 'password');
      formData.append('username', this.email);
      formData.append('password', this.password);
      formData.append('scope', ''); // Send an empty value or adjust as needed
      formData.append('client_id', ''); // Send an empty value or adjust as needed
      formData.append('client_secret', '');

      await axios.post('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },

      }).then((response) => {
        console.log('Are we even here');
        this.toggleLogin
        axios.post(`/users/me`, null, {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((userResponse) => {
            this.$store.dispatch('setEmail', userResponse.data.email);
            this.$store.dispatch('setsecretKey', userResponse.data.secretKey);
            this.$store.dispatch('setnormalKey', userResponse.data.normalKey);
            this.$store.dispatch('setRegion', userResponse.data.region);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            this.$router.push('/dashboard');
            console.log(this.secretKey);
          })
          .catch((error) => {
            console.error('Error fetching user details:', error);
          });

      }).catch((error) =>
        console.log(error)
      )
      await axios.get('/cloud/trails/?email=' + this.email
      ).then((response) => {
        console.log('Are we even here');
        this.$store.dispatch('setTrails', response.data.response)
        //console.log(this.trails)
      }).catch((error) =>
        console.log(error)
      )
      //console.log(response)


    },
    goRegister() {
      this.$router.push('/register')
    },
  },
};
</script>
