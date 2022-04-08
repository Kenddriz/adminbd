<template>
  <q-table
    :rows="employees"
    :columns="columns"
    row-key="name"
    :filter="filter"
    class="q-ma-md"
    square
    no-data-label="Aucun employé trouvé"
    :rows-per-page-options="[10,20,30,40,50,60]"
    :loading="loadEmployees || updateLoading || createLoading || loadingRemove"
  >
    <template v-slot:top-left>
      <Service :services="services" :loading="loading" />
    </template>
    <template v-slot:top-right>
      <q-btn @click="openDialog()" label="Nouvel employé" icon="add" class="q-mx-md" />
      <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-action="props">
      <q-td :props="props">
        <q-btn
          @click="removeEmployee(props.row.id)"
          color="red"
          icon="delete"
          class="q-mr-sm"
        />
        <q-btn
          @click="openDialog(props.row)"
          color="teal"
          icon="edit"
        />
      </q-td>
    </template>
  </q-table>
  <q-dialog v-model="dialog.show">
    <EmployeeForm
      :loading="createLoading"
      @submit="onSubmit"
      :services="services"
      :item="dialog.item"
    />
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, ref, defineAsyncComponent, reactive, onMounted } from 'vue';
import Service from 'components/service/Service.vue';
import {useEmployees} from 'src/graphql/employee/employees';
import {columns} from 'src/graphql/employee/employee';
import {useServices} from 'src/graphql/service/services';
import {useCreateEmployee} from 'src/graphql/employee/create.employee';
import {useUpdateEmployee} from 'src/graphql/employee/update.employee';
import {useRemoveEmployee} from 'src/graphql/employee/remove.employee';

export default defineComponent({
  name: 'Employee',
  components: {
    Service,
    EmployeeForm: defineAsyncComponent(() => import('components/employee/EmployeeForm.vue'))
  },
  setup() {
    const dialog = reactive<any>({
      item: null,
      show: false,
    });
    function openDialog(item = null) {
      dialog.item = item;
      dialog.show = true;
    }
    const { loadEmployees, employees, loadData } = useEmployees();
    const { createEmployee, createLoading } = useCreateEmployee(() => {
      dialog.item = null;
      dialog.show = false;
    });
    const { updateEmployee, updateLoading } = useUpdateEmployee(() => {
      dialog.item = null;
      dialog.show = false;
    })
    function onSubmit(input: any) {
      if(dialog.item) updateEmployee({ id: dialog.item.id, ...input });
      else createEmployee(input);
    }
    onMounted(() => {
      loadData();
    })
    return {
      filter: ref(''),
      loadEmployees,
      employees,
      columns,
      dialog,
      openDialog,
      ...useServices(),
      createLoading,
      onSubmit,
      updateLoading,
      ...useRemoveEmployee(),
    }
  }
})
</script>

<style scoped>

</style>
