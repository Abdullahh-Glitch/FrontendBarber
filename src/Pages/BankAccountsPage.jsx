import React, { useEffect, useState } from "react";
import { Plus, Search, Filter} from "lucide-react";
import { DeleteAccount } from "../Hooks/useAccounts";
import {GetBankAccounts} from "../Hooks/useBankAccounts";
import { useSelector, useDispatch } from "react-redux";
import { openBankAccountModal, openBankConfirmDialog } from "../Features/bankAccountSlice";
import BankAccountModel from "../Components/BankAccountModel";
import BankAccountTable from "../Components/BankAccountTable";
import ConfirmDialog from "../Components/ConfirmDialog";

export default function ProductPage() {
  const dispatch = useDispatch();

  const{ data: BankAccountsData, isLoading: bankAccountIsLoading, isError: bankAccountIsError, error: bankAccountError} = GetBankAccounts();
  const{mutate: softDelete, isPending: deletePending}  = DeleteAccount();


  const [searchTerm, setSearchTerm] = useState("");
  const bankAccId = useSelector((state)=>state.bankAccounts.selectedBankAccountId);
  const bankAccountModelState = useSelector((state) => state.bankAccounts.isBankAccountModal);
  const confirmDialog = useSelector((state) => state.bankAccounts.isBankConfirmDialog);
  const [filteredAccounts, setFilteredAccounts] = useState(BankAccountsData || []);

  useEffect(() => {
  setFilteredAccounts(BankAccountsData || []);
}, [BankAccountsData]);

  const handdleSearch=(e)=>{
    const term = e.target.value;
    setSearchTerm(term);

    const results = (BankAccountsData || []).filter((account) => {
    const name = account?.name?.toLowerCase() || "";
    return name.toLowerCase().includes(term.toLowerCase());
  });

  setFilteredAccounts(results);
  }

const handdleOpenNewBankAccountModal=()=>{
  dispatch(openBankAccountModal());
}

const onConfirm = async()=>{
    if(!bankAccId) dispatch(openBankConfirmDialog());

    softDelete({accountId: bankAccId},{
        onSuccess : ()=>{
          dispatch(openBankConfirmDialog());
        },
        onError : (error)=>{
          console.log(error.message);
        }
      });
  }

const onCancel = () => {
    dispatch(openBankConfirmDialog());
  }

  if(bankAccountIsError) return <h1>Products Error : {bankAccountError.message}</h1>

  return (
    <div className="fixed w-full h-[98vh] bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-white flex flex-col items-center overflow-y-auto">
      <div className="md:h-[25%] h-[15%] w-full flex items-center justify-center">
        <div className="w-[97%] h-[60%] bg-gradient-to-t from-[var(--tag--from)] to-[var(--tag--to)] border border-[var(--border-color)] rounded-[20px] md:rounded-[30px] flex flex-col justify-center shadow-[var(--shadow-color)] text-[var(--text-color)]">
          <h1 className="pl-7 md:pl-10 text-2xl font-bold text-foreground">Bank Accounts working...</h1>
          <p className="pl-7 md:pl-10 text-muted-foreground">
            Manage your barber shop bank accounts
          </p>
        </div>
      </div>
      {/* main */}
      <div>{bankAccountModelState && (<BankAccountModel />)}</div>
      <div>{confirmDialog && (<ConfirmDialog onConfirm={()=>onConfirm()} onCancel={()=>onCancel()} isPending={deletePending} />)}</div>
      <div className="h-[75%] w-full flex justify-center text-[var(--text-color)]">
        <div className="w-[98%] h-[100%] flex flex-col border border-[var(--border-color)] rounded-[30px] bg-gradient-to-b from-[var(--main--from)] to-[var(--main--to)] shadow-[var(--shadow-color)] p-6">

          <div className="flex flex-col md:flex-row md:gap-4 gap-2 w-[100%]">

            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search Bank Account by name..."
                value={searchTerm}
                onChange={handdleSearch}
                className="w-[100%] pl-10 py-3 h-[40px] md:h-[45px] border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground placeholder-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm transition-all duration-200"
              />
            </div>
            
            <div className="flex gap-2">

              <button className="px-6 py-3 h-[40px] md:h-[45px] border border-border rounded-xl text-foreground hover:bg-secondary hover:border-secondary transition-all duration-200 flex items-center gap-2 font-medium">
                <Filter className="h-4 w-4" />
                Filter
              </button>

              <button
                onClick={handdleOpenNewBankAccountModal}
                className="px-6 py-3 h-[40px] md:h-[45px] bg-gradient-primary border text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Bank Account
              </button>

            </div>

          </div>
          <div className="mt-4 h-[70%] overflow-y-auto">
            <BankAccountTable accounts={filteredAccounts} isLoading={bankAccountIsLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
