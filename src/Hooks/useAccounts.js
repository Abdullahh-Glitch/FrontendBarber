import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { getAccounts, getSuppliersByName, getCustomersByName, getCustomersByPhone, createAccount, updateAccount, deleteAccount } from '../Apis/accountApi';

export const GetAccounts = ()=>{
    return useQuery({
        queryKey : ['accounts/g/a'],
        queryFn : getAccounts,
        staleTime : 1000 * 60 * 5
    })
}

export const  CreateAccount = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : createAccount,
        onSuccess : ()=>{
            queryClient.invalidateQueries(['accounts/g/a'])
        }
    })
}

export const GetSuppliersByName = (name)=>{
    return useQuery({
        queryKey : ['accounts/a/s',name],
        queryFn : ()=>getSuppliersByName(name),
        enabled : !!name
    })
}

export const GetCustomersByName = (name)=>{
    return useQuery({
        queryKey : ['accounts/a/c',name],
        queryFn : ()=>getCustomersByName(name),
        enabled : !!name
    })
}

export const GetCustomersByPhone = (phone)=>{
    return useQuery({
        queryKey : ['accounts/a/c',phone],
        queryFn : ()=>getCustomersByPhone(phone),
        enabled : !!phone
    })
}

export const  UpdateAccount = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : updateAccount,
        onSuccess : ()=>{
            queryClient.invalidateQueries(['accounts/g/a'])
        }
    })
}

export const  DeleteAccount = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : deleteAccount,
        onSuccess : ()=>{
            queryClient.invalidateQueries(['accounts/g/a'])
        }
    })
}