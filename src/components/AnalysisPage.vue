<template>
    <v-container fluid>
        <!-- Header Row -->
        <v-row>
            <v-col cols="12">
                <!-- Your header or title might go here -->
                <div v-motion-roll-top>
                    <h2 class="display-2" align="center">Dashboard</h2>
                </div>
            </v-col>
        </v-row>
        <v-tabs fixed-tabs bg-color="transparent" v-model="tab">
            <v-tab value="Naiive">
                Naiive
            </v-tab>
            <v-tab>
                AWS
            </v-tab>
            <v-tab>
                Custom
            </v-tab>
        </v-tabs>
        <v-row>
            <v-col v-if="tab === 'Naiive'" cols="12">
                <v-row>
                    <v-col cols="12" sm="6" md="3">
                        <PieChart />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-card color="deep-purple-accent-4" height="334px" width="1110px" elevation="12">
                        </v-card>
                    </v-col>
                </v-row>

                <!-- Chart and Todo List Row -->
                <v-row>
                    <v-col cols="12" md="8">
                        <!-- Your chart component here -->
                        <v-card color="deep-purple-accent-4">
                            <v-card-title>Event Chart</v-card-title>
                            <v-card-text>
                                <LineChart />
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                        <!-- Commits Card -->
                        <v-card color="deep-purple-accent-4" dark class="mt-3" height="159px" elevation="12">
                            <v-card-text class="text-center">
                                <h1 class="font-weight-bold">803</h1>
                                <div>commits</div>
                            </v-card-text>
                        </v-card>
                        <!-- Components Card -->
                        <v-card color="deep-purple-accent-4" dark class="mt-3" height="159px" elevation="12">
                            <v-card-text class="text-center">
                                <h1 class="font-weight-bold">57</h1>
                                <div>components</div>
                            </v-card-text>
                        </v-card>
                        <!-- Team Members Card -->
                        <v-card color="deep-purple-accent-4" dark class="mt-3" height="159px" elevation="12">
                            <v-card-text class="text-center">
                                <h1 class="font-weight-bold">5</h1>
                                <div>team members</div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col v-else cols="12">
                <p1>hello</p1>
            </v-col>
        </v-row>

    </v-container>
</template> 

<script>
import { mapState } from 'vuex';
import PieChart from './charts/PieChart.vue'
import LineChart from './charts/LineChart.vue';
import { ref } from 'vue'


export default {
    setup() {
        const tab = ref('Naiive'); // Default tab

        return {
            tab,
        };
    },
    components: {
        PieChart,
        LineChart
    },

    computed: {
        ...mapState({
            trails: 'trails'
        }),
    },

    data() {
        return {

            dataForChart: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        backgroundColor: ['#f87979', '#45aaf2', '#fed330'],
                        data: [40, 20, 30]
                    }
                ]
            },
            optionsForChart: {
                responsive: true,
                maintainAspectRatio: false
                // Additional options here
            },
            chart: null,
            data: this.$store.state.trails,
            errorCount: 0,
            normalCount: 0,
        }
    },

    methods: {
        countKeyValuePairs(obj) {
            let countNone = 0;
            let countOther = 0;

            Object.values(obj).forEach(array => {
                array.forEach(item => {
                    if (item.errorMessage === "None") {
                        countNone++;
                    } else {
                        countOther++;
                    }
                });
            });
            return { countNone, countOther };
        },
    }
}
</script>

<style scoped>
/* Helper classes */
.bg-basil {
    background-color: #FFFBE6 !important;
}

.text-basil {
    color: #356859 !important;
}

.v-tab {
    color: #FFFFFF;
    /* Make the text white */
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
</style>