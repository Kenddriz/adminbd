import {useMutation} from '@vue/apollo-composable';
import {Synthese, CreateSyntheseInput, MutationCreateSyntheseArgs} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {SYNTHESE_FIELDS} from 'src/graphql/Synthese/synthese.sdl';
import {reactive, ref} from 'vue';
import {Notify} from 'quasar';

type CreateSyntheseData = {
  createSynthese: Synthese;
}
// Here is we are declaring graphql from back
const CREATE_SYNTHESE = gql`
    mutation CreateSynthese( $input: CreateSyntheseInput!){
      createSynthese(input: $input ){
        ${SYNTHESE_FIELDS}
      }
    }
`;

// Now are using mutation for creating new data

export const useCreateSynthese = () => {
  // Now we use reactive
  const input = reactive<CreateSyntheseInput>({
    intitule: '',
    effectif: 0 ,
    somSalaire: 0 ,
    nombreSalDef: 0 ,
  });

  const  confirm = ref('');
  const { loading, mutate, onDone } = useMutation<CreateSyntheseData, MutationCreateSyntheseArgs>(CREATE_SYNTHESE, {
    // So now we are update cache because it is useful when we add some data
    update: (cache, { data }) => {
      if(data?.createSynthese) {
        cache.modify({
          fields: {
            syntheses(existingRef: any, { toReference }) {
              return [toReference(data.createSynthese), ...existingRef]
            }
          }
        })
      }
    }
  });

  onDone(({ data }) => {
    if(data?.createSynthese) {
      Notify.create({
        message: 'Synthese crée avec succès',
        color: 'positive',
      })
    } else {
      Notify.create({
        message: 'Nom de synthese existe',
        color: 'negative',
      })
    }
  })

  function createSynthese() {
    void mutate( {input} );
    // console.log(input);
  }

  function reset() {
    input.intitule,
    input.effectif,
    input.somSalaire,
    input.nombreSalDef

  }

  return {loading,input,createSynthese,confirm,reset}
}
