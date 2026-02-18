import { useState, useMemo, useEffect } from 'react';
import SupplierDetails from '../Components/InvoiceAccountDetailModel';
import ItemDetails from '../Components/InvoiceProductTableModel';
import { GetProductForSearch } from '../Hooks/useProducts';

function PurchaseInvoicePage() {
  // =========================
  // STATE
  // =========================
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [got, setGot] = useState(false);

  const { data: gotData } = GetProductForSearch(name);

  useEffect(() => {
    if (gotData?.length > 0 && !got && name.trim() !== "") {
      setFilteredData(gotData);
    }
  }, [gotData,name]);

  const onSearchProduct = (e) => {
    setName(e.target.value);
    setGot(false);
    if (e.target.value.trim() === "") {
      setFilteredData([]);
      return;
    }
  }

  const onSelectProduct = (product) => {
    if (!product) return;
    const selectProduct = {
      productId : product?.id,
      name : product?.name,
      piece : 0,
      qty : 1,
      totalPiece : 1,
      price : product?.salesPrice
    }
    setItems([...items, selectProduct]);
    setFilteredData([]);
    setName("");
    setGot(true);
  }

  // =========================
  // CALCULATIONS
  // =========================
  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (acc, item) =>
        acc + Number(item.qty || 0) * Number(item.price || 0),
      0
    );

    const tax = subtotal * 0.10;
    const grandTotal = subtotal + tax;

    return { subtotal, tax, grandTotal };
  }, [items]);

  // =========================
  // HANDLERS
  // =========================
  const handleUpdateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddSpace = () => {
  const newItem = {
    id: Date.now(),
    name: "",
    piece: 1,
    qty: 1,
    totalPiece: 1,
    price: 0,
    productId: null
  };
  setItems([...items, newItem]);
};

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="md:h-[90vh] h-screen bg-slate-100 pt-2 px-3 md:px-6 lg:px-8 font-sans overflow-x-auto w-[100%] mx-auto">
      
      <div className="w-[80%] h-[90vh] max-w-full md:max-w-[full] mx-auto bg-white rounded-3xl shadow-xl overflow-auto">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#1a233a] w-[100%] h-[20%] p-6 md:p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <div>
            <h1 className="text-[15px] md:text-[23px] font-black flex items-center gap-3">
              <span className="bg-blue-600 p-2 rounded-lg">📄</span>
              Purchase Invoice
            </h1>
            <p className="text-slate-400 mt-1 text-[10px] md:text-base">
              Create and manage your purchase orders
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none text-right">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                Invoice #
              </label>
              <input
                type="text"
                defaultValue="INV-001"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-center text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex-1 md:flex-none text-right">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-center text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </header>

        {/* ================= MAIN ================= */}
        <main className="p-6 md:p-12 overflow-x-hidden">

          {/* Supplier Section */}
          <SupplierDetails />

          <div className="my-5 border-t border-slate-100" />

          {/* Items Section */}
          <div className="w-full">
            <div>
              <h2 className="text-lg font-bold text-slate-700 mb-4">
                Items Details
              </h2>
            </div>

            <div className="relative w-[70%]">

            <label className="block text-sm font-medium text-foreground mb-2">
              Search Product Name:
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => onSearchProduct(e)}
              className="w-[100%] px-4 py-3 pr-10 border rounded-xl bg-card text-foreground focus:outline-none focus:ring-2"
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
                <ul className="absolute z-50 w-[100%] mt-2 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
                  {filteredData.map((product) => (
                    <li
                      key={product.id}
                      className="px-4 py-2 cursor-pointer hover:bg-muted"
                      onClick={() => {
                        onSelectProduct(product);
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
            <div className='mt-5'>
            <ItemDetails
              items={items}
              onUpdate={handleUpdateItem}
              getSpace={handleAddSpace}
              onDelete={handleDeleteItem}
              />
              </div>
          </div>

          {/* ================= TOTALS ================= */}
          <section className="flex flex-col items-end mt-12 pt-8 border-t-2 border-slate-50">

            <div className="w-full md:w-80 space-y-3">

              <div className="flex justify-between text-slate-500">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">
                  ${totals.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span className="font-medium">Tax (10%):</span>
                <span className="font-bold">
                  ${totals.tax.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-2xl font-black text-slate-800 pt-4 border-t border-slate-100">
                <span>Grand Total:</span>
                <span className="text-blue-600">
                  ${totals.grandTotal.toFixed(2)}
                </span>
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

export default PurchaseInvoicePage;