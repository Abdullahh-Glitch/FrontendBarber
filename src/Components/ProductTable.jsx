import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openProductModal, setSelectedProduct, openConfirmDialog } from '../Features/productSlice';

const ProductTable = ({ products, categories }) => {
  const dispatch = useDispatch();
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown Category';
  };

  const onEdit = (product)=>{
    dispatch(openProductModal());
    dispatch(setSelectedProduct(product))
  }

  const onDelete = (id)=>{
    dispatch(openConfirmDialog(id));
  }

  if (products.length === 0) {
    return (
      <div className="bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] rounded-2xl border border-border p-12 text-center shadow-lg">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-2xl">📦</div>
        </div>
        <p className="text-muted-foreground text-lg font-medium">No Products found</p>
        <p className="text-muted-foreground text-sm mt-2">Add your first Product to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[98%] rounded-2xl shadow-lg">
      <div className="overflow-auto thin-scrollbar rounded-b-2xl h-full">
        <table className="w-full border border-border rounded-2xl">
          <thead className="bg-white/40 backdrop-blur-sm sticky top-0 z-10">
            <tr >
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Sr
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Unit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Service Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Uses Per Unit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Current Stock
              </th>
              <th className="pr-10 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border border border-border">
            {products.map((product, index) => (
              <tr key={index} className={`hover:bg-gray-700 transition-colors border border-[var(--border-color)] border-border  duration-100 ${index % 2 === 0 ? 'bg-black/40' : 'bg-black/30'} h-[5px]`}>
                <td className="px-4 py-4 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  <div>
                    <div className="text-sm pl-4 font-medium text-foreground">{index +1}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {getCategoryName(product.categoryId)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm text-foreground">
                  {product.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm font-mono text-foreground">
                  {product.isServiceProduct ? "True" : "False"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm text-foreground">
                  {product.usesPerUnit}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm font-mono ${product.currentStock <= product.minStock ? 'text-destructive font-bold' : 'text-foreground'}`}>
                  <div className="text-sm text-foreground">
                    Current: <span className="font-medium">{product.currentStock}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Min: {product.minStock}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-[var(--border-color)] border-border text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-muted-foreground hover:text-primary p-2 rounded-lg hover:bg-blue-500 transition-all duration-100 hover:scale-105"
                      title="Edit Product"
                    >
                      <Edit className="h-4 w-4" onClick={() => onEdit(product)} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-muted-foreground hover:text-destructive p-2 rounded-lg hover:bg-red-500 transition-all duration-200 hover:scale-105"
                      title="Delete Product"
                    >
                      <Trash2 className="h-4 w-4" onClick={()=> onDelete(product.id)} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;