import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { getBankAccounts, createBankAccount } from '../Apis/bankAccountApi';

export const GetBankAccounts = ()=>{
    return useQuery({
        queryKey : ['bank-accounts/g/ba'],
        queryFn : getBankAccounts,
        staleTime : 1000 * 60 * 5
    })
}
export const  CreateBankAccount = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : createBankAccount,
        onSuccess : ()=>{
            queryClient.invalidateQueries(['bank-accounts/g/ba'])
        }
    })
}