import React, { useEffect, useState, useCallback } from "react";
import Sidebar1 from "../../component/sidebar1";
import Topbar from "../../component/topbar";
import Footer from "../../component/footer";
import DynamicTable from "../../component/DynamicTable";

const ViewStudentAttendance = () => {
  const url = "https://ams-made-ez.onrender.com";
  const [Students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [arms, setArms] = useState([]);
  const [armId, setArmId] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [fetchStudents, setFetchStudents] = useState([]);
  const [adNo, setAdNo] = useState();
  const [selectedType, setSelectedType] = useState("");
  const [Todate, setToDate] = useState("");
  const [Fromdate, setFromDate] = useState("");
  const [singleDate, setSingleDate] = useState("");
  const [SelectedStudent, setSelectedStudent] = useState(null);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const renderExtraFields = () => {
    if (selectedType === "2") {
      return (
        <div className="form-group row mb-3">
          <div className="col-xl-6">
            <label className="form-control-label">
              Select Date<span className="text-danger ml-2">*</span>
            </label>
            <input
              type="date"
              value={singleDate}
              onChange={(e) => setSingleDate(e.target.value)}
              className="form-control"
              name="singleDate"
              id="exampleInputFirstName"
            />
          </div>
        </div>
      );
    } else if (selectedType === "3") {
      return (
        <div className="form-group row mb-3">
          <div className="col-xl-6">
            <label className="form-control-label">
              From Date<span className="text-danger ml-2">*</span>
            </label>
            <input
              type="date"
              value={Fromdate}
              onChange={(e) => setFromDate(e.target.value)}
              className="form-control"
              name="fromDate"
              id="exampleInputFirstName"
            />
          </div>
          <div className="col-xl-6">
            <label className="form-control-label">
              To Date<span className="text-danger ml-2">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              value={Todate}
              onChange={(e) => setToDate(e.target.value)}
              name="toDate"
              id="exampleInputFirstName"
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const resetForm = () => {
    setSelectedClass("");
    setSelectedSubject("");
    setSelectedType("");
    setAdNo("");
    setSingleDate("");
    setArmId("");
    setClassId("");
    setSubjectId("");
    setSelectedStudent(null); // Reset the selected student value to null
  };

  
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("Student", SelectedStudent);
      const url = "https://ams-made-ez.onrender.com/api/teacher/student/attendance";
      const data = {
        type: selectedType,
        admissionNumber: adNo,
        classId: classId,
        classArmId: armId,
        subjectId: subjectId,
      };

      if (selectedType === "2") {
        data.singleDate = singleDate;
        console.log(data.singleDate);
      } else if (selectedType === "3") {
        data.fromDate = Fromdate;
        data.toDate = Todate;
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFetchStudents(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      resetForm();
    },
    [SelectedStudent, selectedType, adNo, classId, armId, subjectId, singleDate, Fromdate, Todate]
  );

  const fetchStudentsInClass = useCallback(async () => {
    try {
      const response = await fetch(`${url}/api/teacher/view/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: classId,
          classArmId: armId,
        }),
      });
      const data = await response.json();
      setStudents(data);
    } catch (err) {}
  }, [armId, classId]);

  const FilterHandle = useCallback(
    async (e) => {
      setSelectedClass(e.target.value);
      const value = classes.find((i) => i.className === e.target.value);
      setClassId(value.Id); //classId created to pass to a backend.

      const getArms = async () => {
        const response2 = await fetch(
          `${url}/api/admin/class/arms/getall/${value.Id}`
        );
        const data2 = await response2.json();
        setArms(data2);

        const response = await fetch(`${url}/api/teacher/subjects/${value.Id}`);
        const data = await response.json();
        setSubjects(data);
      };
      getArms();
    },
    [classes]
  );

  useEffect(() => {
    if (classId && armId) {
      fetchStudentsInClass();
    }
  }, [classId, armId, fetchStudentsInClass, selectedSubject]);

  const getStatusCell = (value) => {
    const status = value === "1" ? "Present" : "Absent";
    const color = value === "1" ? "#00FF00" : "#FF0000";
    return <span style={{ backgroundColor: color }}>{status}</span>;
  };

  const tableColumns = [
    { label: "Id", field: "index" },
    { label: "FirstName", field: "firstName" },
    { label: "LastName", field: "lastName" },
    { label: "OtherName", field: "otherName" },
    { label: "Admission No", field: "admissionNumber" },
    { label: "class", field: "className" },
    { label: "classArm", field: "classArmName" },
    { label: "Session", field: "sessionName" },
    { label: "Term", field: "termName" },
    { label: "Status", field: "status", format: getStatusCell },
    { label: "Date", field: "dateTimeTaken" },
  ];

  useEffect(() => {
    const fetchClasses = async () => {
      let url1 = "https://ams-made-ez.onrender.com";
      const response1 = await fetch(`${url1}/api/admin/class/getallASC`);
      const data1 = await response1.json();
      setClasses(data1);
    };
    fetchClasses();
  }, []);

  // console.log(selectedType);
  return (
    <div>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar1 />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
              {/* <!-- Container Fluid--> */}
              <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">
                    View Student Attendance
                  </h1>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="./">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      View Student Attendance
                    </li>
                  </ol>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    {/* <!-- Form Basic --> */}
                    <div className="card mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          View Student Attendance
                        </h6>
                        {/* <?php echo $statusMsg; ?> */}
                      </div>
                      <div className="card-body">
                        <form
                          autoComplete="on"
                          onSubmit={(e) => handleSubmit(e)}
                        >
                          <div className="form-group row mb-3">
                            <div className="col-xl-4 ">
                              <label className="form-control-label">
                                Select Class
                                <span className="text-danger ml-2">*</span>
                              </label>
                              {classes && (
                                <select
                                  required
                                  name="className"
                                  value={selectedClass}
                                  onChange={(e) => FilterHandle(e)}
                                  className="form-control mb-3"
                                >
                                  <option value="">--Select Class--</option>
                                  {classes.map((item, index) => (
                                    <option key={index} value={item.className}>
                                      {item.className}
                                    </option>
                                  ))}
                                </select>
                              )}
                              {selectedClass && (
                                <select
                                  required
                                  name="classArmId"
                                  className="form-control mb-3"
                                  onChange={(e) => {
                                    const armId = arms.find(
                                      (a) => a.classArmName === e.target.value
                                    );
                                    setArmId(armId.Id); //classArmId is set by selecting the input field.
                                  }}
                                >
                                  <option value="">--Select Class Arm--</option>
                                  {arms.map((item, index) => (
                                    <option
                                      key={index}
                                      value={item.classArmName}
                                    >
                                      {item.classArmName}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                            <div className="col-xl-4">
                              <label className="form-control-label">
                                Select Student
                                <span className="text-danger ml-2">*</span>
                              </label>
                              {Students && (
                                <select
                                  required
                                  onChange={(e) => {
                                    setAdNo(e.target.value);
                                    const selectedAdNo = e.target.value;
                                    setSelectedStudent(
                                      selectedAdNo
                                        ? Students.find(
                                            (student) =>
                                              student.admissionNumber ===
                                              selectedAdNo
                                          )
                                        : null
                                    );
                                  }}
                                  value={adNo}
                                  name="admissionNumber"
                                  className="form-control mb-3"
                                >
                                  <option value="">--Select Student--</option>
                                  {Students.map((item, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={item.admissionNumber}
                                      >
                                        {item.firstName + " " + item.lastName}
                                      </option>
                                    );
                                  })}
                                </select>
                              )}
                            </div>
                            <div className="col-xl-4 ">
                              <label className="form-control-label">
                                Select Subject
                                <span className="text-danger ml-2">*</span>
                              </label>
                              <select
                                required
                                name="subjectName"
                                value={selectedSubject}
                                onChange={(e) => {
                                  setSelectedSubject(e.target.value);
                                  const index = subjects.find(
                                    (i) => i.subjectName === e.target.value
                                  );
                                  setSubjectId(index.Id); // set subject for which the teacher will take attendance.
                                }}
                                className="form-control mb-3"
                              >
                                <option value="">--Select Subject--</option>
                                {subjects.map((item, index) => (
                                  <option key={index} value={item.subjectName}>
                                    {item.subjectName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-xl-4">
                              <label className="form-control-label">
                                Type<span className="text-danger ml-2">*</span>
                              </label>
                              <select
                                required
                                name="type"
                                value={selectedType}
                                onChange={handleTypeChange}
                                className="form-control mb-3"
                              >
                                <option value="">--Select--</option>
                                <option value="1">All</option>
                                <option value="2">By Single Date</option>
                                <option value="3">By Date Range</option>
                              </select>
                              {renderExtraFields()}
                            </div>
                          </div>
               
                          <button
                            type="submit"
                            name="view"
                            className="btn btn-primary"
                          >
                            View Attendance
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* <!-- Input Group --> */}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card mb-4">
                          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                              class Attendance
                            </h6>
                          </div>
                          <div className="table-responsive align-items-center table-flush p-3">
                            {fetchStudents && fetchStudents.length > 0 ? (
                              <DynamicTable
                                columns={tableColumns} // Pass tableColumns as the columns prop
                                rows={fetchStudents.map((row, i) => {
                                  return {
                                    index: i + 1,
                                    firstName: row.firstName,
                                    lastName: row.lastName,
                                    otherName: row.otherName,
                                    admissionNumber: row.admissionNumber,
                                    className: row.className,
                                    classArmName: row.classArmName,
                                    sessionName: row.sessionName,
                                    termName: row.termName,
                                    status: getStatusCell(row.status), // Format the "Status" field using getStatusCell
                                    dateTimeTaken: row.dateTimeTaken,
                                  };
                                })}
                                // className="custom-table" // Add a custom class name for the table
                              />
                            ) : (
                              <div className="alert alert-danger" role="alert">
                                No Record Found!
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>

            {/* <!-- Scroll to top --> */}
            <a className="scroll-to-top rounded" href="#page-top">
              <i className="fas fa-angle-up"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentAttendance;
