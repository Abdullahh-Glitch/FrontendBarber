import { CircleX} from "lucide-react";

const ServiceProductModelTable = ({ products, setProducts, error }) => {

  const handleChange = (productId, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.productId === productId
          ? { ...p, usesCount: value }
          : p
      )
    );
  };
  
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.productId !== id));
  };

  if (products?.length === 0) {
    return (
      <div className="bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] rounded-2xl border border-border p-12 text-center shadow-lg">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-2xl">📦</div>
        </div>
        <p className="text-muted-foreground text-lg font-medium">
          No Products For This Service
        </p>
        <p className="text-muted-foreground text-sm mt-2">
          Add your first Service Product
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[98%] rounded-2xl shadow-lg">
      <div className="overflow-auto thin-scrollbar rounded-b-2xl h-full">
        <table className="w-full border border-border rounded-2xl">
          <thead className="bg-white/40 backdrop-blur-sm sticky top-0 z-10">
            <tr>
              <th className="px-2 py-3 w-[1%] text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Sr
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-2 py-3 w-[8%] text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Uses
              </th>
              <th className="px-2 py-3 w-[8%] text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Qty
              </th>
              <th className="px-2 py-3 w-[8%] text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Override
              </th>
              <th className="px-2 py-3 w-[25%] text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Usage Count
              </th>
              <th className="w-[8%]"></th>
            </tr>
          </thead>
          <tbody className="w-full h-full divide-y divide-border border border-border">
            {products?.map((service, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-700 transition-colors overflow-auto border border-[var(--border-color)] border-border  duration-100 ${
                  index % 2 === 0 ? "bg-black/40" : "bg-black/30"
                } h-[15px]`}
              >
                <td className="px-4 py-4 whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  <div>
                    <div className="text-sm text-center font-medium text-foreground">
                      {index + 1}
                    </div>
                  </div>
                </td>
                <td className="px-2 text-left whitespace-nowrap border-r border-border border-[var(--border-color)]">
                  {service.name}
                </td>
                <td className="text-center whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm text-foreground">
                  {service.uses}
                </td>
                <td className="text-center whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm font-mono text-foreground">
                  <p>{service.qtyRequired}</p>
                </td>
                <td className="whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm text-foreground text-center">
                  <p>{service.usesPerUnitOverride}</p>
                </td>
                <td className="px-1 whitespace-nowrap border-r border-border border-[var(--border-color)] text-sm text-foreground text-center">
                  <input
                    type="number"
                    min="0"
                    placeholder="Uses Count"
                    value={service.usesCount}
                    onChange={(e) =>
                      handleChange(
                        service.productId,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                   error ? "border-destructive" : "border-border"
                 }`}
                  />
                  {error[service.productId] && (
                    <p className="text-destructive text-sm mt-1">
                      {error[service.productId]}
                    </p>
                  )}
                </td>
                <td>
                  <button type="button" className="px-1.5">
                    <CircleX
                      className="hover:bg-red-600 rounded-2xl"
                      onClick={() => handleDelete(service.productId)}
                    />
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

export default ServiceProductModelTable;
