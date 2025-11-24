import { PostProducts } from "../Hooks/useProducts";

export const onSave = ()=>{
    const {mutateAsync : saveProduct, isPending} = PostProducts();
}