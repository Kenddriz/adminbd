export const EMPLOYEE_FIELDS = `
 id
 nom
 role
 salaire
`;

export const columns = [
  {
    name: 'nom',
    label: 'Nom',
    field: 'nom',
    sortable: true,
  },
  {
    name: 'service',
    label: 'Service',
    sortable: true,
    field: (row: any) => row.service.intitule,
  },
  {
    name: 'salaire',
    label: 'Salaire',
    field: 'salaire',
    sortable: true,
  }
]
