import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { PostProductCategory } from '../Hooks/useProducts';
import { closeProductCategoryModal } from '../Features/productSlice';


function CategoryModal() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const {mutateAsync : postProductCategory,isPending:isCategoryPending} = PostProductCategory();
  const open = useSelector((state) => state.products.isProductCategoryModal)

  const onClose = ()=>{
    dispatch(closeProductCategoryModal());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!category.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      await postProductCategory({name : category.trim()});
      setCategory("");
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
      setError('Failed to save category');
    }
  };

  const handleChange = (value) => {
    setCategory(value);
    if (error) setError('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-card rounded-2xl max-w-md w-full shadow-xl border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Category</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => handleChange(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl bg-card text-foreground transition-all duration-200 ${
                error ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary/20'
              } focus:outline-none focus:ring-2 focus:border-primary`}
              placeholder="Enter category name"
              autoFocus
            />
            {error && (
              <p className="text-destructive text-sm mt-1">{error}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-border text-foreground rounded-xl hover:bg-secondary transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isCategoryPending}
              className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isCategoryPending ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;