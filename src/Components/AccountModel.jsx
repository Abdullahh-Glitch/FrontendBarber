import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {CreateAccount, UpdateAccount} from "../Hooks/useAccounts";
import { useSelector, useDispatch } from "react-redux";
import { closeAccountModal} from "../Features/accountSlice";
import { validateForm } from "../Handlers/accountHandler";

const ProductModal = () => {
  const dispatch = useDispatch();
  const { mutateAsync: saveAccount, isPending: isSavePending } = CreateAccount();
  const { mutateAsync: editAccount, isPending: isEditPending } = UpdateAccount();


  const account = useSelector((state) => state.accounts.selectedAccount);
  const isEdit = (account !== null);
  
  const onClose = () => {
    dispatch(closeAccountModal());
  }

  const [formData, setFormData] = useState({
    name: "",
    categoryId: 0,
    mobileNo: "",
    phoneNo: "",
    openingBalance: "0.00",
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [id, setId] = useState(0);

  const clearForm = () => {
    setId(0);
    setFormData({
    name: "",
    categoryId: 0,
    mobileNo: "",
    phoneNo: "",
    openingBalance: "0.00",
    isActive: true,
    });
  };

  useEffect(() => {
    if (account) {
      setId(account.id);
    setFormData({
      name: account.name || "",
      categoryId: account.categoryId || 0,
      mobileNo: account.mobileNo || "",
      phoneNo: account.phoneNo || "",
      openingBalance: String(account.openingBalance) || "",
      isActive: account.isActive ?? false,
      });
    }
  }, [account]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData,setErrors)) return;

    console.log("validation passed");
    

    if (!isEdit) {
      saveAccount(formData, {
        onSuccess: () => {
          clearForm();
        },
        onError: (error) => {
          console.log("SERVER ERROR:", error.response?.data);
        },
      });
    }
    if (isEdit) {
      console.log(id);
      
        editAccount({ accountId: id, account: formData },{
          onSuccess : ()=> onClose(),
          onError: (error) => {console.log("SERVER ERROR:", error.response?.data);}
        });
    };
  }

  const handleChange = (field, value) => {

    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
    
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = () =>{
    if (formData.openingBalance !== "") {
    setFormData((prev) => ({
      ...prev,
      openingBalance: Number(prev.openingBalance).toFixed(2)
    }));
  }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center mt-5 z-50">
      <div className="bg-gradient-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {isEdit ? "Edit Account" : "Add New Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-all duration-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl bg-card text-foreground transition-all duration-200 ${
                  errors.name
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-border focus:ring-primary/20"
                } focus:outline-none focus:ring-2 focus:border-primary`}
                placeholder="Enter Product Name"
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1 text-red-700 font-bold">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <label className="block text-sm font-medium text-foreground ">
              Category *
            </label>
            <div className="flex gap-1">
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  handleChange("categoryId", Number(e.target.value))
                }
                className={`flex-1 px-3 py-2 border bg-white/50 text-black rounded-lg bg-background text-foreground ${
                  errors.categoryId ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              >
                <option value={0}>Select Category</option>
                <option value={2} className="bg-black/30">
                  Supplier
                </option>
                <option value={3} className="bg-black/30">
                  Customer
                </option>
              </select>
            </div>
            {errors.categoryId && (
              <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                {errors.categoryId}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mobile Number *
              </label>
              <input
                type="text"
                value={formData.mobileNo}
                onChange={(e) => handleChange("mobileNo", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono ${
                  errors.sku ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Enter Mobile Number"
              />
              {errors.mobileNo && (
                <p className="text-destructive text-sm mt-1 text-red-700 font-bold">{errors.mobileNo}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <input
                type="text"
                value={formData.phoneNo}
                onChange={(e) => handleChange("phoneNo", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground ${
                  errors.unit ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Enter Phone Number"
              />
              {errors.phoneNo && (
                <p className="text-destructive text-sm mt-1 text-red-700 font-bold">{errors.phoneNo}</p>
              )}
            </div>
          </div>

          {/* Current Balance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Opening Balance *
              </label>
              <input
                type="text"
                value={formData.openingBalance}
                onBlur={handleBlur}
                placeholder="0.00"
                onChange={(e) =>
                  handleChange("openingBalance", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground ${
                  errors.currentBalance ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.openingBalance && (
                <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                  {errors.openingBalance}
                </p>
              )}
            </div>

            {/* Is Active */}
            <div className="flex items-end-safe justify-end gap-3 pr-2 pb-3">
                <label
                htmlFor="isActive"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Is Active
              </label>
              <input
                id="isActive"
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
                checked={!!formData.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
              />
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
              disabled={isSavePending || isEditPending}
              className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium cursor-pointer"
            >
              {isSavePending
                ? "Saving..."
                : isEditPending
                ? "Updating..."
                : isEdit
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
