import React, { useEffect, useState } from "react";
import AttendanceForm from "../Components/AttendanceForm";
import Dropdown from "../Components/Dropdown";
import { getTeachers } from "../Apis/teachersApi";
import { getClasses } from "../Apis/classesApi";
import { getSections } from "../Apis/sectionApi";
import { getStudents } from "../Apis/studentsApi";

export default function AttendancePage() {
  // const classes = ["BSCS-D", "BSCS-A", "BSAI-A", "BSIT-B"];
  // const [title, setTitle] = useState([]);
  const title = ["Sr.", "Name", "Admission NO.", "Present", "Absent", "Leave"];

  const [students, setStudents] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classId, setClassId] = useState([]);

  const [ddpTitleClass, setDdpTitleClass] = useState("Select Class");
  const [ddpTitleSection, setDdpTitleSection] = useState("Select Section");
  const [ddpTitleTeacher, setDdpTitleTeacher] = useState("Select Teacher");

  const handleSelectClass = async (item) => {
    setDdpTitleClass(item.name);
    setClassId(item.id);
    const sData = await getSections(item.id);
    setStudents([]);
    setSections(sData);
  };

  const handleSelectSection = async (item) => {
    setDdpTitleSection(item.value);
    const studentData = await getStudents(classId, item.id);
    setStudents(studentData);
  };

  const handleSelectTeacher = async (item) => {
    setDdpTitleTeacher(item.name);
    const cData = await getClasses(item.id);
    setClasses(cData);
  };

  useEffect(() => {
    const fetchTeacherData = async () => {
      const data = await getTeachers();
      setTeacherData(data);
    };
    fetchTeacherData();
  }, []);

  return (
    <div className="w-[98%] mx-auto">
      <div className="w-full flex justify-end p-2 gap-1">
        <div className="sm:w-[40%] md:w-[25%] lg:w-[20%] max-[639px]:w-[50%]">
          <Dropdown
            label={ddpTitleTeacher}
            items={teacherData}
            onSelect={handleSelectTeacher}
            buttonClass="mt-2 bg-[#88c0bd]"
            // bg-blue-200
          />
        </div>
        <div className="sm:w-[40%] md:w-[25%] lg:w-[20%] max-[639px]:w-[50%]">
          <Dropdown
            label={ddpTitleClass}
            items={classes}
            onSelect={handleSelectClass}
            buttonClass="mt-2 bg-[#88c0bd]"
            // bg-blue-200
          />
        </div>
        <div className="sm:w-[40%] md:w-[25%] lg:w-[20%] max-[639px]:w-[50%]">
          <Dropdown
            label={ddpTitleSection}
            items={sections}
            onSelect={handleSelectSection}
            buttonClass="mt-2 bg-[#88c0bd]"
            // bg-blue-200
          />
        </div>
      </div>
      <div className="overflow-x-auto w-full text-white mt-2">
        <AttendanceForm heads={title} filteredStudents={students} />
      </div>
    </div>
  );
}
