import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { PostServices, UpdateServices } from "../Hooks/useServices";
import { useSelector, useDispatch } from "react-redux";
import { closeServiceModal} from "../Features/serviceSlice";
import { validateForm } from "../Handlers/serviceHandler";

const ServiceModel = () => {
  const dispatch = useDispatch();
  const { mutateAsync: saveService, isPending: isSavePending } = PostServices();
  const { mutateAsync: EditService, isPending: isEditPending } = UpdateServices();


  const service = useSelector((state) => state.services.selectedService);
  const isEdit = (service !== null);

  const onClose = () => {
    dispatch(closeServiceModal());
  }

  const [formData, setFormData] = useState({
    name: "",
    description:"",
    price:0,
    durationMinutes: 0,
    isActive: true,
  });

  const clearForm = () => {
    setId(0);
    setFormData({
        name: "",
        description:"",
        price:0,
        durationMinutes: 0,
        isActive: true,
    });
  };

  const [errors, setErrors] = useState({});
  const [id, setId] = useState(0);

  useEffect(() => {
    if (service) {
      setId(service.id);
    setFormData({
        name: service.name || "",
        description: service.description || "",
        price: service.price || 0,
        durationMinutes: service.durationMuntes || 0,
        isActive: service.isActive ?? true,
      });
    }
  }, [service]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    

    if (!validateForm(formData,setErrors)) return;
    console.log("passed validation");
    

    if (!service) {
      saveService(formData, {
        onSuccess: () => {
          clearForm();
        },
        onError: (error) => {
          console.log("SERVER ERROR:", error.response?.data);
        },
      });
    }
    if (service) {
        EditService({ serviceId: id, service: formData },{
          onSuccess : ()=>{
            clearForm();
          },
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

  return (
    <div className="fixed inset-0 bg-black/60 text-white backdrop-blur-sm flex items-center justify-center mt-5 z-50">
      <div className="bg-gradient-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {isEdit ? "Edit Service" : "Add New Service"}
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
                <p className="text-destructive text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>
          {/* Barcode and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono ${
                  errors.price ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Enter Price"
              />
              {errors.price && (
                <p className="text-destructive text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Duration Minutes *
              </label>
              <input
                type="number"
                value={formData.durationMinutes}
                onChange={(e) => handleChange("durationMinutes", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground ${
                  errors.durationMinutes ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Time taken"
              />
              {errors.durationMinutes && (
                <p className="text-destructive text-sm mt-1">{errors.durationMinutes}</p>
              )}
            </div>
          </div>

          {/* Stock Information */}
          <div className="grid grid-cols-1 md:grid-cols-1">
            

              <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg  ${
                  errors.description ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="e.g. Short description of the product"
              />
              {errors.description && (
                <p className="text-destructive text-sm mt-1">{errors.description}</p>
              )}
            </div>


          </div>

          {/* Is Active Toggle */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground">
              is Active
            </label>

            <label className="relative inline-flex items-center cursor-pointer w-14 h-7">
              <input
                type="checkbox"
                checked={formData.isActive} // ensure boolean
                onChange={(e) =>
                  handleChange("isActive", e.target.checked)
                }
                className="sr-only peer"
              />

              {/* Background track */}
              <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>

              {/* Circle */}
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-slate-600 rounded-full shadow-md transition-transform duration-200
                ${formData.isActive ? "translate-x-7" : "translate-x-0"} 
                flex items-center justify-center text-xs font-semibold`}
              >
                {formData.isActive ? "Yes" : "No"}
              </div>
            </label>
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
                ? "Update Service"
                : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModel;
