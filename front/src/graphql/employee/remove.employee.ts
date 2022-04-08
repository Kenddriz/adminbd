import { gql } from '@apollo/client';
import {useMutation} from '@vue/apollo-composable';
import {MutationRemoveEmployeArgs} from 'src/graphql/types';
import {Dialog} from 'quasar';

type RemoveEmployeeData = {
  removeEmployee: boolean;
}

const REMOVE_EMPLOYEE = gql`
    mutation RemoveEmployee($id: Int!) {
      removeEmploye(id: $id)
    }
`;

export const useRemoveEmployee = () => {
  const { loading: loadingRemove, mutate } = useMutation<
    RemoveEmployeeData,
    MutationRemoveEmployeArgs
    >(REMOVE_EMPLOYEE);
  function removeEmployee(id: number) {
    Dialog.create({
      title: 'Suppression',
      message: 'Etes-vous sûr de vouloir de supprimer ?',
      cancel: 'Annuler',
      ok: 'Confirmer',
    }).onOk(() => {
      void mutate({ id }, {
        update(cache, { data }) {
          if (data?.removeEmployee) {
            cache.modify({
              fields: {
                employees(existingRef: any[], { readField }) {
                  return existingRef.filter(
                    (eRef) => readField('id', eRef) !== id
                  );
                },
              },
            });
          }
        },
      })
    })
  }
  return {
    loadingRemove,
    removeEmployee
  }
}
