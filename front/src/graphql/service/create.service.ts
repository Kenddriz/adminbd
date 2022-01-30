import {CreateServiceInput, MutationCreateServiceArgs, Service} from 'src/graphql/types';
import {gql} from '@apollo/client/core';
import {SERVICE_FIELDS} from 'src/graphql/service/service';
import {reactive} from 'vue';
import {useMutation} from '@vue/apollo-composable';
import {Notify} from 'quasar';

type CreateServiceData = {
  createService: Service;
}

const CREATE_SERVICE = gql`
    mutation CreateService($input: CreateServiceInput!) {
      createService(input: $input) {
        ${SERVICE_FIELDS}
      }
    }
`;

export const useCreateService = () => {
  const input = reactive<CreateServiceInput>({
    intitule: '',
  });
  const { loading: loadingCreation, onDone, mutate } = useMutation<
    CreateServiceData,
    MutationCreateServiceArgs
    >(CREATE_SERVICE, {
      update: (cache, { data }) => {
        if(data?.createService) {
          cache.modify({
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
    if(data?.createService) {
      Notify.create({
        message: 'Service crée avec succès',
        color: 'teal',
      })
    } else {
      Notify.create({
        message: 'Echec de création',
        color: 'negative',
      })
    }
  })
  function submitCreation() {
    void mutate({ input });
  }
  return { input, submitCreation, loadingCreation }
}
