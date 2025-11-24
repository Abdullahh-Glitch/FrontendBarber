import React, { useState } from "react";
import { Plus, Search, Filter, Package } from "lucide-react";
import { GetProducts,GetProductCategories } from "../Hooks/useProducts";
import ProductTable from "../Components/ProductTable";
import ProductModal from "../Components/ProductModal";

export default function ProductPage() {

  const[productModel,setProductModel] =useState(false);
  const[edit,setEdit] = useState(false);
  const[selectedProduct,setSelectedProduct] = useState({});

  const{ 
    data: products,
    isLoading: productIsLoading, 
    isError: productIsError, 
    error: productError
  } =GetProducts();

  const { 
  data: categories, 
  isLoading: categoriesLoading, 
  isError: categoriesIsError, 
  error: categoriesError 
} = GetProductCategories();



  if(productIsLoading) return <h1>Loading Products....</h1>
  if(categoriesLoading) return <h1>Loading Category....</h1>

  if(categoriesIsError) return <h1>Category Error : {categoriesError.message}</h1>
  if(productIsError) return <h1>Products Error : {productError.message}</h1>

  return (
    <div className="fixed w-full h-full bg-black/90 text-white flex flex-col items-center justify-center">
      <div className="h-[30%] w-full flex items-center justify-center">
        <div className="w-[90%] h-[60%] border rounded-[30px] flex flex-col justify-center">
          <h1 className="pl-10 text-2xl font-bold text-foreground">PRODUCTS</h1>
          <p className="pl-10 text-muted-foreground">
            Manage your barber shop inventory and products
          </p>
        </div>
      </div>
      {/* main */}
      <div>{productModel && (<ProductModal categories={categories} product={selectedProduct}setEdit={setEdit} onClose={() => {setProductModel(false);setSelectedProduct({})}} isEdit={edit} />)}</div>
      <div className="h-[70%] w-full flex justify-center ">
        <div className="w-[90%] h-[100%] flex flex-col">

          <div className="flex flex-col sm:flex-row gap-4 w-[100%]">

            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search products by name, brand, or barcode..."
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[100%] pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm transition-all duration-200"
              />
            </div>
            
            <div className="flex gap-2">

              <button className="px-6 py-3 border border-border rounded-xl text-foreground hover:bg-secondary hover:border-secondary transition-all duration-200 flex items-center gap-2 font-medium">
                <Filter className="h-4 w-4" />
                Filter
              </button>

              <button
                onClick={()=>{setProductModel(true); setEdit(false);setSelectedProduct({})}}
                className="px-6 py-3 bg-gradient-primary border text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>

            </div>

          </div>
          <div className="mt-4 h-[70%] overflow-auto">
            <ProductTable products={products} categories={categories} productModel={setProductModel} isEdit={setEdit} setSelectedProduct={setSelectedProduct} onDelete={()=>console.log("Deleted")}/>
          </div>
        </div>
      </div>
    </div>
  );
}
