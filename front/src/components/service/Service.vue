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
      <q-btn :loading="loadingCreation" color="primary" icon="add">
        <q-popup-edit
          :model-value="input.intitule"
        >
          <q-input
            v-model="input.intitule"
            dense
            :lazy-rules="true"
            :rules="[ v => v && v.length || '']"
            outlined
          >
            <template #after>
              <q-btn @click="submitCreation()" outline icon="send" type="submit" />
            </template>
          </q-input>
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
    return {
      ...useServices(),
      selected: ref(1),
      ...useCreateService(),
    }
  }
})
</script>

<style scoped>

</style>
