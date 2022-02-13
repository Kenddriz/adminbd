import {useQuery, useResult} from '@vue/apollo-composable';
import {gql} from '@apollo/client';
import {SYNTHESE_FIELDS}  from 'src/graphql/Synthese/synthese.sdl';
import { Synthese } from  '../types';

type SyntheseData = {
  syntheses: Synthese[];
}
const SYNTHESE = gql`
    query Synthese{
      syntheses {
        ${SYNTHESE_FIELDS}
        }
    }
`;

export const useSynthese = () => {

  const { loading, result } = useQuery<SyntheseData>(SYNTHESE);

  return {
    loading,
    syntheses: useResult<SyntheseData | undefined, Synthese[], Synthese[]>(result, [], res => res.syntheses),

    columns: [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'text',
        sortable: true
      },
      {
        name: 'intitule',
        required: true,
        label: 'intitule',
        align: 'left',
        field: 'text',
        sortable: true
      },
      {
        name: 'effectif',
        required: true,
        label: 'effectif',
        align: 'left',
        field: 'text',
        sortable: true
      },
      {
        name: 'somSalaire',
        required: true,
        label: 'somSalaire',
        align: 'center',
        field: 'text',
        sortable: true
      },
      {
        name: 'nombreSalDef',
        align: 'center',
        field: 'text',
        sortable: true,
        required: true,
      }
    ]
  }
}
