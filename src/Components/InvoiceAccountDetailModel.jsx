import React, { useState, useEffect, use } from 'react';
import { GetSuppliersByName } from '../Hooks/useAccounts';
import { useDispatch } from 'react-redux';
import { setAccountId } from '../Features/invoiceSlice';

const InvoiceAccountDetailModel = () => {

  const dispatch = useDispatch();
  const [sName,setSName] = useState("");
  const[got,setGot]= useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const { data: gotData } = GetSuppliersByName(sName);

  const [supplier,setSupplier] = useState({
    name : "",
    companyName : "",
    address : "",
    phoneNo : ""
  })

  useEffect(() => {
      if (gotData?.length > 0 && !got && sName.trim() !== "") {
        setFilteredData(gotData);
      }
      
    }, [gotData,sName,got]);

    const onSearchSupplier = (e) => {
    setSName(e.target.value);
    setGot(false);
    if (e.target.value.trim() === "") {
      setFilteredData([]);
      return;
    }
  }

  const onSelectProduct = (account) => {
    if (!account) return;
    const selectAccount = {
      accountId : account?.id,
      name : account?.name || "",
      companyName : account?.companyName || "",
      address: account?.address || "",
      phoneNo : account?.phoneNo || account.mobileNo || "",
    }
    setSName(account.name);
    setSupplier(selectAccount);
    dispatch(setAccountId(account.id));
    setFilteredData([]);
    setSName("");
    setGot(true);
  }

  return (
    <div className="mb-8 relative w-[100%]">
        {/* <div className="text-lg w-[100%] font-bold text-slate-800 mb-6 flex flex-row gap-2"> */}
        <div className="w-[100%] text-slate-800 mb-6 flex flex-row gap-2">
          <div className='w-[30%] font-bold text-2xl'><h2>🏢 Supplier Details</h2></div>
          <div className='w-[70%] bg-gray-400 pl-1 rounded-lg flex flex-row'>
            <label htmlFor="" className='w-[30%] font-bold flex justify-center items-center'>Search Suppliers</label>
            <div className='w-full relative'>

          <input 
            type="text"
            value={sName}
            onChange={(e)=> onSearchSupplier(e)}
            placeholder=" Search Name" 
            className="p-3 bg-slate-50 h-[40px] w-[100%] border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {sName && (
              <button
                type="button"
                onClick={() => {
                  setSName("");
                  setFilteredData([]);
                }}
                className="absolute right-3 top-[42px] text-muted-foreground hover:text-foreground"
              >
                ✖
              </button>
            )}

            {sName.trim() &&
              (filteredData.length > 0 ? (
                <ul className="absolute top-full left-0 z-50 w-full mt-1 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
                  {filteredData.map((account) => (
                    <li
                      key={account.id}
                      className="px-4 py-2 cursor-pointer hover:bg-muted"
                      onClick={() => {
                        onSelectProduct(account);
                        setFilteredData([]);
                        setGot(true);
                      }}
                    >
                      <table className='w-full'>
                        <thead>
                          <tr>
                            <th className='w-1/3 text-left'>Name</th>
                            <th className='w-1/3 text-left'>Company Name</th>
                            <th className='w-1/3 text-left'>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 text-left">{account.name}</td>
                            <td className="py-2 text-left">{account.companyName}</td>
                            <td className="py-2 text-left">{account.address}</td>
                          </tr>
                        </tbody>
                      </table>
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
          </div>
        </div>
          
      {/* Responsive Grid: 1 column on mobile, 2 on desktop */}
      <div className="w-[100%] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
        <div className="w-[100%] flex flex-col gap-1.5">
          <label className="text-xs font-semibold pl-1 text-slate-500 uppercase">Name</label>
          <input
            type="text"
            placeholder='Name'
            value={supplier.name}
            disabled
            className="p-3 bg-slate-50 h-[40px] w-[100%] border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold pl-1 text-slate-500 uppercase">Company Name</label>
          <input 
            type="text"
            value={supplier.companyName}
            disabled
            placeholder="Company Name" 
            className="p-3 bg-slate-50 border h-[40px] border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs pl-1 font-semibold text-slate-500 uppercase">Phone</label>
          <input 
            type="text" 
            value={supplier.phoneNo}
            disabled
            placeholder="Phone Number" 
            className="p-3 bg-slate-50 h-[40px] border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold pl-1 text-slate-500 uppercase">Address</label>
          <textarea 
            value={supplier.address}
            disabled
            placeholder="Address" 
            rows="1"
            className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        
      </div>
    </div>
  );
};

export default InvoiceAccountDetailModel;