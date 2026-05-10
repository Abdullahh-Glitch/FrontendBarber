import React from 'react'
import { Eye } from 'lucide-react';

export default function ItemCard({data, dataType, onAdd}) {
  return (
    <div
    className={'border px-5 py-1 text-[15px] rounded-xl ' + (dataType === "service" ? 'h-[80px]' : 'h-[60px]') + " bg-gradient-to-t from-[var(--itemCard--from)] to-[var(--itemCard--to)] shadow-[var(--shadow)] text-[var(--text-color)] w-auto flex flex-col justify-center items-center flex-shrink-0"}
    onClick={()=> onAdd(data.id, data.name, dataType === "service" ? data.price : data.salesPrice, dataType)}
    >
      <p className='font-bold'>{data.name}</p>
      {dataType === "product" && <p className='text-[13px] '>Rs.{data?.salesPrice ? data.salesPrice.toFixed(2) : '...'}</p>}
      {dataType === "service" && <p className='text-[13px] '>Rs.{data?.price ? data.price.toFixed(2) : '...'}</p>}
      {dataType === "service" && (
        <button className='bg-blue-300 hover:bg-blue-400 h-5 w-5 flex items-center justify-center rounded-sm' title='preview'><Eye /></button>
      )}
    </div>
  )
}
