<template>
  <div class="q-pa-md">
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="Créer un nouveau Service"
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
    >
      <UserForm />
    </q-expansion-item>
    <q-table
      grid
      title="Tous Service"
      :rows="services"
       :columns="columns"
      row-key="id"
      :filter="filter"
      hide-header
      rows-per-page-label="Service par page"
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
        <h4 class="text-center full-width">Aucun Service trouvé</h4>
      </template>
      <template v-slot:item="props">
        <q-card class="q-ma-xs col-xs-12 col-sm-6 col-md-2">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label> Service Number {{ props.row.id }}</q-item-label>
                <q-item-label caption>{{ props.row.intitule }}</q-item-label>

              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
          <q-card-actions align="between">
            <q-btn
              @click="updateName(props.row.id, props.row.intitule)"
              flat
              dense
              round
              icon="edit"
            />
            <q-btn
              @click="softRemoveService(props.row.id)"
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
import {defineComponent, ref} from 'vue';
import {useServices} from 'src/graphql/service/services';
import UserForm from 'components/service/Service.vue';
import {useSoftRemoveService} from 'src/graphql/service/soft.remove.service';
import {useUpdateService} from 'src/graphql/service/update.service';


export default defineComponent({
  name: 'Synthesis',
  components: { UserForm },
  setup() {
    return {
      filter: ref(''),
      ...useServices(),
       ...useUpdateService(),
       ...useSoftRemoveService(),
      paginationLabel: (first: number, end: number, total: number) => `${first} - ${end} de ${total}`,
    }
  }
})
</script>

<style lang="scss" scoped>
.grid-style-transition {
  transition: transform .28s, background-color .28s
}
</style>
