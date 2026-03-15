import { useState, useMemo, useEffect } from 'react';
import SupplierDetails from '../Components/InvoiceAccountDetailModel';
import ItemDetails from '../Components/InvoiceProductTableModel';
import { GetProductForSearch } from '../Hooks/useProducts';
// import { handleSavePurchaseInvoice } from '../Handlers/invoiceHandler';
import { useSelector } from 'react-redux';
import { CreateInvoice } from "../Hooks/useInvoice";

function PurchaseInvoicePage() {

  const { mutateAsync: createInvoice } = CreateInvoice();
  
  const [items, setItems] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [fare, setFare] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const accountId = useSelector((state) => state.invoice.accountId);
  const invoiceCategoryId = useSelector((state) => state.invoice.selectedCategoryId);
  const [clearData,setClearData] = useState(false)

  const [name, setName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [got, setGot] = useState(false);

  const { data: gotData } = GetProductForSearch(name);

  useEffect(() => {
    if (gotData?.length > 0 && !got && name.trim() !== "") {
      setFilteredData(gotData);
    }
  }, [gotData,name,got]);

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
      pieces : 0,
      boxes : 1,
      totalPieces : 1,
      price : 0,
    }
    setItems([...items, selectProduct]);
    setFilteredData([]);
    setName("");
    setGot(true);
    
  }

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (acc, item) =>
        acc + (Number(item.totalAmount) || 0),
      0
    );

    const fareAmount = Number(fare) || 0;
    const extraPrice = items.length > 0 ? (fareAmount / items.length) : 0;
    const grandTotal = subtotal + fareAmount;
    const paid = Number(paidAmount) || 0;
    const balance = grandTotal - paid;
    

    return { subtotal, paid, balance, grandTotal,extraPrice };
  }, [items, paidAmount, fare]);

  const handleUpdateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    updatedItems[index].totalAmount = handleCalTotal(updatedItems[index]);
    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCalTotal = (item)=>{
    return ( (Number(item.boxes || 1) * Number(item.price || 0)) + ((Number(item.price || 0) / Number(item.totalPieces || 1)) * Number(item.pieces || 0)) ).toFixed(2)
  }

  const clearForm = () =>{
    setItems([]);
    setPaidAmount(0);
    setFare(0);
    setDate(new Date().toISOString().split("T")[0])
    setClearData(true);
  }

  const handleSave = () => {
    if(accountId === null || items.length === 0){
      alert("Please select an account and add items to the invoice.");
      return;
    }
    
    const invoiceData = {
      invoiceCategoryId : invoiceCategoryId,
      eDate : date,
      accountId : accountId,
      subTotal : Number(totals.subtotal || 0).toFixed(2),
      fare : Number(fare || 0).toFixed(2),
      totalDiscount : Number(0).toFixed(2),
      grandTotal : Number(totals.grandTotal || 0).toFixed(2),
      paidAmount : Number(paidAmount || 0).toFixed(2),
      balance : Number(totals.balance || 0).toFixed(2),
    };
    const productData = items.map((item) => (item.productId && (item.boxes > 0 || item.pieces > 0) && item.price > 0 ? {
      sr : items.indexOf(item) + 1,
      productId : item.productId,
      pieces : Number(item.pieces).toFixed(2),
      boxes : Number(item.boxes).toFixed(2),
      totalPieces : Number(item.totalPieces).toFixed(2),
      pricePerBox : Number(item.price).toFixed(2),
      qty : (Number(item.boxes) * Number(item.totalPieces)) + Number(item.pieces),
      pricePerUnitO : Number(Number(item.price) / Number(item.totalPieces)).toFixed(2),
      totalAmount : Number(item.totalAmount || 0).toFixed(2),
      pricePerUnitC : Number(Number(Number(item.totalAmount || 0) + Number(totals.extraPrice || 0)) / Number((Number(item.boxes) * Number(item.totalPieces)) + Number(item.pieces))).toFixed(2),
    } : null
  ));
  
    
  createInvoice({invoiceData : invoiceData, productData : productData}, {
        onSuccess: () => {
            clearForm();
            console.log("Invoice Created");
            
        },
        onError: (error) => {
          console.log("SERVER ERROR:", error.response?.data);
        },
      });
  }

  return (
    <div className="md:h-[90vh] w-[100%] h-screen bg-slate-300 px-3 md:px-6 lg:px-8 font-sans overflow-x-auto mx-auto thin-scrollbar">
      
      <div className="w-[100%] h-[90vh] max-w-full md:w-[85%] mx-auto bg-white rounded-3xl shadow-xl overflow-auto">
        
        <header className="bg-[#1a233a] w-[100%] h-[20%] p-2 md:p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <div>
            <h1 className="text-[15px] md:text-[23px] font-black flex items-center gap-3">
              <span className="bg-blue-600 p-2 rounded-lg">📄</span>
              Purchase Invoice
            </h1>
            <p className="text-slate-400 mt-1 text-[10px] md:text-base">
              Create and manage your purchase orders
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="flex-1 md:flex-none text-left md:text-right">
              <label className="block text-[10px] pl-2 md:pr-2 font-bold uppercase tracking-widest text-slate-500 mb-1">
                Invoice #
              </label>
              <input
                type="text"
                defaultValue="INV-001"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-center text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex-1 md:flex-none text-left md:text-right">
              <label className="block text-[10px] pl-1 md:pr-3 font-bold uppercase tracking-widest text-slate-500 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-center text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </header>

        {/* ================= MAIN ================= */}
        <main className="p-5 md:p-8 overflow-x-hidden">

          {/* Supplier Section */}
          <SupplierDetails clearData={clearData} setClearData={setClearData} />

          <div className="my-2 border-t border-slate-100" />

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
              className="w-[100%] h-[40px] px-4 py-3 pr-10 border rounded-xl bg-card text-foreground focus:outline-none focus:ring-2"
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
              onDelete={handleDeleteItem}
              />
              </div>
          </div>

          {/* ================= TOTALS ================= */}
          <section className="flex w-full flex-col items-end mt-12 pt-8 border-t-2 border-slate-50">

            <div className="w-full md:w-[50%] space-y-2">

              <div className="flex w-full text-slate-500">
                <span className="font-medium w-[50%]">Subtotal:</span>
                <span className="font-bold mx-auto">
                  <input
                    type="text"
                    value={totals.subtotal.toFixed(2)}
                    disabled
                    className="w-[100%] px-4 py-2 pr-10 border rounded-xl bg-card text-foreground text-right focus:outline-none focus:ring-2"
                    placeholder="subTotal"
                  />
                </span>
              </div>

              <div className="flex w-full text-slate-500">
                <span className="font-medium w-[50%]">Fare:</span>
                <span className="font-bold mx-auto">
                  <input
                    type="number"
                    min={0}
                    value={fare}
                    onChange={(e) => setFare(e.target.value)}
                    className="w-[100%] px-4 py-2 pr-10 border rounded-xl bg-card text-foreground text-right focus:outline-none focus:ring-2 placeholder:text-left"
                    placeholder="Fare"
                  />
                </span>
              </div>

              <div className="flex w-full text-slate-500">
                <span className="font-medium w-[50%]">Grand Total:</span>
                <span className="font-bold mx-auto">
                  <input
                    type="text"
                    value={totals.grandTotal.toFixed(2)}
                    disabled
                    className="w-[100%] px-4 py-2 pr-10 border rounded-xl bg-card text-foreground text-right focus:outline-none focus:ring-2"
                    placeholder="Grand Total"
                  />
                </span>
              </div>

              <div className="flex w-full text-slate-500">
                <span className="font-medium w-[50%]">Paid Amount:</span>
                <span className="font-bold mx-auto">
                  <input
                    type="number"
                    min={0}
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    className="w-[100%] px-4 py-2 pr-10 border rounded-xl bg-card text-foreground text-right focus:outline-none focus:ring-2 placeholder:text-left"
                    placeholder="Paid Amount"
                  />
                </span>
              </div>

              <div className="flex justify-between text-2xl font-black text-slate-800 pt-4 border-t border-slate-100">
                <span>Balance:</span>
                <span className="text-blue-600">
                  Rs.{totals.balance.toFixed(2)}
                </span>
              </div>

              <button
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex justify-center items-center gap-2 active:scale-95"
                // onClick={() => window.print()}
                onClick={() => handleSave()}
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