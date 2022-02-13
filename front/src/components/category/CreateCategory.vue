<template>
  <q-form @submit="createCategory" @reset="reset">
    <q-card flat bordered>
      <q-card-section :horizontal="$q.screen.gt.sm">
        <q-card-section class="q-pt-xs col-7">
          <q-input
            dense
            v-model="input.name"
            label="Nom de la categorie *"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Entrer le nom de la categorie']"
          />
          <q-input
            dense
            v-model="input.slug"
            label="Slug *"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Entrer le slug de la categorie']"
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
import {useCreateCategory} from 'src/graphql/category/create.category';

export default defineComponent({
  name: 'UserForm',
  setup() {
    return {
      ...useCreateCategory(),
    }
  }
})
</script>

<style scoped>

</style>
