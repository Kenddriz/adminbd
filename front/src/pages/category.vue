<template>
  <div class="q-pa-md">
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="Créer un nouveau Category"
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
    >
      <UserForm />
    </q-expansion-item>
    <q-table
      grid
      title="Tous les Categries"
      :rows="category"
      :columns="columns"
      row-key="id"
      :filter="filter"
      hide-header
      rows-per-page-label="categorie  par page"
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
        <h4 class="text-center full-width">Aucun utilisateur trouvé </h4>
      </template>
      <template v-slot:item="props">
       <q-card class="q-ma-xs col-xs-12 col-sm-6 col-md-2">
          <!-- <img height="100" :src="url(props.row.avatar)"> -->
       <q-separator />

          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
                <q-item-label caption>{{ props.row.slug }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-separator />

               <q-card-actions align="between">

            <q-btn
               @click="updateName(props.row.id, props.row.name,props.row.slug)"
              flat
              dense
              round
              icon="edit"
            />

          <!-- delete -->

            <q-btn
              @click="removeCategory(props.row.id)"
              flat
              dense
              rounded
              icon="delete"
            />
          </q-card-actions>
          <!-- delete -->
        </q-card>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
 import {useCategory} from 'src/graphql/category/category';
import UserForm from 'components/category/CreateCategory.vue';
import {useRemoveCategory} from 'src/graphql/category/remove.category';
import {useUpdateCategory} from 'src/graphql/category/update.category';

export default defineComponent({
  name: 'Category',
  components: { UserForm },
  setup() {
    return {
      filter: ref(''),
      paginationLabel: (first: number, end: number, total: number) => `${first} - ${end} de ${total}`,
      ...useRemoveCategory(),
      ...useUpdateCategory(),
     ...useCategory(),
    }
  }
})
</script>

<style lang="scss" scoped>
.grid-style-transition {
  transition: transform .28s, background-color .28s
}
</style>
