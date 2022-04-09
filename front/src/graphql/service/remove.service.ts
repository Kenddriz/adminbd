import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import {MutationRemoveServiceArgs} from 'src/graphql/types';
import {Notify} from 'quasar';
import { Dialog } from 'quasar';



type SoftRemoveServiceData = {
  removeService: boolean;
}

const SOFT_REMOVE = gql`
    mutation RemoveService($id: Int!){
      removeService(id: $id)
    }
`;
export const useSoftRemoveService = () => {
  const { loading, onDone, mutate } = useMutation<
  SoftRemoveServiceData,
    MutationRemoveServiceArgs
    >(SOFT_REMOVE);
  onDone(({ data }) => {
    if(data?.removeService) {
      Notify.create({
        message: 'Service supprimée avec succès',
        color: 'positive',
      })
    } else {
      Notify.create({
        message: 'Echec de suppression! Réessayer plus tard.',
        color: 'negative',
      })
    }
  })


  function softRemoveService(id: number) {
    Dialog.create({
      message: 'Etes-vous sûr de vouloir supprimer cet Service ?',
      cancel: 'Annuler',
      ok: 'Confirmer',
      title: 'Suppression',
      dark: true,
    }).onOk(() => {

      void mutate({ id }, {

        update: (cache, { data }) => {
          if(data?.removeService) {
            cache.modify({
              fields: {
                services(existingRef: any[], { readField }) {
                  return existingRef.filter(ref => readField('id', ref) !== id);
                }
              }
            })
          }
        }
      })
    });
  }
  return { softRemoveService, loading }
}
