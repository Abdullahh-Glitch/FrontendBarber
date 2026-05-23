import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { createInvoice, createSalesInvoice } from '../Apis/invoiceApi';
import { data } from 'react-router-dom';

export const  CreateInvoice = ()=>{
    // const queryClient = useQueryClient();
    return useMutation({
        mutationFn : createInvoice,
        // onSuccess : ()=>{
            // queryClient.invalidateQueries(['invoices/g/a'])
        // }
    })
}

export const CreateSalesInvoice = () => {
    // const queryClient = useQueryClient();
    return useMutation({
        mutationFn : createSalesInvoice,
        // onSuccess : ()=>{
            // queryClient.invalidateQueries(['invoices/g/a'])
        // }
    })
}