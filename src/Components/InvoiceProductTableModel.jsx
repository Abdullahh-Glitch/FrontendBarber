import React from 'react';

const InvoiceProductTableModel = ({ items, onUpdate, onDelete }) => {

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full table-fixed text-left border-collapse bg-white overflow-x-auto">
          
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
              <th className="p-3 w-[5%] font-bold">Sr.</th>
              <th className="p-3 font-bold">Product Name</th>
              <th className="p-3 w-[13%] font-bold text-center">Pieces</th>
              <th className="p-3 w-[10%] font-bold text-center">Boxes</th>
              <th className="p-3 w-[12%] font-bold text-center">Total Pieces</th>
              <th className="p-3 w-[14%] font-bold text-center">Price/Box</th>
              <th className="p-3 w-[13%] font-bold text-right">Total</th>
              <th className="p-3 w-12"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {items?.map((item, index) => (
              <tr key={index} className={`relative w-full hover:bg-slate-50 transition ${item.currentStock === 0 ? "bg-red-50" : ""}`}>

                <td className="p-3 font-semibold">
                  {index + 1}
                </td>

                {/* PRODUCT NAME */}
                <td className="px-3 border relative">
                  <input
                    type="text"
                    disabled={true}
                    value={item.name}
                    placeholder="Search product..."
                    className="w-full font-bold bg-transparent focus:outline-none focus:text-blue-600"
                  />
                </td>

                {/* PIECE */}
                <td className="p-3">
                  <input
                    type="number"
                    min={0}
                    max={item.totalPieces - 1}
                    value={item.pieces}
                    onChange={(e) => onUpdate(index, "pieces", e.target.value)}
                    className="w-full font-semibold text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* QTY */}
                <td className="p-3">
                  <input
                    type="number"
                    min={0}
                    value={item.boxes}
                    onChange={(e) => onUpdate(index, "boxes", e.target.value)}
                    className="w-full font-semibold text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* TOTAL PIECES */}
                <td className="p-3">
                  <input
                    type="number"
                    min={1}
                    value={item.totalPieces}
                    onChange={(e) => onUpdate(index, "totalPieces", e.target.value)}
                    className="w-full font-semibold text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* PRICE */}
                <td className="p-3">
                  <input
                    type="number"
                    min={0}
                    value={item.price}
                    onChange={(e) => onUpdate(index, "price", e.target.value)}
                    className="w-full font-semibold text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* TOTAL */}
                <td className="p-3 text-right font-bold">
                  {item.totalAmount}
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