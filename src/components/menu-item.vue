<template lang="pug">
  li(:class="className")
    router-link(:to="location", :exact="exact") 
      slot
</template>

<script lang="ts">
import 'uikit';
import 'uikit/dist/css/uikit.css';

export default {
  name: 'MenuItem',
  props: {
    to: {
      type: String,
      required: true
    },
    exact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    location (): any {
      return {
        name: this.to
      };
    },
    className () {
      if (this.$route.name === this.to) {
        return 'uk-active';
      }
    }
  }
};
</script>
