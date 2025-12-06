import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirmDialog } from "../Features/productSlice";
import {DeleteProduct} from "../Hooks/useProducts"

const ConfirmDialog = () => {
  const dispatch = useDispatch();
  const prdId = useSelector((state)=>state.products.selectedProductId);
  const{mutate: softDelete,isPending}  = DeleteProduct();

  const onCancel = () => {
    dispatch(closeConfirmDialog());
  }
  const onConfirm =  ()=>{
    if(!prdId) dispatch(closeConfirmDialog());

    softDelete(prdId,{
        onSuccess : ()=>{
          dispatch(closeConfirmDialog());
        },
        onError : (error)=>{
          console.log(error.message);
        }
      });
    
    
    
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black/50 rounded-2xl max-w-md w-full shadow-xl border border-border">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-foreground">Are You Sure?</h3>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-muted-foreground leading-relaxed">This action cannot be undone. Do you want to continue?</p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-6 py-3 text-foreground rounded-xl hover:bg-sky-600 transition-all duration-200 font-medium 
              hover:shadow-lg hover:shadow-white/60"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled= {isPending}
              className="px-6 py-3 bg-destructive text-destructive-foreground rounded-xl hover:bg-red-500 hover:shadow-lg hover:shadow-red-400 transition-all duration-200 font-medium"
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;