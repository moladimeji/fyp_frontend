<template>
    <Line :data="dataForChart" :options="chartOptions" />
</template>
  
<script>
import { defineComponent } from 'vue';
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Filler,
} from 'chart.js';
import { mapState } from 'vuex';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, Filler);

export default defineComponent({
    name: 'LineChartComponent',
    components: {
        Line,
    },
    computed: {
        ...mapState({
            trails: state => state.trails
        }),
        chartOptions() {
            return {
                scales: {
                    x: {
                        ticks: {
                            color: 'white' // change x-axis labels' color
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white' // change y-axis labels' color
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white' // change legend labels' color
                        }
                    },
                }
            };
        },
        dataForChart() {
            var diction = this.countEventsByMonth(this.trails);
            const keys = Object.keys(diction);
            const values = Object.values(diction);

            return {
                labels: keys, // Example months
                datasets: [{
                    label: 'Event Count',
                    data: values, // Event counts per month
                    fill: {
                        target: 'origin',
                        above: 'rgb(64,	224, 208)',   // Area will be red above the origin
                        below: 'rgb(75, 192, 192)'    // And blue below the origin
                    },
                    borderColor: 'rgb(255, 255, 255)',
                    tension: 0.1
                }]
            };
        },
    },
    methods: {
        countEventsByMonth(obj) {
            const counts = {}; // Object to hold month-year as key and event count as value

            Object.values(obj).forEach(eventsArray => {
                eventsArray.forEach(event => {
                    const date = new Date(event.EventTime);
                    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Format as 'Month-Year'

                    if (!counts[monthYear]) {
                        counts[monthYear] = 1; // Initialize if not present
                    } else {
                        counts[monthYear]++; // Increment existing count
                    }
                });
            });

            console.log(counts);
            return counts;
        }
    }
});
</script>