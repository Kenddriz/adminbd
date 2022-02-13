import { useMutation } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import {MutationUpdateServiceArgs, UpdateServiceInput, Service} from 'src/graphql/types';
import {SERVICE_FIELDS} from 'src/graphql/service/service.sdl';
import {Dialog, Notify} from 'quasar';

// Declaration de l'objet updateSevice de type Service
type UpdateServiceData = {
  updateService: Service;
};
// Declaration de variable UPDATE_SERVICE pour l'api graphql
// // Define mutation
const UPDATE_SERVICE = gql`
# ici on doit muter le service venant de type  UpdateServiceInput
# Increments a back-end counter and gets its resulting value
    mutation UpdateService($input: UpdateServiceInput!) {
        updateService(input: $input) {
            ${SERVICE_FIELDS}
        }
    }
`;
// Maintenant nous alons une methode useUpdateService et importer vers le component

export const useUpdateService = () => {
// Modify data with the useMutation
// Pass mutation to useMutation
  const { loading, mutate, onDone } = useMutation<
  UpdateServiceData,
    MutationUpdateServiceArgs
    // mutation IncrementCounter
  >(UPDATE_SERVICE);
  onDone(({ data }) => {
    if(data?.updateService) {
      Notify.create({
        message: 'Le service  mis à jour avec succès',
        color: 'positive',
      })
    } else {
      Notify.create({
        message: 'Echec de modification! Réessayer plus tard.',
        color: 'negative',
      })
    }
  });

  function updateService(input: UpdateServiceInput) {
    void mutate({
      input,

    });
  }

  function updateName(id: number, intitule: string) {
    Dialog.create({
      cancel: 'Annuler',
      ok: 'Enregistrer',
      title: 'Mise à jour',
      dark: true,
      prompt: {
        model: intitule,
        type: 'text',
        isValid: val => val.length > 2,
      },
    }).onOk(( data ) => {
      if(data !== intitule) {
        void mutate({ input: { id, intitule: data } })
      } else {
        Notify.create({
          message: 'Aucune modification effectuée !',
          color: 'secondary',
        })
      }
    });
  }

  return {
    loading,
    updateService,
    updateName,
  };
};
