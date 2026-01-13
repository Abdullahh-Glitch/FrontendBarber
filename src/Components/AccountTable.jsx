import { Edit, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openAccountModalEdit, openConfirmDialog } from '../Features/accountSlice';
import Loader from "./Loader";

const ProductTable = ({ accounts, isLoading }) => {
  const dispatch = useDispatch();

  const onEdit = (account)=>{
    dispatch(openAccountModalEdit({account :account}));
  }

  const onDelete = (id)=>{
    dispatch(openConfirmDialog(id));
  }

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Loader
          size={64}
          text="Getting Products..."
          color="text-yellow-600"
        />
      </div>
    );
  }

  if (accounts?.length === 0) {
    return (
      <div className="bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] rounded-2xl border border-border p-12 text-center shadow-lg">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-2xl">📦</div>
        </div>
        <p className="text-muted-foreground text-lg font-medium">No Accounts found</p>
        <p className="text-muted-foreground text-sm mt-2">Add your first Account to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[98%] rounded-2xl shadow-lg">
      <div className="overflow-auto thin-scrollbar bg-gradient-to-r from-[var(--table--from)] to-[var(--table--to)] rounded-t-2xl h-full">
        <table className="w-full border border-border">
          <thead className="bg-[var(--table--header)] sticky top-0 z-10">
            <tr >
              <th className="py-3 w-[2%] text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Sr
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 py-3 w-[10%] text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-3 py-3 w-[15%] text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Mobile No.
              </th>
              <th className="px-3 py-3 w-[15%] text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Phone No.
              </th>
              <th className="px-2 py-3 w-[15%] text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Opening Balance
              </th>
              <th className="py-3 w-[10%] text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Is Active
              </th>
              <th className="pr-10 py-3 w-[10%] text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border border border-border">
            {accounts.map((account, index) => (
              <tr key={index} className={`hover:bg-[var(--row--hover)] transition-colors border border-[var(--border-color)] border-border  duration-100 ${index % 2 === 0 ? 'bg-[var(--row--e)]' : 'bg-[var(--row--o)]'} h-[5px]`}>
                <td className="pr-4 py-1 text-center whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  <div>
                    <div className="text-sm pl-4 font-medium text-foreground">{index +1}</div>
                  </div>
                </td>
                <td className="px-3 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  {account.name}
                </td>
                <td className="px-3 py-1 text-center whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {account.categoryId === 2 ? "Supplier" : account.categoryId === 3 ? "Customer" : ""}
                  </span>
                </td>
                <td className="px-3 py-1 text-left whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm text-foreground">
                  {account.mobileNo}
                </td>
                <td className="px-3 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm text-foreground text-left">
                  {account.phoneNo}
                </td>
                <td className="py-1 px-2 whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm text-foreground text-left font-bold">
                  {Number(account.openingBalance).toFixed(2)}
                </td>
                <td className={`px-3 py-1 text-center whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm font-mono ${account.isActive ? "font-bold" : ""}`}>
                  {account.isActive ? "Active" : "Not Active"}
                </td>
                <td className="pr-7 py-1 whitespace-nowrap border-r border-[var(--border-color)] border-border text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(account)}
                      className="text-muted-foreground hover:text-primary p-2 rounded-lg hover:bg-blue-500 transition-all duration-100 hover:scale-105"
                      title="Edit Product"
                    >
                      <Edit className="h-4 w-4" onClick={() => onEdit(account)} />
                    </button>
                    <button
                      onClick={() => onDelete(account.id)}
                      className="text-muted-foreground hover:text-destructive p-2 rounded-lg hover:bg-red-500 transition-all duration-200 hover:scale-105"
                      title="Delete Product"
                    >
                      <Trash2 className="h-4 w-4" onClick={()=> onDelete(account.id)} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;