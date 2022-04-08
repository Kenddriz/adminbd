import {Audit} from 'src/graphql/types';
import {useLazyQuery, useResult} from '@vue/apollo-composable';
import {gql} from '@apollo/client';

type AuditsData = {
  audits: Audit[];
}

const AUDITS = gql`
    query Audits {
      audits {
        id
        quand
        qui
        quoi
        nouveauSalaire
        ancienSalaire
      }
    }
`;
const columns = [
  {
    name: 'quand',
    label: 'Quand',
    align: 'left',
    field: 'quand',
    sortable: true
  },
  {
    name: 'qui',
    label: 'Qui',
    align: 'left',
    field: 'qui',
    sortable: true
  },
  {
    name: 'quoi',
    label: 'Qoui',
    align: 'left',
    field: 'quoi',
    sortable: true
  },
  {
    name: 'ancienSalaire',
    required: true,
    label: 'Ancien salaire',
    align: 'center',
    field: 'ancienSalaire',
    sortable: true
  },
  {
    name: 'nouveauSalaire',
    align: 'center',
    field: 'nouveauSalaire',
    label: 'Nouveau salaire',
    sortable: true
  }
];
export const useAudits = () => {
  const { loading, result, load } = useLazyQuery<AuditsData>(AUDITS);
  const audits = useResult<AuditsData | undefined, Audit[], Audit[]>(result, [], res => res.audits);
  function loadData() {
    void load(AUDITS);
  }
  return {
    audits,
    columns,
    loading,
    loadData
  }
}
