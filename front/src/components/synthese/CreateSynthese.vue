<template>
  <q-form @submit="createSynthese" @reset="reset">
    <q-card flat bordered>
      <q-card-section :horizontal="$q.screen.gt.sm">
        <q-card-section class="q-pt-xs col-7">
          <q-input
            dense
            v-model="input.intitule"
            label="intitule *"
            :lazy-rules="true"
            :rules="[ val => val && val.length || 'Entrer le nom de l\'intitule']"
          />
          <q-input
            dense
            v-model.number="input.effectif"
            label="Effectif *"
            :lazy-rules="true"
            :rules="[ val => val || 'Entrer l\'effectif']"
          />
            <q-input
            dense
            v-model.number="input.somSalaire"
            label="Somme  salaire *"
            :lazy-rules="true"
            :rules="[ val => val || 'Entrer la somme de  salaire']"
          />
             <q-input
            dense
            v-model.number="input.nombreSalDef"
            label="nombre de salaire *"
            :lazy-rules="true"
            :rules="[ val => val || 'Entrer le nombre de salaire']"
          />
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn
          :loading="loading"
          no-caps
          glossy
          type="submit"
          label="Enregistrer"
          icon="save"
          color="primary"
        />
        <q-btn
          no-caps
          glossy
          label="Rénitialiser"
          type="reset"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script lang="ts">
import {defineComponent } from 'vue';
import {useCreateSynthese} from 'src/graphql/Synthese/create.synthese';

export default defineComponent({
  name: 'SyntheseForm',
  setup() {
    return {
      ...useCreateSynthese(),
    }
  }
})
</script>
<style scoped>
</style>
