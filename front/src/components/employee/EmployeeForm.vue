<template>
    <q-card>
      <q-card-section class="q-pb-none text-h5">
        {{ item ? 'Mettre à jour l\'employé' : 'Créer un employé' }}
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="$emit('submit', input)">
          <q-input
            class="q-mt-md"
            outlined
            dense
            v-model="input.nom"
            label="Nom complet *"
            :lazy-rules="true"
            :rules="[ val => val && val.length > 0 || 'Entrer le nom de l\'employé']"
          />
          <q-select
            v-model="input.serviceId"
            style="width: 300px"
            dense
            outlined
            :options="services"
            options-cover
            map-options
            emit-value
            option-value="id"
            option-label="intitule"
            placeholder="Nouveau service"
          >
          </q-select>
          <q-input
            class="q-mt-md"
            outlined
            type="number"
            dense
            v-model.number="input.salaire"
            label="Salaire *"
            :lazy-rules="true"
            :rules="[ val => val > 0 || 'Entrer le salaire']"
          />
          <q-btn
            :loading="loading"
            type="submit"
            icon-right="send"
            label="Valider"
          />
        </q-form>
      </q-card-section>
    </q-card>
</template>

<script lang="ts">
  import {defineComponent, reactive, watch } from 'vue';
    export default defineComponent({
      props: ['services', 'item', 'loading'],
      emits: ['submit'],
      name: 'EmployeeForm',
      setup(props) {
        const input = reactive({
          nom: props.item?.nom || '',
          salaire: props.item?.salaire || props.services[0]?.id || 0,
          serviceId: null,
        });
        watch(() => props.services, services => {
            input.nom = props.item?.nom || '';
            input.salaire = props.item?.salaire;
            input.serviceId = props.item?.service?.id || services[0]?.id || null;
        }, { immediate: true })
        return {
          input
        }
      }
    })
</script>

<style scoped></style>
