import { useMutation } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
// import { ref } from 'vue';
import {MutationUpdateCategoryArgs, UpdateCategoryInput, Category} from 'src/graphql/types';
import {CATEGORY_FIELDS} from 'src/graphql/category/category.sdl';
import {Dialog, Notify} from 'quasar';
import  UpdateCategory  from '../../components/category/UpdateCategory.vue';
type UpdateCategoryData = {
  updateCategory: Category;
};

const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($input: UpdateCategoryInput!){
        updateCategory(input: $input) {
            ${CATEGORY_FIELDS}
        }
    }
`;

export const useUpdateCategory = () => {

  const { loading, mutate, onDone } = useMutation<
    UpdateCategoryData,
    MutationUpdateCategoryArgs
  >(UPDATE_CATEGORY);
  onDone(({ data }) => {
    if(data?.updateCategory) {
      Notify.create({
        message: 'Category mis à jour avec succès',
        color: 'positive',
      })
    } else {
      Notify.create({
        message: 'Echec de modification! Réessayer plus tard.',
        color: 'negative',
      })
    }
  });


  function updateCategory(input: UpdateCategoryInput) {
    void mutate({
      input
    });
  }


  function updateName(id: number, name: string,slug:string) {
    Dialog.create({
      cancel: 'Annuler',
      ok: 'Enregistrer',
      title: 'Mise à jour',
      dark: true,

      component: UpdateCategory,
      componentProps: {
        name,
        slug
      }

    }).onOk((data) => {
      void mutate({ input: { id, ...data} })
    });
  }



  return {
    loading,
    updateCategory,
    updateName,

  };
};
