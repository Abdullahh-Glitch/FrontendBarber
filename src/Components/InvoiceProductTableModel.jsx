import React from 'react';

const InvoiceProductTableModel = ({ items, onUpdate, onDelete }) => {

  return (
    <div className="w-full text-[var(--text-color)] h-[98%] rounded-2xl shadow-lg">
      <div className="overflow-auto thin-scrollbar bg-gradient-to-r from-[var(--table--from)] to-[var(--table--to)] rounded-t-2xl h-full">
        <table className="w-full border border-border">
          
          <thead className="bg-[var(--table--header)] sticky top-0 z-10">
            <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
              <th className="p-3 w-[5%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Sr.</th>
              <th className="p-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Product Name</th>
              <th className="p-3 w-[13%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Pieces</th>
              <th className="p-3 w-[10%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Boxes</th>
              <th className="p-3 w-[12%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Pieces</th>
              <th className="p-3 w-[14%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Price/Box</th>
              <th className="p-3 w-[13%] text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</th>
              <th className="p-3 w-[12px]"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {items?.map((item, index) => (
              <tr key={index} className={`hover:bg-[var(--row--hover)] transition-colors border border-[var(--border-color)] border-border  duration-100 ${index % 2 === 0 ? 'bg-[var(--row--e)]' : 'bg-[var(--row--o)]'} h-[1px] ${item.currentStock === 0 ? "bg-red-50" : ""}`}>

                <td className="px-3 py-1 whitespace-nowrap text-center border-r border-border border-[var(--border-color)]">
                  {index + 1}
                </td>

                {/* PRODUCT NAME */}
                <td className="px-3 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  <input
                    type="text"
                    disabled={true}
                    value={item.name}
                    placeholder="Search product..."
                    className="w-full font-bold bg-transparent focus:outline-none focus:text-blue-600"
                  />
                </td>

                {/* PIECE */}
                <td className="px-3 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)]">
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
                <td className="px-3 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  <input
                    type="number"
                    min={0}
                    value={item.boxes}
                    onChange={(e) => onUpdate(index, "boxes", e.target.value)}
                    className="w-full font-semibold text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* TOTAL PIECES */}
                <td className="px-3 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  <input
                    type="number"
                    min={1}
                    value={item.totalPieces}
                    onChange={(e) => onUpdate(index, "totalPieces", e.target.value)}
                    className="w-full font-semibold text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* PRICE */}
                <td className="px-3 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  <input
                    type="number"
                    min={0}
                    value={item.price}
                    onChange={(e) => onUpdate(index, "price", e.target.value)}
                    className="w-full font-semibold text-center bg-transparent focus:outline-none"
                  />
                </td>

                {/* TOTAL */}
                <td className="px-3 py-1 font-bold whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  {item.totalAmount}
                </td>

                {/* DELETE */}
                <td className="px-3 py-1 whitespace-nowrap border-r border-border border-[var(--border-color)]">
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