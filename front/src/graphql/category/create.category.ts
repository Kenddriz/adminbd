import {useMutation} from '@vue/apollo-composable';
import {Category, CreateCategoryInput, MutationCreateCategoryArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {CATEGORY_FIELDS} from 'src/graphql/category/category.sdl';
import {reactive, ref} from 'vue';
import {Notify} from 'quasar';

type CreateCategoryData = {
  createCategory: Category;
}
// Here is we are declaring graphql from back
const CREATE_CATEGORY = gql`
    mutation CreateCategory( $input: CreateCategoryInput!){
      createCategory(input: $input ){
        ${CATEGORY_FIELDS}
      }
    }
`;

// Now are using mutation for creating new data

export const useCreateCategory = () => {
  // Now we use reactive
  const input = reactive<CreateCategoryInput>({
    name: '',
    slug: '',
  });
  const  confirm = ref('');
  const { loading, mutate, onDone } = useMutation<CreateCategoryData, MutationCreateCategoryArgs>(CREATE_CATEGORY, {
    // So now we are update cache because it is useful when we add some data
    update: (cache, { data }) => {
      if(data?.createCategory) {
        cache.modify({
          fields: {
            category(existingRef: any, { toReference }) {
              return [toReference(data.createCategory), ...existingRef]
            }
          }
        })
      }
    }
  });

  onDone(({ data }) => {
    if(data?.createCategory) {
      Notify.create({
        message: 'Category crée avec succès',
        color: 'positive',
      })
    } else {
      Notify.create({
        message: 'Nom de category existe',
        color: 'negative',
      })
    }
  })

  function createCategory() {
    void mutate({  input });
  }
  function reset() {
    input.name = '';
    input.slug = '';
  }
  return { loading, input, createCategory,confirm, reset  }
}
