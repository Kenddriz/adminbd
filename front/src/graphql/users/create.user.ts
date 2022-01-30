import {useMutation} from '@vue/apollo-composable';
import {CreateUserInput, MutationCreateUserArgs, User} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {USER_FIELDS} from 'src/graphql/users/user.sdl';
import {reactive, ref} from 'vue';
import {Notify} from 'quasar';

type CreateUserData = {
  createUser: User;
}
const CREATE_USER = gql`
    mutation CreateUser($image: Upload, $input: CreateUserInput!){
      createUser(image: $image, input: $input ){
        ${USER_FIELDS}
      }
    }
`;
export const useCreateUser = () => {
  const input = reactive<CreateUserInput>({
    name: '',
    username: '',
  });
  const image = ref<File|null>(null);
  function setImage(img: any) {
    delete  img.__status;
    delete img.__uploaded;
    delete img.__progress;
    delete img.__sizeLabel;
    delete img.__progressLabel;
    delete img.__img;
    image.value = img;
  }
  const  confirm = ref('');
  const { loading, mutate, onDone } = useMutation<CreateUserData, MutationCreateUserArgs>(CREATE_USER, {
    context: { hasUpload: true },
    update: (cache, { data }) => {
      if(data?.createUser) {
        cache.modify({
          fields: {
            users(existingRef: any, { toReference }) {
              return [toReference(data.createUser), ...existingRef]
            }
          }
        })
      }
    }
  });
  onDone(({ data }) => {
    if(data?.createUser) {
      Notify.create({
        message: 'Utilisateur crée avec succès',
        color: 'positive',
      })
    } else {
      Notify.create({
        message: 'Nom d\'utilisateur existe',
        color: 'negative',
      })
    }
  })
  function createUser() {
    void mutate({ image: image.value, input });
  }
  function reset() {
    input.username = '';
    input.name = '';
  }
  return { loading, input, createUser,confirm, image, reset, setImage  }
}
