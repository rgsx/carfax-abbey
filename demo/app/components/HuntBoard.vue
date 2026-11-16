<template>
  <form class="hunt" @submit.prevent="setOut">
    <h2 v-bind:title="tooltip">{{ name }} — {{ boxes.length }} boxes left</h2>

    <input v-model.trim="name" v-focus :[dynamicAttr]="placeholder" />

    <p v-if="uiState === 'waiting'" class="hint">Waiting for the dawn…</p>
    <p v-else-if="escaped" class="hint">The Count has fled the house.</p>
    <ul v-else>
      <li v-for="(box, index) in boxes" :key="box" v-on:click="remove(index)">
        {{ index + 1 }}. {{ box }}
      </li>
    </ul>

    <slot name="footer" :count="boxes.length">
      <button type="submit" :class="{ disabled: uiState === 'waiting' }">Set out</button>
    </slot>
    <DawnClock :nights="boxes.length">
      <template #after="{ when }">
        <small>We meet at {{ when }}</small>
      </template>
    </DawnClock>
  </form>
</template>

<script>
import DawnClock from './DawnClock.vue';

export default {
  name: 'HuntBoard',
  components: { DawnClock },
  directives: {
    focus: { mounted: (el) => el.focus() },
  },
  props: {
    escaped: { type: Boolean, default: false },
  },
  emits: ['set-out'],
  data() {
    return {
      name: 'Van Helsing',
      boxes: ['Carfax', 'Piccadilly', 'Bermondsey'],
      dynamicAttr: 'placeholder',
      glow: '#af8b4d',
    };
  },
  computed: {
    uiState() {
      return this.$store.state.uiState;
    },
    placeholder() {
      return `Cable ${this.name}`;
    },
    tooltip() {
      return this.escaped ? 'Fled' : 'At rest';
    },
  },
  methods: {
    setOut() {
      this.$emit('set-out', this.name);
    },
    remove(index) {
      this.boxes.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.hunt {
  --glow: v-bind(glow);
  border-radius: 4px;
  transition: 0.3s all ease-out;
}

button.disabled:hover {
  background: #500c00;
  cursor: not-allowed;
}
</style>
