import React from 'react'

export default function SalesInvoiceAccountDetailModel() {
  return (
    <>
    <h2 className="text-md font-semibold mb-3">
              Customer Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                // value={customerName}
                // onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                className="px-2 py-1 border rounded-md"
              />
              <input
                // value={customerPhone}
                // onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Phone Number"
                className="px-2 py-1 border rounded-md"
              />
              </div>
    </>
  )
}
