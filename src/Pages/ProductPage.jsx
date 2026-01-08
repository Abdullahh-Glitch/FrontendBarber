import React, { useEffect, useState } from "react";
import { Plus, Search, Filter} from "lucide-react";
import { GetProducts,GetProductCategories,DeleteProduct } from "../Hooks/useProducts";
import { useSelector, useDispatch } from "react-redux";
import { openProductModal, closeConfirmDialog } from "../Features/productSlice";
import ProductTable from "../Components/ProductTable";
import ProductModal from "../Components/ProductModal";
import ConfirmDialog from "../Components/ConfirmDialog";

export default function ProductPage() {
  const dispatch = useDispatch();

  const{ data: productData, isLoading: productIsLoading, isError: productIsError, error: productError} =GetProducts();
  const { data: categories, isLoading: categoriesLoading, isError: categoriesIsError, error: categoriesError} = GetProductCategories();
  const{mutate: softDelete, isPending: deletePending}  = DeleteProduct();


  const [searchTerm, setSearchTerm] = useState("");
  const prdId = useSelector((state)=>state.products.selectedProductId);
  const productModelState = useSelector((state) => state.products.isProductModal);
  const confirmDialog = useSelector((state) => state.products.isConfirmDialog);
  const [filteredProducts, setFilteredProducts] = useState(productData || []);

  useEffect(() => {
  setFilteredProducts(productData || []);
}, [productData]);

  const handdleSearch=(e)=>{
    const term = e.target.value;
    setSearchTerm(term);

    const results = (productData || []).filter((product) => {
    const name = product?.name?.toLowerCase() || "";
    return name.startsWith(term.toLowerCase().trim());
  });

  setFilteredProducts(results);
  }

const handdleOpenNewProductModal=()=>{
  dispatch(openProductModal());
}

const onConfirm = async()=>{
    if(!prdId) dispatch(closeConfirmDialog());

    softDelete(prdId,{
        onSuccess : ()=>{
          dispatch(closeConfirmDialog());
        },
        onError : (error)=>{
          console.log(error.message);
        }
      });
  }

const onCancel = () => {
    dispatch(closeConfirmDialog());
  }

  if(categoriesIsError) return <h1>Category Error : {categoriesError.message}</h1>
  if(productIsError) return <h1>Products Error : {productError.message}</h1>

  return (
    <div className="fixed w-full h-full bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-white flex flex-col items-center justify-center">
      <div className="h-[30%] w-full flex items-center justify-center">
        <div className="w-[90%] h-[60%] bg-gradient-to-r from-[var(--secondary-from)] to-[var(--secondary-to)] border border-[var(--border-color)] rounded-[30px] flex flex-col justify-center shadow-[var(--shadow-color)] text-[var(--text-color)]">
          <h1 className="pl-10 text-2xl font-bold text-foreground">PRODUCTS</h1>
          <p className="pl-10 text-muted-foreground">
            Manage your barber shop inventory and products
          </p>
        </div>
      </div>
      {/* main */}
      <div>{productModelState && (<ProductModal categories={categories}/>)}</div>
      <div>{confirmDialog && (<ConfirmDialog onConfirm={()=>onConfirm()} onCancel={()=>onCancel()} isPending={deletePending} />)}</div>
      <div className="h-[75%] w-full flex justify-center text-[var(--text-color)]">
        <div className="w-[98%] h-[100%] flex flex-col border border-[var(--border-color)] rounded-[30px] bg-gradient-to-b from-[var(--main--from)] to-[var(--main--to)] shadow-[var(--shadow-color)] p-6">

          <div className="flex flex-col sm:flex-row gap-4 w-[100%]">

            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search Service by name..."
                value={searchTerm}
                onChange={handdleSearch}
                className="w-[100%] pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground placeholder-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm transition-all duration-200"
              />
            </div>
            
            <div className="flex gap-2">

              <button className="px-6 py-3 border border-border rounded-xl text-foreground hover:bg-secondary hover:border-secondary transition-all duration-200 flex items-center gap-2 font-medium">
                <Filter className="h-4 w-4" />
                Filter
              </button>

              <button
                onClick={handdleOpenNewProductModal}
                className="px-6 py-3 bg-gradient-primary border text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>

            </div>

          </div>
          <div className="mt-4 h-[70%] overflow-y-auto">
            <ProductTable products={filteredProducts} categories={categories} isLoading={productIsLoading && categoriesLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
