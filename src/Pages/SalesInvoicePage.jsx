import { useState, useMemo, useEffect } from "react";
import { Scissors, ShoppingBag, Plus, Minus, Trash2, Printer } from "lucide-react";
import SalesInvoiceAccountDetailModel from "../Components/SalesInvoiceAccountDetailModel";
import ItemCard from "../Components/ItemCard";
import { GetProductForSearch } from "../Hooks/useProducts";

const SERVICES = [
  { name: "Haircut", salesPrice: 250 },
  { name: "Beard Trim", salesPrice: 150 },
  { name: "Hair + Beard Combo", salesPrice: 350 },
  { name: "Head Massage", salesPrice: 200 },
  { name: "Hair Color", salesPrice: 500 },
  { name: "Facial", salesPrice: 400 },
  { name: "Hair Spa", salesPrice: 600 },
  { name: "Clean Shave", salesPrice: 100 },
];

// const productData = [
//   { name: "Hair Wax", price: 180 },
//   { name: "Beard Oil", price: 250 },
//   { name: "Shampoo", price: 320 },
//   { name: "Hair Gel", price: 150 },
//   { name: "Aftershave Lotion", price: 200 },
//   { name: "Shampoo", price: 320 },
//   { name: "Hair Gel", price: 150 },
//   { name: "Aftershave Lotion", price: 200 },
//   { name: "Shampoo", price: 320 },
//   { name: "Hair Gel", price: 150 },
//   { name: "Aftershave Lotion", price: 200 },
// ];

const SalesInvoicePage = () => {

  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [productData, setProductData] = useState("");

  const { data: productSearchedData } = GetProductForSearch(productSearch);

  useEffect(() => {
    if(productSearchedData) {
      setProductData(productSearchedData);
    }
  }, [productSearchedData]);

  const addItem = (name, price, type) => {
    const existing = items.find((i) => i.name === name);
    if (existing) {
      setItems(items.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      setItems([
        ...items,
        { id: crypto.randomUUID(), name, type, qty: 1, price }
      ]);
    }
  };

  const updateQty = (id, delta) => {
    setItems(
      items.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  };

  const removeItem = (id) =>
    setItems(items.filter((i) => i.id !== id));

  const {
    serviceItems,
    productItems,
    serviceTotal,
    productTotal,
    grandTotal,
  } = useMemo(() => {
    const svc = items.filter((i) => i.type === "service");
    const prd = items.filter((i) => i.type === "product");
    const sTotal = svc.reduce((s, i) => s + i.price * i.qty, 0);
    const pTotal = prd.reduce((s, i) => s + i.price * i.qty, 0);

    return {
      serviceItems: svc,
      productItems: prd,
      serviceTotal: sTotal,
      productTotal: pTotal,
      grandTotal: sTotal + pTotal,
    };
  }, [items]);

  const invoiceNo = `INV-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="md:h-[90vh] w-[100%] h-screen bg-gray-200 font-sans mx-auto overflow-x-auto thin-scrollbar">
      {/* Header */}
      <header className="bg-[#82d071] text-[#1d4ed8]-foreground py-2">
        <div className="max-w-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Scissors className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                The Classic Cut
              </h1>
              <p className="text-sm opacity-80">Premium Barber Shop</p>
            </div>
          </div>
          <div className="text-right text-sm opacity-80 hidden sm:block">
            <p>123 Main Street, City</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
      </header>

      <main className="max-w-full mx-auto px-2 py-2 grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Left Side */}
        <div className="space-y-2">
          {/* Customer Info */}
          <div className="bg-card rounded-lg border border-border p-1">

            <SalesInvoiceAccountDetailModel />

          </div>

          {/* Services */}
          <div className="p-1 bg-green-400 rounded-lg">

            <div className="flex flex-row align-center">

              <h2 className="text-xl font-bold mb-4">Services</h2>
              <input 
              type="text"
              placeholder="Search services..." 
              className="h-[30px] w-[70%] px-3 ml-4 border rounded-md"
              />

            </div>

            <div className="flex flex-row gap-2 overflow-x-auto thin-scrollbar p-2 rounded">
              {SERVICES.map((s) => (
                // <button
                //   key={s.name}
                //   onClick={() => addItem(s.name, s.price, "service")}
                //   className="border p-2 rounded flex-shrink-0"
                // >
                //   {s.name} - Rs.{s.price}
                // </button>
                <ItemCard key={s.name} data={s} dataType="service" />
              ))}
            </div>
          </div>

          {/* Package */}
          <div className="p-1 bg-green-400 rounded-lg">
            <div className="flex flex-row align-center">

              <h2 className="text-xl font-bold mb-4">Packages</h2>
              <input
              type="text"
              placeholder="Search packages..." 
              className="h-[30px] w-[70%] px-3 ml-4 border rounded-md"
              />

            </div>
            <div className="flex flex-row gap-2 overflow-x-auto thin-scrollbar p-2 rounded">
              {SERVICES.map((s) => (
                // <button
                //   key={s.name}
                //   onClick={() => addItem(s.name, s.price, "service")}
                //   className="border p-2 rounded flex-shrink-0"
                // >
                //   {s.name} - Rs.{s.price}
                // </button>
                <ItemCard key={s.name} data={s} dataType="service" />
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="p-1 bg-green-400 rounded-lg">
            <div className="flex flex-row align-center">

              <h2 className="text-xl font-bold mb-4">Products</h2>
              <input
              type="text"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="Search products..." 
              className="h-[30px] w-[70%] px-3 ml-4 border rounded-md"
              />

            </div>
            <div className="flex flex-row gap-2 overflow-x-auto thin-scrollbar p-2 rounded">
              {productData.length > 0 && productData?.map((p) => (
                // <button
                //   key={p.name}
                //   onClick={() => addItem(p.name, p.price, "product")}
                //   className="border p-2 rounded flex-shrink-0"
                // >
                //   {p.name} - Rs.{p.price}
                // </button>
                <ItemCard key={p.id} data={p} dataType="product" />
              ))}
            </div>
          </div>
        </div>

        {/* Invoice Detail */}
        <div>
          <div className="border rounded-lg p-2">
            <h3 className="font-bold">Invoice</h3>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x{item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>

            <button
              onClick={() => window.print()}
              className="mt-3 w-full bg-black text-white py-2 rounded"
            >
              Print
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesInvoicePage;