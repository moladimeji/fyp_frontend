<template>
    <v-container>
        <v-card color="deep-purple-accent-4" rounded="rounded-lg" elevation="12">
            <Pie :data="dataForChart" :options="optionsForChart" />
        </v-card>
    </v-container>
</template>
  
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { mapState } from 'vuex';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
    name: 'PieChart',
     
    components: {
        Pie
    },
    computed: {
        ...mapState({
            trails: state => state.trails
        }),
        // Dynamically compute the chart data based on Vuex state
        dataForChart() {
            console.log(JSON.stringify(this.trails));
            const { countNone, countOther } = this.countKeyValuePairs(this.trails);
            return {
                labels: ['Normal', 'Error'],
                datasets: [{
                    label: 'Normal Logs VS Error Logs',
                    backgroundColor: ['#40e0d0', '#f44336'],
                    data: [countNone, countOther]
                }]
            };
        },
        optionsForChart() {
            return {
                responsive: true,
                maintainAspectRatio: false
                // Additional options here
            };
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