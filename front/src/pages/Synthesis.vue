<template>
  <div class="q-pa-md">
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="Créer un nouveau Synthese"
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
    >
      <SyntheseForm />
    </q-expansion-item>
    <q-table
      grid
      title="Tous Synthese"
      :rows="syntheses"
      :columns="columns"
      row-key="id"
      :filter="filter"
      hide-header
      rows-per-page-label="Synthese par page"
      :pagination-label="paginationLabel"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Chercher">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #no-data>
        <h4 class="text-center full-width">Aucun Synthese trouvé</h4>
      </template>
      <template v-slot:item="props">
        <q-card class="q-ma-xs col-xs-12 col-sm-6 col-md-2">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label>{{ props.row.intitule }}</q-item-label>
                <q-item-label caption>{{ props.row.effectif }}</q-item-label>
                  <q-item-label caption>{{ props.row.somSalaire }}</q-item-label>
                   <q-item-label caption>{{ props.row.nombreSalDef }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
          <q-card-actions align="between">
            <q-btn
              @click="updateName(props.row.id, props.row.name)"
              flat
              dense
              round
              icon="edit"
            />
            <q-btn
              @click="softRemoveUser(props.row.id)"
              flat
              dense
              rounded
              icon="delete"
            />
          </q-card-actions>
        </q-card>
      </template>
    </q-table>
  </div>
</template>


<script lang="ts">
import {defineComponent,ref} from 'vue';
import {useSynthese} from '../graphql/Synthese/synthese';
import SyntheseForm from 'components/synthese/CreateSynthese.vue';
// import {useRemoveCategory} from 'src/graphql/category/remove.category';
// import {useUpdateCategory} from 'src/graphql/category/update.category';


export default defineComponent({
  name: 'Synthesis',
   components: { SyntheseForm },
  setup() {
    return {
            filter: ref(''),
      paginationLabel: (first: number, end: number, total: number) => `${first} - ${end} de ${total}`,
      // ...useRemoveCategory(),
      // ...useUpdateCategory(),
      ...useSynthese()
    }
  }
})
</script>

<style scoped>

</style>
