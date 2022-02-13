import {gql} from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import {MutationRemoveCategoryArgs} from 'src/graphql/types';
import {Notify} from 'quasar';
import { Dialog } from 'quasar';

type RemoveCategoryData = {
  removeCategory: boolean;
}

const SOFT_REMOVE = gql`
    mutation RemoveCategory($id: Int!){
      removeCategory(id: $id)
    }
`;
export const useRemoveCategory = () => {
  const { loading, onDone, mutate } = useMutation<
  RemoveCategoryData,
  MutationRemoveCategoryArgs
    >(SOFT_REMOVE);
  onDone(({ data }) => {
    if(data?.removeCategory) {
      Notify.create({
        message: 'Category  supprimée avec succès',
        color: 'positive',
      })
    } else {
      Notify.create({
        message: 'Echec de suppression! Réessayer plus tard.',
        color: 'negative',
      })
    }
  })

  function removeCategory(id: number) {
    Dialog.create({
      message: 'Etes-vous sûr de vouloir supprimer cet utilisateur ?',
      cancel: 'Annuler',
      ok: 'Confirmer',
      title: 'Suppression',
      dark: true,
    }).onOk(() => {
      void mutate({ id }, {
        update: (cache, { data }) => {
          if(data?.removeCategory) {
            cache.modify({
              fields: {
                category(existingRef: any[], { readField }) {
                  return existingRef.filter(ref => readField('id', ref) !== id);
                }
              }
            })
          }
        }
      })
    });
  }
  return { removeCategory, loading }
}
