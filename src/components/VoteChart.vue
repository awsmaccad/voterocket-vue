<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
const fontStack = '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const chartOptions = {
  title: { display: false },
  legend: { display: false },
  tooltips: { enabled: false },
  responsive: true,
  layout: { padding: { top: 10 } },
  scales: {
    xAxes: [{gridLines: {display: false }, ticks: {fontStyle: 'bold', fontSize:13, fontColor: '#3D4852', fontFamily: fontStack}}],
    yAxes: [{ticks: {beginAtZero: true, maxTicksLimit: 6, fontStyle: 'normal', fontColor: '#3D4852', fontFamily: fontStack}}]
  }
}
export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["width", "height"],
  data() {
    return {
      options: chartOptions
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>