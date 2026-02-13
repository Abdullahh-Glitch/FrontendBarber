import React from 'react';

const InvoiceAccountDetailModel = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="text-xl">🏢</span> Supplier Details
      </h2>
      {/* Responsive Grid: 1 column on mobile, 2 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase">Company Name</label>
          <input 
            type="text" 
            placeholder="Tech Solutions Inc." 
            className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
          <input 
            type="email" 
            placeholder="contact@techsolutions.com" 
            className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase">Address</label>
          <textarea 
            placeholder="123 Business Way" 
            rows="2"
            className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase">Phone</label>
          <input 
            type="text" 
            placeholder="(555) 123-4567" 
            className="p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceAccountDetailModel;