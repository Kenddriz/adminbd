import {useQuery, useResult} from '@vue/apollo-composable';
import {gql} from '@apollo/client';
import {CATEGORY_FIELDS} from 'src/graphql/category/category.sdl';
import { Category } from '../types';

type CategoryData = {
  categories: Category[];
}

const CATEGORIES = gql`
    query Categories {
      categories {
          ${CATEGORY_FIELDS}
        }
    }
`;

export const useCategory = () => {
  const { loading, result, onError, onResult } = useQuery<CategoryData>(CATEGORIES);

  onError((error) => console.log(console.log(error)))
  onResult(({data}) => console.log(data))
  return {
    loading,
    category: useResult<CategoryData|undefined, Category[], Category[]>(result, [], res => res.categories),
    columns: [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: true
      },
      {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'center',
        field: 'name',
        sortable: true
      },

      {
        name: 'slug',
        label: 'Slug',
        align: 'right',
        field: 'slug',
        sortable: true
      }

    ]
  }
}
