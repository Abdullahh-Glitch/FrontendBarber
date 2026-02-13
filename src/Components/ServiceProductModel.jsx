import { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { GetProducts } from "../Hooks/useProducts";
import { PostServices, GetServiceProductsByServiceId, UpdateServiceAndProducts } from "../Hooks/useServices";
import { useSelector, useDispatch } from "react-redux";
import { closeServiceProductModal, openServiceModal } from "../Features/serviceSlice";
import ServiceProductModelTable from "./ServiceProductModelTable";
import { validateUsesCount } from "../Handlers/serviceProductHandler";

const ServiceProductModel = () => {
  const dispatch = useDispatch();

  const { data: productData } = GetProducts();
  const { mutateAsync: saveService, isPending: isSavePending } = PostServices();
  const { mutateAsync: EditService, isPending: isEditPending } = UpdateServiceAndProducts();

  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [got, setGot] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const newService = useSelector((state) => state.services.newService);
  const serviceId = useSelector((state) => state.services.selectedServiceId);
  const isEdit = useSelector((state) => state.services.edit);

  const { data: serviceProductData } = GetServiceProductsByServiceId(
    serviceId,
    { enabled: !!serviceId }
  );

  useEffect(() => {
    if (!isEdit || !serviceProductData || !productData) return;

    const merged = serviceProductData.map((sp) => {
      const product = productData.find((p) => p.id === sp.productId);
      const uses = product?.usesPerUnit ?? 0;

      return {
        productId: sp.productId,
        name: product?.name || "",
        uses,
        usesCount: uses * sp.qtyRequired + sp.usesPerUnitOverride,
      };
    });

    setSelectedProducts(merged);
    
  }, [isEdit, serviceProductData, productData]);

  const computedProducts = useMemo(() => {
    return selectedProducts.map((p) => (
    {
      ...p,
      qtyRequired: Math.floor(p.usesCount / p.uses),
      usesPerUnitOverride: p.usesCount % p.uses,
    }));
  }, [selectedProducts]);

  const addProduct = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.productId === product.id);

      if (exists) {
        return prev.map((p) =>
          p.productId === product.id
            ? { ...p, usesCount: p.usesCount + 1 }
            : p
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          uses: product.usesPerUnit,
          usesCount: 1,
        },
      ];
    });

    setName("");
    setFilteredData([]);
    setGot(true);
  };

  const onClose = () => {
    dispatch(closeServiceProductModal());
  };
  const onBack = () => {
    dispatch(openServiceModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasError = false;

    selectedProducts.forEach((p) => {
      const err = validateUsesCount(p.usesCount);
      if (err) {
        hasError = true;
        newErrors[p.productId] = err; // store the actual message
      }
    });
    console.log(newErrors);


    if (hasError) {
      setError(newErrors); // update state once
      return; // stop submission
    }

    const productsPayload = computedProducts.map(
      ({ name, uses, usesCount, ...rest }) => ({
        ...rest,
        qtyRequired: Math.floor(usesCount / uses),
        usesPerUnitOverride: usesCount % uses,
      })
    );

    try {
       if (isEdit) {
      await EditService({
        serviceId,
        service: newService,
        products: productsPayload,
      });
    } else {
      await saveService({
        service: newService,
        products: productsPayload,
      });
    }

    setSelectedProducts([]);
    setName("");
    dispatch(closeServiceProductModal());

    } catch (error) {
      console.log(error);
    }
  };

const handleChange = (e) => {
  const term = e.target.value;
    setName(term);

    if (!term.trim()) {
      setFilteredData([]);
      return;
    }

    const results = productData.filter(
      (product) =>
        product.isServiceProduct === true &&
        product.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredData(results);
    setGot(false);
};


  return (
    <div className="fixed inset-0 bg-black/60 text-white backdrop-blur-sm flex items-center justify-center mt-5 z-50">
      <div className="bg-gradient-card rounded-2xl max-w-2xl w-full max-h-[80vh] thin-scrollbar overflow-y-auto shadow-xl border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {isEdit
              ? `Edit Products of ${newService.name} Service`
              : `Add Products for ${newService.name} Service`}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-all duration-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-foreground mb-2">
              Search Product Name:
            </label>

            <input
              type="text"
              value={name}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 border rounded-xl bg-card text-foreground focus:outline-none focus:ring-2"
              placeholder="Enter Product Name"
            />

            {name && (
              <button
                type="button"
                onClick={() => {
                  setName("");
                  setFilteredData([]);
                }}
                className="absolute right-3 top-[42px] text-muted-foreground hover:text-foreground"
              >
                ✖
              </button>
            )}

            {name.trim() &&
              (filteredData.length > 0 ? (
                <ul className="absolute z-50 w-full mt-2 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
                  {filteredData.map((product) => (
                    <li
                      key={product.id}
                      className="px-4 py-2 cursor-pointer hover:bg-muted"
                      onClick={() => {
                        addProduct(product);
                        setFilteredData([]);
                        setGot(true);
                      }}
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              ) : !got ? (
                <ul className="absolute z-20 w-full mt-2 border rounded-xl shadow-lg max-h-60 bg-gradient-to-r from-[var(--from-color)] to-[var(--to-color)] text-[var(--text-color)] thin-scrollbar overflow-y-auto">
                  <li className="px-4 py-2 cursor-pointer hover:bg-muted">
                    No Records Found
                  </li>
                </ul>
              ) : (
                ""
              ))}
          </div>

          {/* separation */}
          <div className="grid grid-cols-1 overflow-y-auto">
            <ServiceProductModelTable
              products={computedProducts}
              setProducts={setSelectedProducts}
              error = {error}
              setError = {setError}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-border text-foreground rounded-xl hover:bg-secondary transition-all duration-200 font-medium cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              // disabled={isSavePending || isEditPending}
              className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium cursor-pointer"
            >
              {isSavePending
                ? "Saving..."
                : isEditPending
                ? "Updating..."
                : isEdit
                ? "Update"
                : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceProductModel;
