import {useQuery, useResult} from '@vue/apollo-composable';
import {gql} from '@apollo/client';
import {USER_FIELDS} from 'src/graphql/users/user.sdl';
import { User } from '../types';

type UsersData = {
  users: User[];
}
const USERS = gql`
    query Users {
      users {${USER_FIELDS}}
    }
`;
export const useUsers = () => {
  const { loading, result } = useQuery<UsersData>(USERS);
  return {
    loading,
    users: useResult<UsersData|undefined, User[], User[]>(result, [], res => res.users),
    columns: [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: true
      },
      { name: 'avatar', align: 'center', field: 'avatar' },
      { name: 'name', align: 'center', field: 'name', sortable: true },
      { name: 'username', field: 'username', sortable: true },
    ]
  }
}
