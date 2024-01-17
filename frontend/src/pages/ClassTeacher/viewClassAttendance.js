import React, { useEffect, useState } from "react";
import Sidebar1 from "../../component/sidebar1";
import Topbar from "../../component/topbar";
import $ from "jquery";
import "../Admin/css/ruang-admin.css";
import DynamicTable from "../../component/DynamicTable";

const ViewClassAttendance = () => {
  const [fetchstudents, setFetchStudents] = useState([]);
  const [classArmId, setClassArmId] = useState();
  const [subjectId, setSubjectId] = useState();
  const [classId, setClassId] = useState();
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState("");
  const [Arms, setArms] = useState([]);
  const [dateTaken, setdateTaken] = useState("");
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const url = "https://ams-made-ez.onrender.com";
  
  useEffect(() => {
    // Scroll to top button appear
    $(document).on("scroll", function () {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $(".scroll-to-top").fadeIn();
      } else {
        $(".scroll-to-top").fadeOut();
      }
    });
  });

  const fetchClasses = async () => {
    const response1 = await fetch(`${url}/api/admin/class/getallASC`);
    const data1 = await response1.json();
    setClasses(data1);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

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
 
  const FilterHandle = async (e) => {
    setSelectedClass(e.target.value);
    const value = classes.find((i) => i.className === e.target.value);
    setClassId(value.Id); //classId created to pass to a backend.
    const getArms = async () => {
      const response2 = await fetch(`${url}/api/admin/class/arms/getall/${value.Id}`);
      const data2 = await response2.json();
      setArms(data2);

      const response = await fetch(`${url}/api/teacher/subjects/${value.Id}`);
      const data = await response.json();
      console.log(data);
      setSubjects(data);
    };

    getArms();
  };

  console.log(subjectId);
  console.log(subjects);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/teacher/class/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: classId,
          classArmId: classArmId,
          subjectId: subjectId,
          dateTaken: dateTaken,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data && data.length > 0) {
          setFetchStudents(data);
        } else {
          setFetchStudents([]);
        }
      }
    } catch (err) {}
    setSelectedClass("");
    setSelectedSubject("");
    setdateTaken("");
    setSubjectId("");
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar1 />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/* <!-- TopBar --> */}
            <Topbar />

            {/* <!-- Container Fluid--> */}
            <div className="container-fluid" id="container-wrapper">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">View class Attendance</h1>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="./">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    View class Attendance
                  </li>
                </ol>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  {/* <!-- Form Basic --> */}
                  <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        View class Attendance
                      </h6>
                      {/* <?php echo $statusMsg; ?> */}
                    </div>
                    <div className="card-body">
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group row mb-3">
                          <div className="col-xl-4 m-2">
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
                                className="form-control"
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
                                className="form-control mb-2 mt-2"
                                onChange={(e) => {
                                  const armId = Arms.find(
                                    (a) => a.classArmName === e.target.value
                                  );
                                  setClassArmId(armId.Id); //classArmId is set by selecting the input field.
                                }}
                              >
                                <option value="">--Select Class Arm--</option>
                                {Arms.map((item, index) => (
                                  <option key={index} value={item.classArmName}>
                                    {item.classArmName}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                          <div className="col-xl-4 m-2">
                            <label className="form-control-label">
                              Select Date
                              <span className="text-danger ml-2">*</span>
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              name="dateTaken"
                              value={dateTaken}
                              onChange={(e) => setdateTaken(e.target.value)}
                              id="exampleInputFirstName"
                              placeholder="className Arm Name"
                            />
                          </div>
                          <div className="col-xl-4 m-2">
                            <label className="form-control-label">
                              Select Subject
                              <span className="text-danger ml-2">*</span>
                            </label>
                            {subjects && (
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
                                className="form-control"
                              >
                                <option value="">--Select Subject--</option>
                                {subjects.map((item, index) => (
                                  <option key={index} value={item.subjectName}>
                                    {item.subjectName}
                                  </option>
                                ))}
                              </select>
                            )}
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
                        {/* <table
                              className="table align-items-center table-flush"
                              id="dataTableHover"
                              // ref={tableRef}
                            > */}
                          {fetchstudents && fetchstudents.length > 0 ? (
                            <DynamicTable
                              columns={tableColumns} // Pass tableColumns as the columns prop
                              rows={fetchstudents.map((row, i) => {
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
                            />
                          ) : (
                            <div className="alert alert-danger" role="alert">
                              No Record Found!
                            </div>
                          )}
                          {/* </table> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!---Container Fluid--> */}
            </div>
            <footer />
            {/* <!-- Footer --> */}
          </div>
        </div>

        {/* <!-- Scroll to top --> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    </div>
  );
};

export default ViewClassAttendance;
