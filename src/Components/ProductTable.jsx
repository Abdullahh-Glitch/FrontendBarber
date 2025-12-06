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
      <div className="bg-gradient-card rounded-2xl border border-border p-12 text-center shadow-lg">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-2xl">📦</div>
        </div>
        <p className="text-muted-foreground text-lg font-medium">No products found</p>
        <p className="text-muted-foreground text-sm mt-2">Add your first product to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-2xl border border-border overflow-x-hidden shadow-lg">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-red-200">
        <table className="w-full">
          <thead className="bg-white/20 backdrop-blur-sm border-b">
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
                Service Products?
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
          <tbody className="bg-card/50 divide-y divide-border">
            {products.map((product, index) => (
              <tr key={index} className={`hover:bg-gray-700 transition-colors duration-100 ${index % 2 === 0 ? 'bg-black/40' : 'bg-black/30'} h-[10px] hover:scale-101`}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm pl-4 font-medium text-foreground">{index +1}</div>
                    {/* <div className="text-xs text-muted-foreground"> {product.name}</div> */}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.name}
                    {/*  */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {getCategoryName(product.categoryId)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {product.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-foreground">
                  {product.isServiceProduct ? "True" : "False"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {product.usesPerUnit}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${product.currentStock <= product.minStock ? 'bg-red-600':''}`}>
                  <div className="text-sm text-foreground">
                    Current: <span className="font-medium">{product.currentStock}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Min: {product.minStock}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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