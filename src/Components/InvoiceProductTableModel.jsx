import React from 'react';

const InvoiceProductTableModel = ({ items, onUpdate, onDelete }) => {

  return (
    <div className="w-full">
      <div className="w-full overflow-x-hidden rounded-xl border border-slate-200">
        <table className="w-full table-fixed text-left border-collapse bg-white">
          
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
              <th className="p-3 font-semibold">Product Name</th>
              <th className="p-3 font-semibold text-center">Pieces</th>
              <th className="p-3 font-semibold text-center">Qty</th>
              <th className="p-3 font-semibold text-center">Total Pieces</th>
              <th className="p-3 font-semibold text-center">Price</th>
              <th className="p-3 font-semibold text-right">Total</th>
              <th className="p-3 w-12"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {items?.map((item, index) => (
              <tr key={item.id} className={`relative hover:bg-slate-50 transition ${item.currentStock === 0 ? "bg-red-50" : ""}`}>

                {/* PRODUCT NAME */}
                <td className="p-3 relative">
                  <input
                    type="text"
                    disabled={true}
                    value={item.name}
                    placeholder="Search product..."
                    className="w-full bg-transparent focus:outline-none focus:text-blue-600"
                  />
                </td>

                {/* PIECE */}
                <td className="p-3">
                  <input
                    type="number"
                    min={0}
                    value={item.piece}
                    onChange={(e) => onUpdate(index, "piece", e.target.value)}
                    className="w-full text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* QTY */}
                <td className="p-3">
                  <input
                    type="number"
                    min={0}
                    value={item.qty}
                    onChange={(e) => onUpdate(index, "qty", e.target.value)}
                    className="w-full text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* TOTAL PIECES */}
                <td className="p-3">
                  <input
                    type="number"
                    min={1}
                    value={item.totalPiece}
                    onChange={(e) => onUpdate(index, "totalPiece", e.target.value)}
                    className="w-full text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* PRICE */}
                <td className="p-3">
                  <input
                    type="number"
                    min={0}
                    value={item.price}
                    onChange={(e) => onUpdate(index, "price", e.target.value)}
                    className="w-full text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* TOTAL */}
                <td className="p-3 text-right font-semibold">
                  {( (Number(item.qty || 1) * Number(item.price || 0)) + ((Number(item.price || 0) / Number(item.totalPiece || 1)) * Number(item.piece || 0)) ).toFixed(2)}
                </td>

                {/* DELETE */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => onDelete(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    🗑
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceProductTableModel;