<template lang="pug">
  div
    router-view
</template>

<script lang="ts">
import 'uikit';
import 'uikit/dist/js/uikit-icons.min.js';
import 'uikit/dist/css/uikit.min.css';
import MenuItem from './components/menu-item.vue';
export default {
  name: 'App',
  components: {
    MenuItem
  },
  data () {
    return {
    };
  }
};
</script>
