<template>
  <q-table
    title="Treats"
    :rows="[]"
    :columns="[]"
    row-key="name"
    selection="single"
    :filter="filter"
    class="q-ma-md"
    square
    no-data-label="Aucun employé trouvé"
  >
    <template v-slot:top-left>
      <Service />
    </template>
    <template v-slot:top-right>
      <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import Service from 'components/service/Service.vue';

export default defineComponent({
  name: 'Employee',
  components: { Service },
  setup() {
    return {
      filter: ref(''),
    }
  }
})
</script>

<style scoped>

</style>
