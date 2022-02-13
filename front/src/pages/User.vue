<template>
  <div class="q-pa-md">
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="Créer un nouveau utilisateur"
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
    >
      <UserForm />
    </q-expansion-item>
    <q-table
      grid
      title="Tous utilisateurs"
      :rows="users"
      :columns="columns"
      row-key="id"
      :filter="filter"
      hide-header
      rows-per-page-label="Utilisateurs par page"
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
        <h4 class="text-center full-width">Aucun utilisateur trouvé</h4>
      </template>
      <template v-slot:item="props">
        <q-card class="q-ma-xs col-xs-12 col-sm-6 col-md-2">
          <img height="100" :src="url(props.row.avatar)">
          <q-separator />

          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
                <q-item-label caption>{{ props.row.username }}</q-item-label>

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
import {defineComponent, ref} from 'vue';
import {useUsers} from 'src/graphql/users/users';
import UserForm from 'components/user/CreateUser.vue';
import {useSoftRemoveUser} from 'src/graphql/users/soft.remove.user';
import {useUpdateUser} from 'src/graphql/users/update.user';

export default defineComponent({
  name: 'User',
  components: { UserForm },
  setup() {
    return {
      filter: ref(''),
      ...useUsers(),
      url:(image: string) => image ? `${process.env.uri}avatars/${image}` : 'default.jpg',
      paginationLabel: (first: number, end: number, total: number) => `${first} - ${end} de ${total}`,
      ...useSoftRemoveUser(),
      ...useUpdateUser(),
    }
  }
})
</script>

<style lang="scss" scoped>
.grid-style-transition {
  transition: transform .28s, background-color .28s
}
</style>
