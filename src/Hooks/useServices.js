import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import{ getService, getServiceForTable, CheckName, postService, updateService, deleteService, getServiceProductsByServiceId, updateServiceandProducts } from '../Apis/serviceApi';

export const GetServices = ()=>{
    return useQuery({
        queryKey : ['service/s'],
        queryFn : getService,
        staleTime : 1000 * 60 * 5
    })
}

export const GetServicesForTable = ()=>{
    return useQuery({
        queryKey : ['service/s/ft'],
        queryFn : getServiceForTable,
        staleTime : 1000 * 60 * 5
    })
}

export const CheckServiceName = (name) => {
  return useQuery({
    queryKey: ['service/s/n', name],
    queryFn: () => CheckName(name),
    enabled: false,
    retry: false,
  });
};

export const  PostServices = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : postService,
        onSuccess : ()=>{
            queryClient.invalidateQueries(['service/s/ft'])
        }
    })
}

export const UpdateServices =()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({serviceId,service})=>updateService(serviceId,service),
        onSuccess:()=>{
            queryClient.invalidateQueries(['service/s/ft'])
        }
    })
}

export const DeleteService = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (serviceId)=>deleteService(serviceId),
        onSuccess:()=>{
            queryClient.invalidateQueries(['service/s/ft'])
        }
    })
}

export const GetServiceProductsByServiceId = (serviceId, options = {}) => {
  return useQuery({
    queryKey: ['service/s/p', serviceId],
    queryFn: () => getServiceProductsByServiceId(serviceId),
    enabled: !!serviceId,   // 🔑 only fetch in edit mode
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const UpdateServiceAndProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, service, products }) => updateServiceandProducts({ serviceId, service, products }),
    onSuccess: () => {
      queryClient.invalidateQueries(['service/s/ft']);
    },
  });
};