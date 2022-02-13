import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import {MutationSoftRemoveUserArgs} from 'src/graphql/types';
import {Notify} from 'quasar';
import { Dialog } from 'quasar';

type SoftRemoveUserData = {
  softRemoveUser: boolean;
}

const SOFT_REMOVE = gql`
    mutation SoftRemoveUser($id: Int!){
      softRemoveUser(id: $id)
    }
`;
export const useSoftRemoveUser = () => {
  const { loading, onDone, mutate } = useMutation<
    SoftRemoveUserData,
    MutationSoftRemoveUserArgs
    >(SOFT_REMOVE);
  onDone(({ data }) => {
    if(data?.softRemoveUser) {
      Notify.create({
        message: 'Utilisateur supprimée avec succès',
        color: 'positive',
      })
    } else {
      Notify.create({
        message: 'Echec de suppression! Réessayer plus tard.',
        color: 'negative',
      })
    }
  })
  function softRemoveUser(id: number) {

    Dialog.create({

      message: 'Etes-vous sûr de vouloir supprimer cet utilisateur ?',
      cancel: 'Annuler',
      ok: 'Confirmer',
      title: 'Suppression',
      dark: true,
    }).onOk(() => {
      void mutate({ id }, {
        update: (cache, { data }) => {
          if(data?.softRemoveUser) {
            cache.modify({
              fields: {
                users(existingRef: any[], { readField }) {
                  return existingRef.filter(ref => readField('id', ref) !== id);
                }
              }
            })
          }
        }
      })
    });
  }
  return { softRemoveUser, loading }
}
