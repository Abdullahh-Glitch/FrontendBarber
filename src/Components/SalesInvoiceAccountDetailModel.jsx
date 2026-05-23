  import {useState, useEffect, useRef} from 'react'
  import { GetCustomersByName, GetCustomersByPhone } from '../Hooks/useAccounts';
  import { useDispatch } from "react-redux";
  import { setSelectedCustomerId, setSelectedEmployeeId, removeAccountId } from '../Features/invoiceSlice';

  export default function SalesInvoiceAccountDetailModel({side}) {

    const dispatch = useDispatch();
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const[got,setGot]= useState(false);
    const [dataOf, setDataOf] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const { data: gotData } = GetCustomersByName(customerName);
    const { data: gotEmployeeData } = GetCustomersByName(employeeName);
    const { data: gotPhoneData } = GetCustomersByPhone(customerPhone);
    const [activeIndex, setActiveIndex] = useState(-1);
    const itemRefs = useRef([]);

    useEffect(() => {
        if (gotData?.length > 0 && !got && customerName.trim() !== "") {
          setFilteredData(gotData);
        }
        if (gotEmployeeData?.length > 0 && !got && employeeName.trim() !== "") {
          setFilteredData(gotEmployeeData.filter((item) => item.categoryId === 2));
        }
        if (gotPhoneData?.length > 0 && !got && customerPhone.trim() !== "") {
          setFilteredData(gotPhoneData);
        }
        
      }, [gotData,customerName,customerPhone,got,gotPhoneData,gotEmployeeData,employeeName]);
    
    useEffect(() => {
    if (activeIndex >= 0) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      dispatch(removeAccountId());
    }
  }, [dispatch]);

    const onSearchCustomer = (e) => {
    setCustomerName(e.target.value);
    setCustomerPhone("");
    setDataOf("name");
    setGot(false);
    if (e.target.value.trim() === "") {
      setFilteredData([]);
      return;
    }
  }

    const onSearchEmployee = (e) => {
    setEmployeeName(e.target.value);
    setGot(false);
    if (e.target.value.trim() === "") {
      setFilteredData([]);
      return;
    }
  }

    const onSearchCustomerPhone = (e) => {
    setCustomerPhone(e.target.value);
    setCustomerName("");
    setDataOf("phone");
    setGot(false);
    if (e.target.value.trim() === "") {
      setFilteredData([]);
      return;
    }
  }
    const onSelectClient = (account) => {
      if (!account) return;
      setCustomerName(account.name);
      setCustomerPhone(account.phoneNo || account.mobileNo || "");
      dispatch(setSelectedCustomerId(account.id));
      setFilteredData([]);
      setGot(true);
    }

      const onSelectEmployee = (account) => {
      if (!account) return;
      setEmployeeName(account.name);
      dispatch(setSelectedEmployeeId(account.id));
      setFilteredData([]);
      setGot(true);
    }

    const handleKeyDownSearch = (e,onselect) => {  
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filteredData.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : filteredData.length - 1
        );
      }

      if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        onselect(filteredData[activeIndex]);
        setActiveIndex(-1);
      }
  };

    if(side === "right"){
      return (
        <>
        <div className='w-full relative'>
          <div className='flex flex-row justify-center items-center gap-2'>
          <label htmlFor="CN" className='font-semibold text-[14px] w-[37%] flex justify-center align-middle'>Employee Name: </label>
          <input
          id='CN'
          onKeyDown={(e) => handleKeyDownSearch(e, onSelectEmployee)}
          value={employeeName}
          onChange={(e)=> onSearchEmployee(e)}
          autoComplete="off"
          placeholder="Employee Name"
          className="w-full h-[31px] border rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
        />
          </div>
      {employeeName.trim() &&
        (filteredData.length > 0 ? (
          <ul className="absolute top-full left-0 z-50 w-full mt-1 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
            {filteredData.map((account,index) => (
              <li
                key={account.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`px-4 py-2 cursor-pointer hover:bg-muted`}
                onClick={() => {
                  onSelectEmployee(account);
                  setFilteredData([]);
                  setGot(true);
                }}
              >
                <table className={'w-full ' + (activeIndex === index ? 'bg-red-500' : '')}>
                  <thead>
                    <tr>
                      <th className='w-1/3 text-left pl-1 border'>Name</th>
                      <th className='w-1/3 text-left pl-1 border'>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=''>
                      <td className="p-[0.4px] text-left pl-1 border">{account.name}</td>
                      <td className="py-[0.4px] text-left pl-1 border">{account.phone ? account.phone : account.mobileNo}</td>
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
        </>
      )
    }



    if(side === "left"){
      return (
        <>
      <div className='w-full text-[var(--text-color)] font-bold text-[15px]'>
        <div className='w-1/2'><h2 className="text-[20px] font-bold mb-3">Customer Details</h2></div>
      </div>

      <hr className='py-1' />
      
      <div className="flex flex-col w-full md:flex-row gap-2 text-[15px] text-[var(--text-color)] font-bold">
        <div className='w-full md:w-1/2 relative'>
          <label htmlFor="CN" className='pl-1'>Customer Name</label>
          <input
          id='CN'
          onKeyDown={(e) => handleKeyDownSearch(e, onSelectClient)}
          value={customerName}
          onChange={(e)=> onSearchCustomer(e)}
          autoComplete="off"
          placeholder="Customer Name"
          className="px-2 py-1 w-full border rounded-md placeholder:font-semibold text-white"
        />
      {customerName.trim() &&
        (filteredData.length > 0 ? (
          <ul className="absolute top-full left-0 z-50 w-full mt-1 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
            {dataOf === "name" && filteredData.map((account,index) => (
              <li
                key={account.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`px-4 py-2 cursor-pointer hover:bg-muted`}
                onClick={() => {
                  onSelectClient(account);
                  setFilteredData([]);
                  setGot(true);
                }}
              >
                <table className={'w-full ' + (activeIndex === index ? 'bg-red-500' : '')}>
                  <thead>
                    <tr>
                      <th className='w-1/3 text-left pl-1 border'>Name</th>
                      <th className='w-1/3 text-left pl-1 border'>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=''>
                      <td className="p-[0.4px] text-left pl-1 border">{account.name}</td>
                      <td className="py-[0.4px] text-left pl-1 border">{account.phone ? account.phone : account.mobileNo}</td>
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
        <div className='w-full md:w-1/2 relative'>
          <label htmlFor="CP" className='pl-1'>Phone Number</label>
          <input
          id='CP'
          onKeyDown={(e) => handleKeyDownSearch(e, onSelectClient)}
          value={customerPhone}
          onChange={(e)=> onSearchCustomerPhone(e)}
          placeholder="Phone Number"
          className="px-2 py-1 w-full border rounded-md placeholder:font-semibold text-white"
        />
        {customerPhone.trim() &&
        (filteredData.length > 0 ? (
          <ul className="absolute top-full left-0 z-50 w-full mt-1 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
            {dataOf === "phone" && filteredData.map((account,index) => (
              <li
                key={account.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`px-4 py-2 cursor-pointer hover:bg-muted`}
                onClick={() => {
                  onSelectClient(account);
                  setFilteredData([]);
                  setGot(true);
                }}
              >
                <table className={'w-full ' + (activeIndex === index ? 'bg-red-500' : '')}>
                  <thead>
                    <tr>
                      <th className='w-1/3 text-left pl-1 border'>Name</th>
                      <th className='w-1/3 text-left pl-1 border'>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=''>
                      <td className="p-[0.4px] text-left pl-1 border">{account.name}</td>
                      <td className="py-[0.4px] text-left pl-1 border">{account.phone ? account.phone : account.mobileNo}</td>
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
      </>
    )
  }
  }
