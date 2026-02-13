import { useState, useEffect, useMemo } from "react";
import { X, Plus, Package } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { PostProducts } from "../Hooks/useProducts";
import { closeProductModal} from "../Features/productSlice";
import { validateForm } from "../Handlers/OpeningProductStockHandler";

const OpeningProductStockModel = () => {
  const dispatch = useDispatch();

  const { mutateAsync: saveProduct, isPending: isSavePending } = PostProducts();

  const product = useSelector((state) => state.products.selectedProduct);
  const productId = useSelector((state) => state.products.selectedProductId);

  const onClose = () => {
    dispatch(closeProductModal());
  }

  const [formData, setFormData] = useState({
    qty: "",
    purchasePrice: 0,
    salesPrice: 0
  });

  const clearForm = () => {
    setFormData({
      qty: "",
      purchasePrice: 0,
      salesPrice: 0,
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (validateForm(formData,setErrors)) return;
    console.log("validation passed");
    
      if (!productId){
        saveProduct({product : product, stock : formData}, {
        onSuccess: () => {
          clearForm();
        },
        onError: (error) => {
          console.log("SERVER ERROR:", error.response?.data);
        },
      });
    }
    if(productId){
      saveProduct({product : null, stock : formData,productId : productId}, {
        onSuccess: () => {
          clearForm();
        },
        onError: (error) => {
          console.log("SERVER ERROR:", error.response?.data);
        },
      });
    }
  }

  const round2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

  const totalAmount = useMemo(() => {
    return round2(formData.qty * formData.purchasePrice);
  }, [formData.qty, formData.purchasePrice]);

  const handleChange = (field, value) => {

  setFormData((prev) => ({
    ...prev,
    [field]: value === "" ? 0 : Number(value),
  }));
    
  if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center mt-5 z-50">
      <div className="bg-gradient-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Opening Stock
          </h2>
          <button
            // onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-all duration-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Barcode and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
          <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Qty *
              </label>
              <input
                type="number"
                value={formData.qty}
                step = "1"
                onChange={(e) => handleChange("qty", parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground ${
                  errors.qty ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.qty && (
                <p className="text-destructive text-sm mt-1">{errors.qty}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Purchased Price *
              </label>
              <input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) =>
                  handleChange("purchasePrice", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground ${
                  errors.purchasePrice ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.purchasePrice && (
                <p className="text-destructive text-sm mt-1">
                  {errors.purchasePrice}
                </p>
              )}
            </div>

              <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sales Price *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.salesPrice}
                onChange={(e) => handleChange("salesPrice", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground ${
                  errors.salesPrice ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.salesPrice && (
                <p className="text-destructive text-sm mt-1">{errors.salesPrice}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Total Amount *
              </label>
              <input
                type="number"
                step="0.01"
                value={totalAmount}
                disabled
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground font-bold ${
                  errors.totalAmount ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.totalAmount && (
                <p className="text-destructive text-sm mt-1">
                  {errors.totalAmount}
                </p>
              )}
            </div>

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
              {product
                ? "Add Product & Stock"
                : "Add Stock"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpeningProductStockModel;
