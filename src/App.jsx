import React from "react";
import Navbar from "./Components/Navbar";
import AttendancePage from "./Pages/AttendancePage";

function App() {
  return (
    <>
      {/* bg-[#E7E3F6] */}
      {/* bg-[#f0bdb1] */}
      <div className="min-h-[100vh] w-full bg-gradient-to-r from-slate-900 to-slate-700">
        <div className="min-h-[11vh] w-[100%] bg-gradient-to-r from-stone-500 to-stone-700">
          <Navbar />
        </div>
        <div className="min-h-[85vh] w-full overflow-auto ">
          <AttendancePage />
        </div>
      </div>
    </>
  );
}

export default App;
