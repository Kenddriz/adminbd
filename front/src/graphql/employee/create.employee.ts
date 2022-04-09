import {useMutation} from '@vue/apollo-composable';
import { gql } from '@apollo/client';
import {EMPLOYEE_FIELDS} from 'src/graphql/employee/employee';
import {SERVICE_FIELDS} from 'src/graphql/service/service.sdl';
import {CreateEmployeInput, Employe, MutationCreateEmployeeArgs} from 'src/graphql/types';
import {Notify} from 'quasar';

type CreateEmployeeData = {
  createEmployee: Employe;
}
const CREATE_EMPLOYEE = gql`
    mutation CreateEmployee($input:CreateEmployeInput!){
      createEmployee(input: $input){
        ${EMPLOYEE_FIELDS}
        service{${SERVICE_FIELDS}}
      }
    }
`;
export const useCreateEmployee = (callback: () => void) => {
  const { loading: createLoading, mutate, onDone } = useMutation<
    CreateEmployeeData,
    MutationCreateEmployeeArgs
    >(CREATE_EMPLOYEE, {
    update: (caches, { data }) => {
      if (data?.createEmployee) {
        caches.modify({
          fields: {
            employees(existingRef: any[], { toReference }) {
              return [toReference(data.createEmployee), ...existingRef]
            }
          }
        })
      }
    }
  });
  onDone(({ data }) => {
    if(data?.createEmployee) {
      Notify.create({
        message: 'Employé crée avec succès',
        color: 'teal',
      });
      callback();
    } else {
      Notify.create({
        message: 'Echec de création de l\'employé.Réessayez plus tard',
        color: 'red',
      })
    }
  })
  function createEmployee(input: CreateEmployeInput) {
    void mutate({ input });
  }
  return {
    createEmployee,
    createLoading
  }
}
