import {useQuery, useResult} from '@vue/apollo-composable';
import {gql} from '@apollo/client';
import {SYNTHESE_FIELDS}  from 'src/graphql/Synthese/synthese.sdl';
import { Synthese } from  '../types';

type SynthesesData = {
  syntheses: Synthese[];
}
const SYNTHESES = gql`
    query Synthese{
      syntheses {
        ${SYNTHESE_FIELDS}
        }
    }
`;
const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    sortable: true
  },
  {
    name: 'intitule',
    required: true,
    label: 'intitule',
    align: 'left',
    field: 'intitule',
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
    field: 'somSalaire',
    sortable: true
  },
  {
    name: 'nombreSalDef',
    align: 'center',
    field: 'nombreSalDef',
    sortable: true,
    required: true,
  }
];
export const useSyntheses = () => {

  const { loading, result } = useQuery<SynthesesData>(SYNTHESES, {}, { fetchPolicy: 'network-only' });
  const syntheses = useResult<SynthesesData | undefined, Synthese[], Synthese[]>(result, [], res => res.syntheses);
  return {
    loading,
    syntheses,
    columns,
  }
}
