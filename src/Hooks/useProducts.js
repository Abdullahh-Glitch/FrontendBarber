import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProducts,getProductCategories, postProducts, updateProducts,postProductCategory } from '../Apis/productApi';

export const GetProducts = ()=>{
    return useQuery({
        queryKey : ['products/g/p'],
        queryFn : getProducts,
        staleTime : 1000 * 60 * 5
    })
}

export const GetProductCategories = ()=>{
    return useQuery({
        queryKey : ['products/c'],
        queryFn : getProductCategories,
        staleTime : 1000 * 60 * 5
    })
}

export const  PostProducts = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : postProducts,
        onSuccess : ()=>{
            queryClient.invalidateQueries(['products/g/p'])
        }
    })
}

export const UpdateProducts =()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({productId,product})=>updateProducts(productId,product),
        onSuccess:()=>{
            queryClient.invalidateQueries(['products/g/p'])
        }
    })
}

export const PostProductCategory = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : postProductCategory,
        onSuccess:()=>{
            queryClient.invalidateQueries(['products/c'])
        }
    })
}