import { useState, useMemo } from 'react';
import SupplierDetails from '../Components/InvoiceAccountDetailModel';
import { GetProductForSearch} from "../Hooks/useProducts";
import ItemDetails from '../Components/InvoiceProductTableModel';

function SalesPage() {
  // Main state as an array of objects
  const [items, setItems] = useState([
    // { id: 1, name: 'Web Development Service', qty: 1, piece: 15, totalPiece: 20, price: 1500 },
    // { id: 2, name: 'Server Maintenance', qty: 12, piece: 7, totalPiece: 15, price: 100 }
  ]);

  // Derived calculations using useMemo for performance
  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.price)), 0);
    const tax = subtotal * 0.10;
    const grandTotal = subtotal + tax;
    
    return { subtotal, tax, grandTotal };
  }, [items]); // Only recalculates when the 'items' array changes

  // Functions to handle logic
  const handleUpdateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddSpace = () => {
    const newSpace = { id: 1, name: '', qty: 1, piece: 0, totalPiece: 1, price: 0 };
    setItems([...items, newSpace]);
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-2 md:px-12 font-sans overflow-x-hidden">
      <div className="max-w-5xl mx-auto w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header Section - Responsive Flex */}
        <header className="bg-[#1a233a] p-6 md:p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
              <span className="bg-blue-600 p-2 rounded-lg">📄</span> Purchase Invoice
            </h1>
            <p className="text-slate-400 mt-2 text-sm md:text-base">Create and manage your purchase orders</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none text-right">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Invoice #</label>
              <input type="text" defaultValue="INV-001" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-center text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
            <div className="flex-1 md:flex-none text-right">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Date</label>
              <input type="date" defaultValue="2026-02-07" className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-center text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </header>

        <main className="p-6 md:p-12">
          <SupplierDetails />
          
          <div className="my-10 border-t border-slate-100" />
          
          <ItemDetails 
            items={items} 
            onUpdate={handleUpdateItem} 
            getSpace={handleAddSpace} 
            onDelete={handleDeleteItem} 
          />

          {/* Totals Section */}
          <section className="flex flex-col items-end mt-12 pt-8 border-t-2 border-slate-50">
            <div className="w-full md:w-80 space-y-3">
              <div className="flex justify-between text-slate-500">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span className="font-medium">Tax (10%):</span>
                <span className="font-bold">${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-slate-800 pt-4 border-t border-slate-100">
                <span>Grand Total:</span>
                <span className="text-blue-600">${totals.grandTotal.toFixed(2)}</span>
              </div>
              
              <button 
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex justify-center items-center gap-2 active:scale-95"
                onClick={() => window.print()}
              >
                💾 Save & Download Invoice
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SalesPage;