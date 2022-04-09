<template>
  <q-table
    grid
    title="Toutes synthèses"
    :rows="syntheses"
    :columns="columns"
    row-key="name"
    :filter="filter"
    hide-header
    rows-per-page-label="Synthèses par page"
    :pagination-label="paginationLabel"
    :loading="loading"
    class="q-ma-md"
    no-data-label="Aucune synthèse trouvée"
  >
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Chercher">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template #no-data>
      <h4 class="text-center full-width">Aucune synthèse trouvée</h4>
    </template>
    <template v-slot:item="props">
      <q-card class="q-ma-xs col-xs-12 col-sm-6 col-md-2">
        <q-card-section class="text-h5 text-center">
          {{ props.row.intitule }}
        </q-card-section>
        <q-separator />
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Nombre d'employés</q-item-label>
              <q-item-label caption>
                {{ props.row.effectif }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Somme de salaire</q-item-label>
              <q-item-label caption>
                {{ props.row.somSalaire }} Ar
              </q-item-label>
            </q-item-section>
          </q-item>

          <!--<q-item>
            <q-item-section side>
              <q-item-label>Salaire défini</q-item-label>
              <q-item-label caption>
                {{ props.row.nombreSalDef }}
              </q-item-label>
            </q-item-section>
          </q-item>-->
        </q-list>
      </q-card>
    </template>
  </q-table>
</template>


<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import {useSyntheses} from '../graphql/Synthese/syntheses';

export default defineComponent({
  name: 'Synthesis',
  setup() {
    const {  columns, loading, syntheses } = useSyntheses();
    return {
      filter: ref(''),
      paginationLabel: (first: number, end: number, total: number) => `${first} - ${end} de ${total}`,
      columns,
      loading,
      syntheses
    }
  }
})
</script>

<style scoped>

</style>
