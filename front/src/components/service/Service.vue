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
<<<<<<< HEAD
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
=======
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
>>>>>>> 31a20cb (update gestion)
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
<<<<<<< HEAD
  name: 'Service',
  setup() {
    return {
      ...useServices(),
      selected: ref(1),
      ...useCreateService(),
=======

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
>>>>>>> 31a20cb (update gestion)
    }
  }
})
</script>
<<<<<<< HEAD

<style scoped>

=======
<style scoped>
>>>>>>> 31a20cb (update gestion)
</style>
