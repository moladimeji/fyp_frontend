<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card elevation="3">
                    <v-card-title class="primary">
                        <h2>Register</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="register">
                            <v-text-field v-model="email" label="Email" :rules="rules.required" outlined
                                required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" :rules="rules.required"
                                outlined required></v-text-field>
                            <v-text-field v-model="normalKey" label="Normal Key" :rules="rules.required" outlined
                                required></v-text-field>
                            <v-text-field v-model="secretKey" label="Secret Key" type="password" :rules="rules.required"
                                outlined required></v-text-field>
                            <v-select label="Region" v-model="region"
                                :items="['us-east-2', 'us-east-1', 'us-west-1', 'us-west-2', 'af-south-1', 'ap-east-1', 'ap-south-2', 'ap-southeast-3', 'ap-southeast-4', 'ap-south-1', 'ap-northeast-3', 'ap-northeast-2', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ca-central-1', 'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-south-1', 'eu-west-3', 'eu-south-2', 'eu-north-1', 'eu-central-2', 'il-central-1', 'me-south-1', 'me-central-1', 'sa-east-1', 'us-gov-east-1', 'us-gov-west-1']"></v-select>
                            <v-btn color="primary" type="submit">Register</v-btn>
                        </v-form>
                        <p1 @click="goLogin">Login Here</p1>
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
            'setEmail', 'setnormalKey', 'setsecretKey'
        ]),
        ...mapState({
            // 'stateKey' is the name of the state variable you want to access
            // 'localKey' is the name you want to use for the computed property
            // You can access it using this.localKey
            secretKey: 'secretKey',
        }),
    },
    data() {
        return {
            email: "",
            password: "",
            secretKey: "",
            normalKey: "",
            region: "",
            rules: {
                required: [(v) => !!v || 'Field is required.'],
            },
        };
    },
    methods: {
        async register() {
            const userData = {
            "first_name": "abc",
            "last_name": "123",
            "email": this.email,
            "password": this.password,
            "secretKey": this.secretKey,
            "normalKey": this.normalKey,
            "region": this.region,
            };
            await axios.post('/users', userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }
            ).then((response) => {
                console.log(response);
                this.goLogin()

            }).catch((error) =>
                console.log("Validation Error:", error.response.data)
            )
        },
        goLogin() {
            this.$router.push('/')
        },
    },
};
</script>