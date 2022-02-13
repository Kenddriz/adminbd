import {Service} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {SERVICE_FIELDS} from 'src/graphql/service/service.sdl';
import {useQuery, useResult} from '@vue/apollo-composable';

type ServicesData = {
  services: Service[];
}

const SERVICES = gql`
    query Services {
      services {
        ${SERVICE_FIELDS}
      }
    }
`;

export const useServices = () => {
  const { loading, result } = useQuery<ServicesData>(SERVICES);
  const services = useResult<
    ServicesData | undefined,
    Service[],
    Service[]
    >(result, [], res => res.services);
  return { services, loading }
}
