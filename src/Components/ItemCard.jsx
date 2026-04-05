import React from 'react'
import { Eye } from 'lucide-react';

export default function ItemCard({data, dataType}) {
  return (
    <div className={'border px-5 py-1 text-[15px] rounded-xl ' + (dataType === "service" ? 'h-[80px]' : 'h-[60px]') + " bg-green-200 w-auto flex flex-col justify-center items-center flex-shrink-0"}>
      <p className='font-bold'>{data.name}</p>
      <p className='text-[13px] '>Rs.{data?.salesPrice ? data.salesPrice.toFixed(2) : '...'}</p>
      {dataType === "service" && (
        <button className='bg-blue-300 hover:bg-blue-400 h-5 w-5 flex items-center justify-center rounded-sm' title='preview'><Eye /></button>
      )}
    </div>
  )
}
