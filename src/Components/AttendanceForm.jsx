import React, { useState } from "react";

export default function AttendanceForm({ heads, filteredStudents }) {
  const [record, setRecord] = useState([]);

  const handleChange = (e) => {
    const _id = filteredStudents.id;
    const value = e.target.value;

    setRecord((prev) => {
      const existingId = prev.findIndex((r) => r.id === _id);

      if (existingId !== -1) {
        const updatedRecord = [...prev];
        updatedRecord[existingId].status = value;
        return updatedRecord;
      }

      return [...prev, { id: _id, status: value }];
    });
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-b border-black">
        <thead>
          <tr>
            {heads.map((head, index) => (
              <th
                key={index}
                className={
                  head === "Name"
                    ? "text-left px-4 py-2 bg-[#2e5657] border-r border-black"
                    : "text-center px-4 py-2 bg-[#2e5657] border-r border-l border-black"
                }
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr
              key={student.id}
              className={index % 2 === 0 ? "bg-[#88c0bd]" : "bg-[#5fa2a1]"}
            >
              <td className="w-[2%] text-center border-r border-l border-black">
                {index + 1}
              </td>
              <td className="text-left px-4 py-2 border-r border-black">
                {student.name}
              </td>
              <td className="w-[15%] text-center border-r border-black">
                {student.AdmissionNo}
              </td>
              <td className="w-[7%] text-center border-r border-black">
                <input
                  type="radio"
                  name={`attendance-${student.id}`}
                  value="P"
                  className="scale-115 accent-green-600"
                  onChange={(e) => handleChange(e, student)}
                />
              </td>
              <td className="w-[7%] text-center border-r border-black">
                <input
                  type="radio"
                  name={`attendance-${student.id}`}
                  value="A"
                  className="scale-115 accent-red-600"
                  onChange={(e) => handleChange(e, student)}
                />
              </td>
              <td className="w-[7%] text-center border-r border-black">
                <input
                  type="radio"
                  name={`attendance-${student.id}`}
                  value="L"
                  className="scale-115 accent-yellow-200"
                  onChange={(e) => handleChange(e, student)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
