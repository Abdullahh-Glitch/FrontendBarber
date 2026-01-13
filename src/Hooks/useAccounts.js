import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { getAccounts, createAccount, updateAccount, deleteAccount } from '../Apis/accountApi';

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