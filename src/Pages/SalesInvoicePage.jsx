import { useState, useMemo, useEffect } from "react";
import { Scissors, ShoppingBag, Plus, Minus, Trash2, Printer } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import SalesInvoiceAccountDetailModel from "../Components/SalesInvoiceAccountDetailModel";
import ItemCard from "../Components/ItemCard";
import { GetProductForSearch, GetProductsForDisplay } from "../Hooks/useProducts";
import { GetServiceForSearch, GetServicesForDisplay } from "../Hooks/useServices";
import { GetBankAccounts } from "../Hooks/useBankAccounts";
import { CreateSalesInvoice } from "../Hooks/useInvoice";
import { removeAccountId } from "../Features/invoiceSlice";

const SalesInvoicePage = () => {

  const dispatch = useDispatch();
  const customerId = useSelector((state) => state.invoice.selectedCustomerId);
  const employeeId = useSelector((state) => state.invoice.selectedEmployeeId);

  const { data: servicesForDisplay } = GetServicesForDisplay();
  const { data: productsForDisplay } = GetProductsForDisplay();
  const{ data: BankAccountsData } = GetBankAccounts();
  const {mutate: createSalesInvoice } = CreateSalesInvoice();

  const [edate, seteDate] = useState(new Date().toISOString().split("T")[0]);
  const [remarks,setRemarks] = useState("");

  const [payments,setPayments] = useState({});

  const [items, setItems] = useState([{
    name: "Haircut",
    type: "service",
    qty: 3,
    price: 300
  }]);

  const {
    serviceItems,
    productItems,
    serviceTotal,
    productTotal,
    grandTotal,
    receivedTotal,
    balance,
  } = useMemo(() => {
    const svc = items.filter((i) => i.type === "service");

    const prd = items.filter((i) => i.type === "product");

    const sTotal = svc.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const pTotal = prd.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const received = Object.values(payments).reduce(
      (sum, amount) => sum + Number(amount || 0),
      0,
    );

    return {
      serviceItems: svc,
      productItems: prd,
      serviceTotal: sTotal,
      productTotal: pTotal,
      grandTotal: sTotal + pTotal,
      receivedTotal: received,
      balance: (sTotal + pTotal) - received,
    };
  }, [items, payments]);

  const [productSearch, setProductSearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [productData, setProductData] = useState(productsForDisplay || []);
  const [serviceData, setServiceData] = useState(servicesForDisplay || []);

  const { data: productSearchedData } = GetProductForSearch(productSearch);
  const { data: serviceSearchedData } = GetServiceForSearch(serviceSearch);
  

  useEffect(() => {
    if(productSearchedData) {
      setProductData(productSearchedData);
    }
    if(serviceSearchedData) {
      setServiceData(serviceSearchedData);
    }
    if(serviceSearch === "") {
      setServiceData(servicesForDisplay);
    }
    if(productSearch === "") {
      setProductData(productsForDisplay);
    }

  }, [productSearchedData, serviceSearchedData, servicesForDisplay, serviceSearch, productsForDisplay, productSearch]);

  const calculateItemTotal = (qty, price) => {
  return Number(qty) * Number(price);
  };

  const addItem = (id, name, price, type) => {
  const existing = items.find((i) => i.id === id);

  if (existing) {

    setItems(
      items.map((i) => i.id === id ? {...i, qty: i.qty + 1}: i)
    );

  } else {
    setItems([...items,
      {
        id,
        name,
        type,
        qty: 1,
        price: Number(price),
      },
    ]);
  }

};

  const removeItem = (id) => setItems(items.filter((i) => i.id !== id));

  const handleChange = (id, field, value) => {
  setItems((prevItems) =>
    prevItems.map((item) => {
      if (item.id === id) {
        const updatedItem = {...item, [field]: Number(value)};
        return updatedItem;
      }

      return item;
    })
  );
};

  const clearForm = () =>{
  setItems([]);
  setPayments({});
  seteDate(new Date().toISOString().split("T")[0]);
  setRemarks("");
  dispatch(removeAccountId());
  }

 const handleSubmit = () => {
  
  const onceData = {
    eDate : edate,
    remarks : remarks,
    customerId : customerId,
    employeeId : employeeId,
    grandTotal : grandTotal,
    paidAmount : receivedTotal,
    balance : balance,
  }
  
  const transData = Object.entries(payments)
  .filter(([_, amount]) => amount > 0)
  .map(([bankId, amount]) => ({
    bankAccountId: Number(bankId),
    amount: Number(amount),
  }));

  const prdData = productItems.map((p) => ({
    productId: p.id,
    qty: p.qty,
    price: p.price,
  }));

  const serviceData = serviceItems.map((s) => ({
    serviceId: s.id,
    qty: s.qty,
    price: s.price,
  }));

  createSalesInvoice({invoiceData : onceData, transactionData : transData, productData : prdData, serviceData : serviceData},{
    onSuccess : (data) => {
      console.log("Invoice created successfully:", data);
      clearForm();
    },
    onError : (error) => {
      console.error("Error creating invoice:", error);
    }
  });

 }
  
  const invoiceNo = `INV-${Date.now().toString(36).toUpperCase()}`;



  return (
    <div className="md:h-[90vh] w-[100%] h-screen bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] font-sans mx-auto overflow-x-auto thin-scrollbar">
      {/* Header */}
      <header className="bg-gradient-to-b from-[var(--secondary-from)] to-[var(--secondary-to)] text-[var(--text-color)] py-1">
        <div className="max-w-full px-4 flex items-center justify-between">
          <div className="flex items-center md:gap-1">
            <div className="w-8 md:w-10 h-6 md:h-12 rounded-full bg-accent flex items-center justify-center">
              <Scissors className="w-10 h-5 md:h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                Sales Invoice
              </h1>
              {/* <p className="text-sm opacity-80">Premium Barber Shop</p> */}
            </div>
          </div>
          <div className="text-right text-sm opacity-80 hidden sm:block">
            <p>123 Main Street, City</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
      </header>

      <main className="w-full mx-auto px-2 py-2 grid grid-cols-1 md:grid-cols-2 gap-1">
        {/* Left Side */}
        <div className="space-y-2">
          {/* Customer Info */}
          <div className="bg-card rounded-lg border border-border p-1 bg-gradient-to-t from-[var(--secondary-from)] to-[var(--secondary-to)]">
            <SalesInvoiceAccountDetailModel side={"left"} />
          </div>

          {/* Services */}
          <div className="rounded-lg">
            <div className="flex flex-row align-center pt-2 pl-2 rounded-t-lg bg-gradient-to-t from-[var(--secondary-from)] to-[var(--secondary-to)] text-[var(--text-color)]">
              <h2 className="text-xl font-bold mb-2">Services</h2>
              <input
                type="text"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                placeholder="Search services..."
                className="h-[30px] w-[70%] px-3 ml-4 border rounded-md placeholder:font-semibold"
              />
            </div>

            <div className="flex flex-row gap-2 overflow-x-auto thin-scrollbar p-1 pt-2 bg-gradient-to-t from-[var(--secondary-from)] to-[var(--secondary-to)] rounded-b-lg">
              {serviceData?.length > 0 &&
                serviceData?.map((s) => (
                  <ItemCard
                    key={s.name}
                    data={s}
                    onAdd={addItem}
                    dataType="service"
                  />
                ))}
            </div>
          </div>

          {/* Products */}
          <div className="rounded-lg">
            <div className="flex flex-row align-center pt-2 pl-2 rounded-t-lg bg-gradient-to-t from-[var(--secondary-from)] to-[var(--secondary-to)] text-[var(--text-color)]">
              <h2 className="text-xl font-bold mb-2">Products</h2>
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products..."
                className="h-[30px] w-[70%] px-3 ml-4 border rounded-md"
              />
            </div>
            <div className="flex flex-row gap-2 overflow-x-auto thin-scrollbar p-1 bg-gradient-to-t from-[var(--secondary-from)] to-[var(--secondary-to)] rounded-b-lg">
              {productData?.length > 0 &&
                productData?.map((p) => (
                  <ItemCard
                    key={p.id}
                    data={p}
                    onAdd={addItem}
                    dataType="product"
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Invoice Detail */}
        <div>
          <div className="border bg-gradient-to-b from-[var(--saleItem--from)] to-[var(--saleItem--to)] rounded-lg p-2">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between align-middle">
              <div className="w-full md:w-[60%] flex flex-row justify-center items-center gap-2">
                <SalesInvoiceAccountDetailModel side={"right"} />
              </div>
              <div className="w-full md:w-[25%] flex items-center gap-7 md:gap-2 mr-2">
                <label htmlFor="invoiceDate" className="font-semibold">
                  Date:
                </label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={edate}
                  onChange={(e) => seteDate(e.target.value)}
                  id="invoiceDate"
                  className="w-full bg-white/10 h-[32px] border rounded-lg px-3 py-2 text-center text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <hr className="my-2" />

            <div className="w-full h-[50vh] overflow-auto thin-scrollbar bg-white/40 rounded p-1">
              <table className="w-full">
                <thead className="bg-[oklch(71.4%_0.014_41.2)] w-full sticky top-0 z-10">
                  <tr className="font-bold text-[15px] w-full border">
                    <th className="w-[5%] border-r-1">Sr</th>
                    <th className="text-left pl-2 border-r-1">Item</th>
                    <th className="w-[12%] text-center border-r-1">Qty</th>
                    <th className="w-[17%] text-center border-r-1">Rate</th>
                    <th className="w-[18%] border-r-1">Total</th>
                    <th className="w-[5%] border-r-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-[oklch(95%_0.052_163.051)]" : "bg-[oklch(90.5%_0.093_164.15)]"} w-full border`}
                    >
                      <td className="w-[5%] text-center border-x-1 border-b-1">
                        {index + 1}
                      </td>
                      <td className="text-left font-bold pl-2 border-r-1 border-b-1">
                        {item.name}
                      </td>
                      <td className="w-[12%] text-center border-r-1 border-b-1">
                        <input
                          type="number"
                          value={item.qty ? item.qty.toFixed(2) : 0}
                          onChange={(e) =>
                            handleChange(item.id, "qty", e.target.value)
                          }
                          className="text-right pr-1 w-full"
                        />
                      </td>
                      <td className="w-[17%] text-right border-r-1 border-b-1">
                        <input
                          type="number"
                          value={item.price ? item.price.toFixed(2) : 0}
                          onChange={(e) =>
                            handleChange(item.id, "price", e.target.value)
                          }
                          className="text-right w-full"
                        />
                      </td>
                      <td className="w-[18%] text-right pr-1 border-r-1 border-b-1">
                        <input
                          type="number"
                          disabled
                          value={calculateItemTotal(
                            item.qty,
                            item.price,
                          ).toFixed(2)}
                          className="text-right font-bold w-full"
                        />
                      </td>
                      <td className="w-[5%] text-center border-r-1 border-b-1">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <hr className="my-2" />
            <div className="w-full flex flex-col-reverse md:flex-row gap-1">
              <div className="w-full md:w-[50%] font-bold pr-1">
                <label htmlFor="remarks">Remarks</label>
                <textarea
                  placeholder="Remarks"
                  rows="2"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground text-[13px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
              </div>

              <div className="w-full md:w-[50%] flex flex-col font-bold px-1 bg-white/40 rounded">
                <div className="flex flex-row justify-between">
                  <div className="text-[13px] md:text-[17px]">
                    <span>Grand Total</span>
                  </div>
                  <div className="flex flex-row justify-end">
                    <input
                      type="text"
                      disabled
                      value={`Rs. ${grandTotal.toFixed(2)}`}
                      className="text-right h-[35px] text-[20px] w-[64%] bg-gray-400"
                    />
                  </div>
                </div>
                <hr />

                {/* Banks List */}
                {BankAccountsData?.length > 0 &&
                  BankAccountsData.map((bank) => (
                    <div
                      className="flex flex-row justify-between py-1"
                      key={bank.id}
                    >
                      <div>
                        <span>{bank.bankName}</span>
                      </div>
                      <div className="flex flex-row justify-end">
                        <input
                          type="number"
                          value={payments[bank.id] || ""}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setPayments((prev) => ({
                              ...prev,
                              [bank.id]: value,
                            }));
                          }}
                          className="text-right h-[27px] w-[80%] bg-gray-300"
                        />
                      </div>
                    </div>
                  ))}

                <hr />

                <div className="flex flex-row justify-between pb-1">
                  <div className="text-[13px] md:text-[17px]">
                    <span className="text-[13px] md:text-[17px]">
                      Total Received
                    </span>
                  </div>
                  <div className="flex flex-row justify-end">
                    <input
                      type="text"
                      disabled
                      value={`Rs. ${receivedTotal.toFixed(2)}`}
                      className="text-right h-[35px] text-[18px] w-[72%] bg-gray-400"
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between">
                  <div className="text-[13px] md:text-[17px]">
                    <span>Balance</span>
                  </div>
                  <div className="flex flex-row justify-end">
                    <input
                      type="text"
                      disabled
                      value={`Rs. ${balance.toFixed(2)}`}
                      className="text-right h-[35px] text-[20px] w-[64%] bg-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSubmit()}
              className="mt-3 w-full bg-black text-white py-2 rounded"
            >
              Save Invoice
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesInvoicePage;