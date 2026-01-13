import React, { useEffect, useState } from "react";
import { Plus, Search, Filter} from "lucide-react";
import {GetAccounts, DeleteAccount} from "../Hooks/useAccounts";
import { useSelector, useDispatch } from "react-redux";
import { openAccountModal, closeConfirmDialog } from "../Features/accountSlice";
import AccountTable from "../Components/AccountTable";
import AccountModel from "../Components/AccountModel";
import ConfirmDialog from "../Components/ConfirmDialog";

export default function ProductPage() {
  const dispatch = useDispatch();

  const{ data: AccountsData, isLoading: accountIsLoading, isError: accountIsError, error: accountError} = GetAccounts();
  const{mutate: softDelete, isPending: deletePending}  = DeleteAccount();


  const [searchTerm, setSearchTerm] = useState("");
  const accId = useSelector((state)=>state.accounts.selectedAccountId);
  const accountModelState = useSelector((state) => state.accounts.isAccountModal);
  const confirmDialog = useSelector((state) => state.accounts.isConfirmDialog);
  const [filteredAccounts, setFilteredAccounts] = useState(AccountsData || []);

  useEffect(() => {
  setFilteredAccounts(AccountsData || []);
}, [AccountsData]);

  const handdleSearch=(e)=>{
    const term = e.target.value;
    setSearchTerm(term);

    const results = (AccountsData || []).filter((account) => {
    const name = account?.name?.toLowerCase() || "";
    return name.toLowerCase().includes(term);
  });

  setFilteredAccounts(results);
  }

const handdleOpenNewProductModal=()=>{
  dispatch(openAccountModal());
}

const onConfirm = async()=>{
    if(!accId) dispatch(closeConfirmDialog());

    softDelete({accountId: accId},{
        onSuccess : ()=>{
          dispatch(closeConfirmDialog());
        },
        onError : (error)=>{
          console.log(error.message);
        }
      });
  }

const onCancel = () => {
    dispatch(closeConfirmDialog());
  }

  if(accountIsError) return <h1>Products Error : {accountError.message}</h1>

  return (
    <div className="fixed w-full h-full bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-white flex flex-col items-center justify-center">
      <div className="h-[30%] w-full flex items-center justify-center">
        <div className="w-[90%] h-[60%] bg-gradient-to-r from-[var(--secondary-from)] to-[var(--secondary-to)] border border-[var(--border-color)] rounded-[30px] flex flex-col justify-center shadow-[var(--shadow-color)] text-[var(--text-color)]">
          <h1 className="pl-10 text-2xl font-bold text-foreground">Accounts</h1>
          <p className="pl-10 text-muted-foreground">
            Manage your barber shop accounts
          </p>
        </div>
      </div>
      {/* main */}
      <div>{accountModelState && (<AccountModel />)}</div>
      <div>{confirmDialog && (<ConfirmDialog onConfirm={()=>onConfirm()} onCancel={()=>onCancel()} isPending={deletePending} />)}</div>
      <div className="h-[75%] w-full flex justify-center text-[var(--text-color)]">
        <div className="w-[98%] h-[100%] flex flex-col border border-[var(--border-color)] rounded-[30px] bg-gradient-to-b from-[var(--main--from)] to-[var(--main--to)] shadow-[var(--shadow-color)] p-6">

          <div className="flex flex-col sm:flex-row gap-4 w-[100%]">

            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search Service by name..."
                value={searchTerm}
                onChange={handdleSearch}
                className="w-[100%] pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground placeholder-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm transition-all duration-200"
              />
            </div>
            
            <div className="flex gap-2">

              <button className="px-6 py-3 border border-border rounded-xl text-foreground hover:bg-secondary hover:border-secondary transition-all duration-200 flex items-center gap-2 font-medium">
                <Filter className="h-4 w-4" />
                Filter
              </button>

              <button
                onClick={handdleOpenNewProductModal}
                className="px-6 py-3 bg-gradient-primary border text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>

            </div>

          </div>
          <div className="mt-4 h-[70%] overflow-y-auto">
            <AccountTable accounts={filteredAccounts} isLoading={accountIsLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
