<template>
  <div id="app">
    <div class="text-gray-800 md:text-lg italic font-light">Which is your favourite AWS serverless service?</div>
    <div class="mx-auto flex mt-4">
      <button v-for="(candidate, index) in candidates" v-bind:key="candidate.id" @click="castVote(candidate.id)"
        v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold py-2 px-2 mx-1 md:h-18 h-18 rounded bg-${candidateColors[index]}-600 hover:bg-${candidateColors[index]}-800`">
        {{candidate.name}}<p>{{candidate.votes}}</p>
      </button>
    </div>
    <h1 class="text-gray-800 font-bold mt-8 mb-3">Live updates</h1>
    <VoteChart v-bind:chartData="chartData" width="200" height="110"></VoteChart>
  </div>
</template>

<script>
import VoteChart from "./components/VoteChart";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";

export default {
  components: { VoteChart },
  data() {
    return {
      candidates: [],
      candidateColors: ["red", "orange", "green", "blue"]
    };
  },
  computed: {
    chartData: function() {
      return {
        labels: this.candidates.map(candidate => candidate.name),
        datasets: [{
            label: false,
            data: this.candidates.map(candidate => candidate.votes),
            backgroundColor: ["#e53e3e", "#dd6b20", "#38a169", "#3182ce"]
          }]};
    }
  },
  async created() {
    await API.graphql(graphqlOperation(queries.listCandidates)).then(
      res => (this.candidates = res.data.listCandidates.items)
    );
  },
  methods: {
    castVote(candidateId) {
      const vote = { id: candidateId };
      API.graphql(graphqlOperation(mutations.castVote, { input: vote }));
    }
  },
  mounted() {
    API.graphql(graphqlOperation(subscriptions.onCastVote)).subscribe({
      next: voteCasted => {
        const id = voteCasted.value.data.onCastVote.id;
        const votes = voteCasted.value.data.onCastVote.votes;
        const candidates = this.candidates;
        const candidate = candidates.find(candidate => candidate.id === id);
        candidate.votes = votes;
        this.candidates = candidates;
      }
    });
  }
};
</script>