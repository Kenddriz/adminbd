import {useMutation} from '@vue/apollo-composable';
import { gql } from '@apollo/client';
import {EMPLOYEE_FIELDS} from 'src/graphql/employee/employee';
import {SERVICE_FIELDS} from 'src/graphql/service/service.sdl';
import {
  Employe,
  MutationUpdateEmployeeArgs,
  UpdateEmployeInput
} from 'src/graphql/types';
import {Notify} from 'quasar';

type UpdateEmployeeData = {
  updateEmployee: Employe;
}
const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployee($input:UpdateEmployeInput!){
      updateEmployee(input: $input){
        ${EMPLOYEE_FIELDS}
        service{${SERVICE_FIELDS}}
      }
    }
`;
export const useUpdateEmployee = (callback: () => void) => {
  const { loading: updateLoading, mutate, onDone } = useMutation<
    UpdateEmployeeData,
    MutationUpdateEmployeeArgs
    >(UPDATE_EMPLOYEE);
  onDone(({ data }) => {
    if(data?.updateEmployee) {
      Notify.create({
        message: 'L\'employé mis à jour avec succès',
        color: 'teal',
      });
      callback();
    } else {
      Notify.create({
        message: 'Echec de modification de l\'employé.Réessayez plus tard',
        color: 'red',
      })
    }
  })
  function updateEmployee(input: UpdateEmployeInput) {
    void mutate({ input });
  }
  return {
    updateEmployee,
    updateLoading
  }
}
