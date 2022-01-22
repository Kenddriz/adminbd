<template>
  <div>{{ services }}</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useServices} from '../graphql/service/services';

export default defineComponent({
  name: 'Service',
  setup() {
    return {
      ...useServices()
    }
  }
})
</script>

<style scoped>

</style>
