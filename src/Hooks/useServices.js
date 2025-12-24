import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import{ getService, getServiceForTable, postService, updateService, deleteService } from '../Apis/serviceApi';

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