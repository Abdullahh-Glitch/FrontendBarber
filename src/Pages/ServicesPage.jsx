import React, { useEffect, useState } from "react";
import { Plus, Search, Filter} from "lucide-react";
import { GetServices } from "../Hooks/useServices";
import { useSelector, useDispatch } from "react-redux";
import {openServiceModal}from "../Features/serviceSlice";
import ProductTable from "../Components/ProductTable";
import ServiceModel from "../Components/ServiceModel";
import ServiceProductModel from "../Components/ServiceProductModel"
import ConfirmDialog from "../Components/ConfirmDialog";

export default function ServicesPage() {
  const dispatch = useDispatch();

  const{ data: serviceData, isLoading: serviceIsLoading, isError: serviceIsError, error: serviceError} =GetServices();


  const [searchTerm, setSearchTerm] = useState("");
  const serviceModelState = useSelector((state) => state.services.isServiceModal);
  const confirmDialog = useSelector((state) => state.services.isConfirmDialog);
  const [filteredProducts, setFilteredProducts] = useState(serviceData || []);

  useEffect(() => {
  setFilteredProducts(serviceData || []);
}, [serviceData]);

  const handdleSearch=(e)=>{
    const term = e.target.value;
    setSearchTerm(term);
    console.log(filteredProducts);
    

    const results = (serviceData || []).filter((service) => {
    const name = service?.name?.toLowerCase() || "";
    return name.startsWith(term.toLowerCase().trim());
  });

  setFilteredProducts(results);
  }

const handdleOpenNewServiceModal=()=>{
  // dispatch(openServiceFlow());
  dispatch(openServiceModal());
}



  if(serviceIsLoading) return <h1>Loading Services....</h1>

  if(serviceIsError) return <h1>Services Error : {serviceError.message}</h1>

  return (
    <div className="fixed w-full h-full bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] flex flex-col items-center justify-center">
      <div className="h-[25%] w-full flex items-center justify-center">
        <div className="w-[90%] h-[60%] bg-gradient-to-r from-[var(--secondary-from)] to-[var(--to-color)] border border-[var(--border-color)] rounded-[30px] flex flex-col justify-center shadow-[var(--shadow-color)] text-[var(--text-color)]">
          <h1 className="pl-10 text-2xl font-bold text-foreground">Services</h1>
          <p className="pl-10 text-muted-foreground">
            Manage your barber shop Services
          </p>
        </div>
      </div>
      {/* main */}
      <div>{serviceModelState && <ServiceProductModel />}</div>
      <div>{confirmDialog && (<ConfirmDialog />)}</div>
      <div className="h-[75%] w-full flex justify-center text-[var(--text-color)]">
        <div className="w-[98%] h-[100%] flex flex-col border border-[var(--border-color)] rounded-[30px] bg-gradient-to-r from-[var(--secondary-from)] to-[var(--secondary-to)] shadow-[var(--shadow-color)] p-6">

          <div className="flex flex-col sm:flex-row gap-4 w-[100%]">

            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search Service by name..."
                value={searchTerm}
                onChange={handdleSearch}
                className="w-[100%] pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm transition-all duration-200"
              />
            </div>
            
            <div className="flex gap-2">

              <button className="px-6 py-3 border border-border rounded-xl text-foreground hover:bg-secondary hover:border-secondary transition-all duration-200 flex items-center gap-2 font-medium">
                <Filter className="h-4 w-4" />
                Filter
              </button>

              <button
                onClick={handdleOpenNewServiceModal}
                className="px-6 py-3 bg-gradient-primary border text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Service
              </button>

            </div>

          </div>
          <div className="mt-4 h-[70%] overflow-y-auto">
            <ProductTable products={[]} categories={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
