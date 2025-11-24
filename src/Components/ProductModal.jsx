import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { PostProducts, UpdateProducts } from "../Hooks/useProducts";
import CategoryModel from "../Components/CategoryModal";

const ProductModal = ({ product, categories, setEdit, isEdit, onClose }) => {
  const { mutateAsync: saveProduct, isPending: isSavePending } = PostProducts();
  const { mutateAsync: EditProducts, isPending: isEditPending } =
    UpdateProducts();
  const [categoryModel, setCategoryModel] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: 0,
    unit: "",
    sku: "",
    usesPerUnit: 0,
    currentStock: 0,
    minStock: 0,
    isServiceProduct: false,
  });

  const clearForm = () => {
    setId(0);
    setFormData({
      categoryId: 0,
      name: "",
      unit: "",
      sku: "",
      usesPerUnit: 0,
      currentStock: 0,
      minStock: 0,
      isServiceProduct: false,
    });
  };

  const [errors, setErrors] = useState({});
  const [id, setId] = useState(0);

  useEffect(() => {
    if (product) {
      setId(product.id);
    setFormData({
      name: product.name || "",
      categoryId: product.categoryId || 0,
      sku: product.sku || "",
      unit: product.unit || "",
      usesPerUnit: product.usesPerUnit || 0,
      currentStock: product.currentStock || 0,
      minStock: product.minStock || 0,
      isServiceProduct: product.isServiceProduct ?? false,
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (!formData.unit.trim()) newErrors.unit = "Unit is required";
    if (formData.usesPerUnit < 0)
      newErrors.currentStock = "Uses cannot be negative";
    if (formData.currentStock < 0)
      newErrors.currentStock = "Current stock cannot be negative";
    if (formData.minStock < 0)
      newErrors.minStock = "Minimum stock cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!isEdit) {
      try {
        await saveProduct(formData);
        clearForm();
      } catch (error) {
        console.log("SERVER ERROR:", error.response?.data);
      }
    }

    if (isEdit) {
      try {
        await EditProducts({ productId: id, product: formData });
        clearForm();
        setEdit(false);
      } catch (error) {
        console.error("Error saving product:", error);
      }
    }
  };

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center mt-5 z-50">
      <div className="bg-gradient-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {isEdit ? "Edit Product" : "Add New Product"}
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
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="bg-black/30"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setCategoryModel(true)}
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
              {categoryModel && (
                <CategoryModel
                  open={CategoryModel}
                  onClose={() => setCategoryModel(false)}
                />
              )}
            </div>
            {errors.categoryId && (
              <p className="text-destructive text-sm mt-1">
                {errors.categoryId}
              </p>
            )}
          </div>
          {/* Barcode and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                SKU *
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono ${
                  errors.sku ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Enter SKU"
              />
              {errors.sku && (
                <p className="text-destructive text-sm mt-1">{errors.sku}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Unit *
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground ${
                  errors.unit ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="e.g., piece, bottle, jar"
              />
              {errors.unit && (
                <p className="text-destructive text-sm mt-1">{errors.unit}</p>
              )}
            </div>
          </div>

          {/* Stock Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Uses Per Unit *
              </label>
              <input
                type="number"
                min="0"
                value={formData.usesPerUnit}
                onChange={(e) =>
                  handleChange("usesPerUnit", parseInt(e.target.value) || 0)
                }
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground ${
                  errors.usesPerUnit ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.usesPerUnit && (
                <p className="text-destructive text-sm mt-1">
                  {errors.usesPerUnit}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Current Stock *
              </label>
              <input
                type="number"
                min="0"
                value={formData.currentStock}
                onChange={(e) =>
                  handleChange("currentStock", parseInt(e.target.value) || 0)
                }
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground ${
                  errors.currentStock ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.currentStock && (
                <p className="text-destructive text-sm mt-1">
                  {errors.currentStock}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Minimum Stock *
              </label>
              <input
                type="number"
                min="0"
                value={formData.minStock}
                onChange={(e) =>
                  handleChange("minStock", parseInt(e.target.value) || 0)
                }
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground ${
                  errors.minStock ? "border-destructive" : "border-border"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.minStock && (
                <p className="text-destructive text-sm mt-1">
                  {errors.minimumStock}
                </p>
              )}
            </div>
          </div>

          {/* Is Active Toggle */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground">
              Service Product
            </label>

            <label className="relative inline-flex items-center cursor-pointer w-14 h-7">
              <input
                type="checkbox"
                checked={!!formData.isServiceProduct} // ensure boolean
                onChange={(e) =>
                  handleChange("isServiceProduct", e.target.checked)
                }
                className="sr-only peer"
              />

              {/* Background track */}
              <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>

              {/* Circle */}
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200
        ${formData.isServiceProduct ? "translate-x-7" : "translate-x-0"} 
        flex items-center justify-center text-xs font-semibold`}
              >
                {formData.isServiceProduct ? "Yes" : "No"}
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
