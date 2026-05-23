import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CreateAccount, UpdateAccount } from "../Hooks/useAccounts";
import { CreateBankAccount } from "../Hooks/useBankAccounts";
import { useSelector, useDispatch } from "react-redux";
import { closeBankAccountModal } from "../Features/bankAccountSlice";
import { validateForm } from "../Handlers/accountHandler";

const BankAccount = () => {
  const dispatch = useDispatch();
  const { mutateAsync: saveBankAccount, isPending: isSavePending } =
    CreateBankAccount();
  const { mutateAsync: editAccount, isPending: isEditPending } =
    UpdateAccount();

  const bankAccount = useSelector(
    (state) => state.bankAccounts.selectedBankAccount,
  );
  const isEdit = bankAccount !== null;

  const onClose = () => {
    dispatch(closeBankAccountModal());
  };

  const [formData, setFormData] = useState({
    bankName : "",
    accountNo : "",
    IBANNo : "",
    accountPersonName : "",
    accountPersonPhoneNo : "",
    accountPersonAddress : "",
    branchCode : "",
    branchHelplineNumber : "",
    branchHelplineEmail : "",
    branchAddress : "",
    branchPersonName : "",
    branchPersonPhone : "",
    branchPersonEmail : "",
    openingBalance: "",
    bType: "",
    inActive: false,
  });

  const [errors, setErrors] = useState({});
  const [id, setId] = useState(0);

  const clearForm = () => {
    setId(0);
    setFormData({
      bankName : "",
      accountNo : "",
      IBANNo : "",
      accountPersonName : "",
      accountPersonPhoneNo : "",
      branchCode : "",
      branchHelplineNumber : "",
      branchHelplineEmail : "",
      branchAddress : "",
      branchPersonName : "",
      branchPersonPhone : "",
      branchPersonEmail : "",
      openingBalance: "",
      bType: "",
      inActive: false,
    });
  };

  useEffect(() => {
    if (bankAccount) {
      setId(bankAccount.id);
      setFormData({
        bankName: bankAccount.bankName || "",
        accountNo: bankAccount.accountNo || "",
        IBANNo: bankAccount.IBANNo || "",
        accountPersonName: bankAccount.accountPersonName || "",
        accountPersonPhoneNo: bankAccount.accountPersonPhoneNo || "",
        branchCode: bankAccount.branchCode || "",
        branchHelplineNumber: bankAccount.branchHelplineNumber || "",
        branchHelplineEmail: bankAccount.branchHelplineEmail || "",
        branchAddress: bankAccount.branchAddress || "",
        branchPersonName: bankAccount.branchPersonName || "",
        branchPersonPhone: bankAccount.branchPersonPhone || "",
        branchPersonEmail: bankAccount.branchPersonEmail || "",
        openingBalance:
          String(
            bankAccount.openingBalance < 0
              ? bankAccount.openingBalance * -1
              : bankAccount.openingBalance,
          ) || "",
        bType: bankAccount.openingBalance > 0 ? "Dr" : "Cr",
        inActive: bankAccount.inActive || false,
      });
    }
  }, [bankAccount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
    

    // if (!validateForm(formData, setErrors)) return;

    // console.log("validation passed");
    // console.log(formData);

    if (!isEdit) {
      saveBankAccount(formData, {
        onSuccess: () => onClose(),
        onError: (error) => {
          console.log("SERVER ERROR:", error.response?.data);
        },
      });
    }
    // if (isEdit) {
    //   editAccount(
    //     { accountId: id, account: formData },
    //     {
    //       onSuccess: () => onClose(),
    //       onError: (error) => {
    //         console.log("SERVER ERROR:", error.response?.data);
    //       },
    //     },
    //   );
    // }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      return updated;
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = () => {
    if (formData.openingBalance !== "") {
      setFormData((prev) => ({
        ...prev,
        openingBalance: Number(prev.openingBalance).toFixed(2),
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center mt-5 z-50">
      <div className="bg-[#3A6073] rounded-2xl w-[80%] max-h-[80vh] overflow-y-auto shadow-xl border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {isEdit ? "Edit Account" : "Add New  BankAccount"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-all duration-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-4 md:h-full gap-4">

          {/* bank Details */}
          <div className="h-full">
            <div className="bg-gradient-to-t from-[var(--tag--from)] to-[var(--tag--to)] h-full border-b border-[var(--border-color)] p-4 rounded-2xl text-[var(--text-color)]">
            <h2 className="font-bold">Bank Details</h2>
            <hr className="my-2" />
            <div className="grid grid-cols-1 gap-3">
            <div >
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bank Name (e.g, UBL - 0123456) *
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => handleChange("bankName", e.target.value)}
                  className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                    errors.bankName
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:ring-primary/20"
                  } focus:outline-none focus:ring-2 focus:border-primary`}
                  placeholder="Enter Bank Name"
                />
                {errors.bankName && (
                  <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                    {errors.bankName}
                  </p>
                )}
              </div>
            </div>

            
              <div>
                <label className="block text-sm font-medium text-foreground ">
                  Account No. *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={formData.accountNo}
                    onChange={(e) => handleChange("accountNo", e.target.value)}
                    className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                      errors.accountNo
                        ? "border-destructive focus:ring-destructive/20"
                        : "border-border focus:ring-primary/20"
                    } focus:outline-none focus:ring-2 focus:border-primary`}
                    placeholder="Enter Account No."
                  />
                  {errors.accountNo && (
                    <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                      {errors.accountNo}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground ">
                  IBAN No. 
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={formData.IBANNO}
                    onChange={(e) => handleChange("IBANNo", e.target.value)}
                    className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                      errors.IBANNO
                        ? "border-destructive focus:ring-destructive/20"
                        : "border-border focus:ring-primary/20"
                    } focus:outline-none focus:ring-2 focus:border-primary`}
                    placeholder="Enter IBAN No."
                  />
                  {errors.IBANNO && (
                    <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                      {errors.IBANNO}
                    </p>
                  )}
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Account Person Details */}
          <div className="h-full">
            <div className="bg-gradient-to-t from-[var(--tag--from)] to-[var(--tag--to)] h-full border-b border-[var(--border-color)] p-4 rounded-2xl text-[var(--text-color)]">
            <h2 className="font-bold">Account Person Details</h2>
            <hr className="my-2" />
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.accountPersonName}
                  onChange={(e) => handleChange("accountPersonName", e.target.value)}
                  className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                    errors.accountPersonName
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:ring-primary/20"
                  } focus:outline-none focus:ring-2 focus:border-primary`}
                  placeholder="Enter Person Name"
                />
                {errors.accountPersonName && (
                  <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                    {errors.accountPersonName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground ">
                  Phone No. 
                </label>
                <div className="pt-1">
                  <input
                    type="text"
                    value={formData.accountPersonPhoneNo}
                    onChange={(e) => handleChange("accountPersonPhoneNo", e.target.value)}
                    className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                      errors.accountPersonPhoneNo
                        ? "border-destructive focus:ring-destructive/20"
                        : "border-border focus:ring-primary/20"
                    } focus:outline-none focus:ring-2 focus:border-primary`}
                    placeholder="Enter Phone No."
                  />
                  {errors.accountPersonPhoneNo && (
                    <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                      {errors.accountPersonPhoneNo}
                    </p>
                  )}
                </div>
              </div>
            </div>
            </div>
            {/* </div> */}
          </div>

          {/* Branch Details */}

          <div className="h-full">
            <div className="bg-gradient-to-t from-[var(--tag--from)] to-[var(--tag--to)] h-full border-b border-[var(--border-color)] p-4 rounded-2xl text-[var(--text-color)]">
            <h2 className="font-bold">Branch Details</h2>
            <hr className="my-2" />
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Branch Code 
                </label>
                <input
                  type="text"
                  value={formData.branchCode}
                  onChange={(e) => handleChange("branchCode", e.target.value)}
                  className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                    errors.branchCode
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:ring-primary/20"
                  } focus:outline-none focus:ring-2 focus:border-primary`}
                  placeholder="Enter Branch Code"
                />
                {errors.branchCode && (
                  <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                    {errors.branchCode}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground ">
                  Branch Helpline Number 
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={formData.branchHelplineNumber}
                    onChange={(e) => handleChange("branchHelplineNumber", e.target.value)}
                    className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                      errors.branchHelplineNumber
                        ? "border-destructive focus:ring-destructive/20"
                        : "border-border focus:ring-primary/20"
                    } focus:outline-none focus:ring-2 focus:border-primary`}
                    placeholder="Enter branch helpline number"
                  />
                  {errors.branchHelplineNumber && (
                    <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                      {errors.branchHelplineNumber}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground ">
                  Branch Helpline Email 
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={formData.branchHelplineEmail}
                    onChange={(e) => handleChange("branchHelplineEmail", e.target.value)}
                    className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                      errors.branchHelplineEmail
                        ? "border-destructive focus:ring-destructive/20"
                        : "border-border focus:ring-primary/20"
                    } focus:outline-none focus:ring-2 focus:border-primary`}
                    placeholder="Enter branch helpline email"
                  />
                  {errors.branchHelplineEmail && (
                    <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                      {errors.branchHelplineEmail}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div>
                <label className="block text-sm font-medium text-foreground ">
                   Branch Address 
                </label>
                <div className="flex mt-2 gap-1">
                  <textarea
                    placeholder="Enter Branch Address"
                    rows="1"
                    value={formData.branchAddress}
                    onChange={(e) => handleChange("branchAddress", e.target.value)}
                    className={`w-full px-2 py-2 border rounded-lg bg-background text-foreground font-mono ${
                      errors.branchAddress ? "border-destructive" : "border-border"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                </div>
                {errors.branchAddress && (
                  <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                    {errors.branchAddress}
                  </p>
                )}
              </div>
            </div>
            </div>
          </div>

            
            {/* Branch Person Details */}
          <div>
            <div className="h-full">
            <div className="bg-gradient-to-t from-[var(--tag--from)] to-[var(--tag--to)] h-full border-b border-[var(--border-color)] p-4 rounded-2xl text-[var(--text-color)]">
            <h2 className="font-bold">Branch Person Details</h2>
            <hr className="my-2" />
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Branch Person Name 
                </label>
                <input
                  type="text"
                  value={formData.branchPersonName}
                  onChange={(e) => handleChange("branchPersonName", e.target.value)}
                  className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                    errors.branchPersonName
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border focus:ring-primary/20"
                  } focus:outline-none focus:ring-2 focus:border-primary`}
                  placeholder="Enter Branch Person Name"
                />
                {errors.branchPersonName && (
                  <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                    {errors.branchPersonName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground ">
                  Branch Person Phone No. 
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={formData.branchPersonPhone}
                    onChange={(e) => handleChange("branchPersonPhone", e.target.value)}
                    className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                      errors.branchPersonPhone
                        ? "border-destructive focus:ring-destructive/20"
                        : "border-border focus:ring-primary/20"
                    } focus:outline-none focus:ring-2 focus:border-primary`}
                    placeholder="Enter branch person phone number"
                  />
                  {errors.branchPersonPhone && (
                    <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                      {errors.branchPersonPhone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground ">
                  Branch Person Email 
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={formData.branchPersonEmail}
                    onChange={(e) => handleChange("branchPersonEmail", e.target.value)}
                    className={`w-full px-2 border h-[35px] rounded-md bg-card text-foreground transition-all duration-200 ${
                      errors.branchPersonEmail
                        ? "border-destructive focus:ring-destructive/20"
                        : "border-border focus:ring-primary/20"
                    } focus:outline-none focus:ring-2 focus:border-primary`}
                    placeholder="Enter branch person email"
                  />
                  {errors.branchPersonEmail && (
                    <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                      {errors.branchPersonEmail}
                    </p>
                  )}
                </div>
              </div>
            </div>
            </div>
          </div>


          </div>


          </div>







          <div className="flex gap-2 md:flex-row flex-col">
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                Opening Balance 
              </label>
              <input
                type="text"
                value={formData.openingBalance}
                onBlur={handleBlur}
                placeholder="0.00"
                onChange={(e) => handleChange("openingBalance", e.target.value)}
                className={`w-[70%] px-3 py-2 border rounded-lg bg-background text-right text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              <label className="text-center">
                <input
                  type="radio"
                  name="bt"
                  checked={formData.bType === "Cr"}
                  onClick={() => handleChange("bType", "Cr")}
                  className="ml-3"
                />
                Cr
              </label>
              <label className="text-center">
                <input
                  type="radio"
                  name="bt"
                  checked={formData.bType === "Dr"}
                  onClick={() => handleChange("bType", "Dr")}
                  className="ml-2"
                />
                Dr
              </label>
              {errors.openingBalance && (
                <p className="text-destructive text-sm mt-1 text-red-700 font-bold">
                  {errors.openingBalance}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pl-1 pb-3">
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-foreground cursor-pointer"
            >
              InActive
            </label>
            <input
              id="inActive"
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              checked={!!formData.inActive}
              onChange={(e) => handleChange("inActive", e.target.checked)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-border text-foreground rounded-xl hover:bg-secondary transition-all duration-200 font-medium cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-3 border border-border text-foreground rounded-xl hover:bg-secondary transition-all duration-200 font-medium cursor-pointer"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={isSavePending || isEditPending}
              className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium cursor-pointer"
            >
              {isSavePending
                ? "Saving..."
                : isEditPending
                  ? "Updating..."
                  : isEdit
                    ? "Update Account"
                    : "Add Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankAccount;
