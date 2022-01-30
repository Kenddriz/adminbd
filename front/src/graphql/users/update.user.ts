import { useMutation } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { ref } from 'vue';
import {MutationUpdateUserArgs, UpdateUserInput, User} from 'src/graphql/types';
import {USER_FIELDS} from 'src/graphql/users/user.sdl';
import {Dialog, Notify} from 'quasar';

type UpdateUserData = {
  updateUser: User;
};
const UPDATE_USER = gql`
    mutation UpdateUser($input: UpdateUserInput!, $image: Upload) {
        updateUser(input: $input, image: $image) {
            ${USER_FIELDS}
        }
    }
`;
export const useUpdateUser = () => {
  const image = ref<File|null>(null);
  const { loading, mutate, onDone } = useMutation<
    UpdateUserData,
    MutationUpdateUserArgs
  >(UPDATE_USER, { context: { hasUpload: true } });
  onDone(({ data }) => {
    if(data?.updateUser) {
      Notify.create({
        message: 'Utilisateur mis à jour avec succès',
        color: 'positive',
      })
    } else {
      Notify.create({
        message: 'Echec de modification! Réessayer plus tard.',
        color: 'negative',
      })
    }
  });

  function updateUser(input: UpdateUserInput) {
    void mutate({
      input,
      image: image.value,
    });
  }
  function updateName(id: number, name: string) {
    Dialog.create({
      cancel: 'Annuler',
      ok: 'Enregistrer',
      title: 'Mise à jour',
      dark: true,
      prompt: {
        model: name,
        type: 'text',
        isValid: val => val.length > 2,
      },
    }).onOk(( data ) => {
      if(data !== name) {
        void mutate({ input: { id, name: data } })
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
    updateUser,
    image,
    updateName,
  };
};
