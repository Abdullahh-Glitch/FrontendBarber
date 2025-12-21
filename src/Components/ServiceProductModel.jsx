import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { GetProducts} from "../Hooks/useProducts";
import { useSelector, useDispatch } from "react-redux";
import { closeServiceModal} from "../Features/serviceSlice";
import ProductTable from "./ProductTable";

const ServiceProductModel = () => {
  const dispatch = useDispatch();
  
const{ data: productData} =GetProducts();

  const [name,setName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [got,setGot] = useState(false);
  const[selectedProducts,setSelectedProducts] = useState([{}])
  const service = useSelector((state) => state.services.selectedService);
  const isEdit = (service !== null);

  const onClose = () => {
    dispatch(closeServiceModal());
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
  }

 const handleChange = (e) => {
  const term = e.target.value;
  setName(term);

  if (!term.trim()) {
    setFilteredData([]);
    return;
  }

  const results = productData.filter(product => {
    const pname = (product?.name?.toLowerCase() || "");
    return pname.startsWith(term.toLowerCase().trim());
  });

  setFilteredData(results);
  setGot(false);
};

  return (
    <div className="fixed inset-0 bg-black/60 text-white backdrop-blur-sm flex items-center justify-center mt-5 z-50">
      <div className="bg-gradient-card rounded-2xl max-w-2xl w-full max-h-[80vh] thin-scrollbar overflow-y-auto shadow-xl border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {isEdit ? "Edit Service Products" : "Add New Service Products"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-all duration-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-foreground mb-2">
              Search Product Name:
            </label>

            <input
              type="text"
              value={name}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 border rounded-xl bg-card text-foreground focus:outline-none focus:ring-2"
              placeholder="Enter Product Name"
            />

            {name && (
              <button
                type="button"
                onClick={() => {
                  setName("");
                  setFilteredData([]);
                }}
                className="absolute right-3 top-[42px] text-muted-foreground hover:text-foreground"
              >
                ✖
              </button>
            )}

            {name.trim() &&
              (filteredData.length > 0 ? (
                <ul className="absolute z-10 w-full mt-2 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
                  {filteredData.map((product) => (
                    <li
                      key={product.id}
                      className="px-4 py-2 cursor-pointer hover:bg-muted"
                      onClick={() => {
                        setSelectedProducts((prev) => ({...prev, id : product.id, name : product.name}));
                        setFilteredData([]);
                        setGot(true);
                      }}
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              ) : !got? (
                <ul className="absolute z-10 w-full mt-2 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
                  <li className="px-4 py-2 cursor-pointer hover:bg-muted">
                    No Records Found
                  </li>
                </ul>
              ): "")}

          </div>

          {/* separation */}
          <div className="grid grid-cols-1 md:grid-cols-1">
            {/* <ProductTable products={selectedProducts} categories={[]} /> */}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-border text-foreground rounded-xl hover:bg-secondary transition-all duration-200 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              // disabled={isSavePending || isEditPending}
              className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium cursor-pointer"
            >
              {/* {isSavePending
                ? "Saving..."
                : isEditPending
                ? "Updating..."
                : isEdit
                ? "Update Service"
                : "Add Service"} */}
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceProductModel;
