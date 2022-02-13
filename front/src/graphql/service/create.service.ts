import { gql } from '@apollo/client';
import { Service,CreateServiceInput, MutationCreateServiceArgs } from '../types'
import { SERVICE_FIELDS } from './service.sdl';
import { reactive } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import {  Notify } from 'quasar';

// Type de retour par le resolver
type CreateServiceData = {
  // nom de la mutation
  // service :type de donne p
  createService: Service;
  // create service return  service type of service
}


// requet grpl
const CREATES_SERVICE =
  gql `
  # nom de la mutation
mutation CreateService($input:CreateServiceInput!){
  createService(input: $input){
    ${SERVICE_FIELDS}
  }
}
`

export const useCreateService = () => {
  // input variable meme que celle de service
  const input = reactive<CreateServiceInput>({
    intitule: ''
  });

// apporte de la modification on utilise useMutation
  // renommer le type de loadin en loadingCreation
  const { loading:loadingCreation, onDone, mutate } = useMutation<
    CreateServiceData,
    MutationCreateServiceArgs>(CREATES_SERVICE, {
      update: (caches, { data }) => {
        if (data?.createService) {
          caches.modify({
            fields: {
              services(existingRef: any[], { toReference }) {
                return [toReference(data.createService), ...existingRef]
            }
          }
        })
      }
      }
    });

  onDone(({ data }) => {
    if (data?.createService) {
      Notify.create({
        message: 'success',
        color: 'info'
      })
    }
    else {
      Notify.create({
        message: 'failed',
        color: 'info'
      })
    }
  });

  function submitCreation() {
    void mutate({ input });
  }


  return {input,submitCreation,loadingCreation}
}
