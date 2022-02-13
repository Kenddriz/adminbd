<template>
  <q-table
    title="Treats"
    :rows="employees"
    :columns="columns"
    row-key="name"
    selection="single"
    :filter="filter"
    class="q-ma-md"
    square
    no-data-label="Aucun employé trouvé"
    :rows-per-page-options="[10,20,30,40,50,60]"
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
import {useEmployees} from 'src/graphql/employee/employees';
import {columns} from 'src/graphql/employee/employee';

export default defineComponent({
  name: 'Employee',
  components: { Service },
  setup() {
    return {
      filter: ref(''),
      ...useEmployees(),
      columns,
    }
  }
})
</script>

<style scoped>

</style>
