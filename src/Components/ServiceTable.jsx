import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openProductModal, setSelectedProduct, openConfirmDialog } from '../Features/productSlice';
import { GetServicesForTable } from '../Hooks/useServices';

const serviceTable = () => {
  const dispatch = useDispatch();

  const{ data: serviceData, isLoading: serviceIsLoading, isError: serviceIsError, error: serviceError} =GetServicesForTable();

  const onEdit = (product)=>{
    dispatch(openProductModal());
    dispatch(setSelectedProduct(product))
  }

  const onDelete = (id)=>{
    dispatch(openConfirmDialog(id));
  }

  if (serviceData?.length === 0) {
    return (
      <div className="bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] rounded-2xl border border-border p-12 text-center shadow-lg">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-2xl">📦</div>
        </div>
        <p className="text-muted-foreground text-lg font-medium">No Service found</p>
        <p className="text-muted-foreground text-sm mt-2">Add your first Service to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[98%] rounded-2xl shadow-lg">
      <div className="overflow-auto thin-scrollbar rounded-b-2xl h-full">
        <table className="w-full border border-border rounded-2xl">
          <thead className="bg-white/40 backdrop-blur-sm sticky top-0 z-10">
            <tr >
              <th className="px-6 py-3 w-[5%] text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Sr
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 w-[20%] text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 w-[15%] text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                durationMinutes
              </th>
              <th className="px-6 py-3 w-[15%] text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Products Used
              </th>
              <th className="pr-10 py-3 w-[15%] text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="w-full h-full divide-y divide-border border border-border">
            {serviceData?.map((service, index) => (
              <tr key={service.id} className={`hover:bg-gray-700 transition-colors border border-[var(--border-color)] border-border  duration-100 ${index % 2 === 0 ? 'bg-black/40' : 'bg-black/30'} h-[15px]`}>
                <td className="px-4 py-4 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  <div>
                    <div className="text-sm pl-4 font-medium text-foreground">{index +1}</div>
                  </div>
                </td>
                <td className="px-6 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  {service.name}
                </td>
                <td className="px-6 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm text-foreground">
                  {service.price}
                </td>
                <td className="px-6 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm font-mono text-foreground text-left">
                  {service.durationMinutes} Minutes
                </td>
                <td className="px-6 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm text-foreground text-center">
                  {service.prdNo}
                </td>
                <td className="px-6 py-1 whitespace-nowrap border-r border-[var(--border-color)] border-border text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                    //   onClick={() => onEdit(service)}
                      className="text-muted-foreground hover:text-primary p-3 rounded-lg hover:bg-blue-500 transition-all duration-100 hover:scale-105"
                      title="Edit service"
                    >
                      <Edit className="h-4 w-15" onClick={() => onEdit(service)} />
                    </button>
                    <button
                    //   onClick={() => onDelete(service.id)}
                      className="text-muted-foreground hover:text-destructive p-2 rounded-lg hover:bg-red-500 transition-all duration-200 hover:scale-105"
                      title="Delete service"
                    >
                      <Trash2 className="h-4 w-4" onClick={()=> onDelete(service.id)} />
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

export default serviceTable;