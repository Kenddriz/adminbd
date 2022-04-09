<template>
  <q-select
    v-model="selected"
    style="width: 300px"
    dense
    outlined
    :options="services"
    options-cover
    map-options
    emit-value
    :loading="loading"
    option-value="id"
    option-label="intitule"
    label="services"
  >
    <template v-slot:before>
      <q-btn :loading="loadingCreation" color="teal" icon="add" >
        <q-popup-edit
         :model-value="input.intitule"
         auto-save
        >
        <q-input
          v-model="input.intitule"
          dense
          @keyup.enter="submitCreation"
          ></q-input>
        </q-popup-edit>
      </q-btn>
    </template>
    <template v-slot:after>
      <q-btn
        :loading="loadingUpdate"
        :disable="!selected"
        @click="update()"
        color="teal"
        icon="edit"
      />
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useCreateService } from 'src/graphql/service/create.service';
import {useUpdateService} from 'src/graphql/service/update.service';

export default defineComponent({
  props: ['services', 'loading'],
  name: 'Service',
  setup(props) {
    const selected = ref<any>(null);
    watch(() => props.services, services => {
      selected.value = services.length > 0 ? 1 : null;
    });
    const { loadingUpdate, updateService } = useUpdateService();
    function update() {
      const { id, intitule } = props.services.find((s: any) => s.id === selected.value);
      updateService(id, intitule);
    }
    return {
      selected,
      ...useCreateService(),
      update,
      loadingUpdate
    }
  }
})
</script>
<style scoped>
</style>
