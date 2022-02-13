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
  >
    <template v-slot:before>
      <q-btn :loading="loadingCreation" color="primary" icon="add" >
        <q-popup-edit
         :model-value="input.intitule"
        class="bg-cyan-8 text-white"
        >
        <q-input
          dark color="white"
          v-model="input.intitule"
          dense
          @keyup.enter="submitCreation"
          ></q-input>
        </q-popup-edit>
      </q-btn>
    </template>
    <template v-slot:after>
      <q-btn color="primary" icon="edit" />
    </template>
  </q-select>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useServices} from 'src/graphql/service/services';
import {useCreateService} from 'src/graphql/service/create.service';

export default defineComponent({

  name: 'Service',
  setup() {
    const {} = useServices();
    return {
      // spreed
      // Destructuration
      ...useServices(),
      selected: ref(1),
      ...useCreateService()
  // We need an a spreed when
    }
  }
})
</script>
<style scoped>
</style>
