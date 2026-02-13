import React from 'react';
import { GetProductForSearch } from '../Hooks/useProducts';

const InvoiceProductTableModel = ({ items, onUpdate, getSpace, onDelete }) => {
  
  const [name, setName] = React.useState("");
  const { data: filteredData } = GetProductForSearch(name);
  const [got, setGot] = React.useState(false);
  const onAddProductName = () => {
    
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-slate-800 mb-6">Item Details</h2>
      
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[600px] text-left border-collapse bg-white">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Product Name</th>
              <th className="p-4 font-semibold w-24 text-center">Pieces</th>
              <th className="p-4 font-semibold w-24 text-center">Qty</th>
              <th className="p-4 font-semibold w-24 text-center">Total Pieces</th>
              <th className="p-4 font-semibold w-32 text-center">Price</th>
              <th className="p-4 font-semibold w-32 text-right">Total</th>
              <th className="p-4 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items?.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <div>
                <td className="p-4">
                  <input
                    type="text"
                    value={item.name}
                    onChange={()=> onUpdate(index, 'name', name)}
                    className="w-full bg-transparent focus:outline-none focus:text-blue-600 font-medium"
                    placeholder="Enter service or product..."
                    />
                </td>
                {name && (
              <button
                type="button"
                onClick={() => {
                  setName("");
                }}
                className="absolute right-3 top-[42px] text-muted-foreground hover:text-foreground"
              >
                ✖
              </button>
            )}

            {name.trim() &&
              (filteredData.length > 0 ? (
                <ul className="absolute z-50 w-full mt-2 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
                  {filteredData.map((product) => (
                    <li
                      key={product.id}
                      className="px-4 py-2 cursor-pointer hover:bg-muted"
                      onClick={() => {
                        addProduct(product);
                        setFilteredData([]);
                        setGot(true);
                      }}
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              ) : !got ? (
                <ul className="absolute z-20 w-full mt-2 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
                  <li className="px-4 py-2 cursor-pointer hover:bg-muted">
                    No Records Found
                  </li>
                </ul>
              ) : (
                ""
              ))}
                  </div>
                <td className="p-4">
                  <input
                    type="number"
                    value={item.piece}
                    onChange={(e) => onUpdate(index, 'piece', e.target.value)}
                    className="w-full text-center bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => onUpdate(index, 'qty', e.target.value)}
                    className="w-full text-center bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="number"
                    value={item.totalPiece}
                    onChange={(e) => onUpdate(index, 'totalPiece', e.target.value)}
                    className="w-full text-center bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-slate-400">$</span>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => onUpdate(index, 'price', e.target.value)}
                      className="w-full text-center bg-transparent focus:outline-none"
                    />
                  </div>
                </td>
                <td className="p-4 text-right font-semibold text-slate-700">
                  ${(item.qty * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => onDelete(index)}
                    className="text-slate-300 hover:text-red-500 transition-colors text-lg"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button 
        onClick={getSpace}
        className="mt-6 flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-all text-sm"
      >
        <span className="text-xl">+</span> Add Product Line
      </button>
    </div>
  );
};

export default InvoiceProductTableModel;