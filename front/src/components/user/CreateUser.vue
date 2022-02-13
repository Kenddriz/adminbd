<template>
  <q-form @submit="createUser" @reset="reset">
    <q-card flat bordered>
      <q-card-section :horizontal="$q.screen.gt.sm">
        <q-card-section class="q-pt-xs col-7">
          <q-input
            dense
            v-model="input.name"
            label="Nom complet *"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Entrer le nom d\'utilisateur']"
          />
          <q-input
            dense
            v-model="input.username"
            label="Nom d'utilisateur *"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Entrer le pseudonyme d\'utilisateur']"
          />
        </q-card-section>

        <q-card-section horizontal class="col-5">
          <q-uploader
            url="default.jpg"
            color="teal"
            class="col"
            flat
            bordered
            style="height: 160px"
            hide-upload-btn
            :multiple="false"
            accept="image/*"
            @added="setImage($event[0])"
            @removed="image = null"
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
import {useCreateUser} from 'src/graphql/users/create.user';

export default defineComponent({
  name: 'UserForm',
  setup() {
    return {
      ...useCreateUser(),
    }
  }
})
</script>
<style scoped>
</style>
