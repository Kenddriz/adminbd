import {Employe} from 'src/graphql/types';
import { gql } from '@apollo/client';
import {EMPLOYEE_FIELDS} from 'src/graphql/employee/employee';
import {SERVICE_FIELDS} from 'src/graphql/service/service.sdl';
import {useLazyQuery, useResult} from '@vue/apollo-composable';

type EmployeesData = {
  employees: Employe[];
}

const EMPLOYEES = gql`
    query Emplyees {
      employees {
        ${EMPLOYEE_FIELDS}
        service{${SERVICE_FIELDS}}
      }
    }
`;

export const useEmployees = () => {
  const { loading: loadEmployees, result, load } = useLazyQuery<EmployeesData>(EMPLOYEES);
  const employees = useResult<EmployeesData|undefined, Employe[], Employe[]>(result, [], res => res.employees);
  function loadData() {
    void load(EMPLOYEES);
  }
  return {
    loadEmployees,
    employees,
    loadData
  }
}
