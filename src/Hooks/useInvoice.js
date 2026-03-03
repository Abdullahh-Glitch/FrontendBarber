import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { createInvoice } from '../Apis/invoiceApi';

export const  CreateInvoice = ()=>{
    // const queryClient = useQueryClient();
    return useMutation({
        mutationFn : createInvoice,
        // onSuccess : ()=>{
            // queryClient.invalidateQueries(['invoices/g/a'])
        // }
    })
}