import React, { useEffect, useState, useCallback } from "react";
import Footer from "../../component/footer";
import Topbar from "../../component/topbar";
import Sidebar1 from "../../component/sidebar1";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Admin/css/ruang-admin.css";
import DynamicTable from "../../component/DynamicTable";
import StudentModal from "../../component/StudentModal";

const ViewStudents = () => {
  // const tableRef = useRef(null);
  const url = "https://ams-made-ez.onrender.com";
  const [students, setStudents] = useState([]);
  const [className, setclassName] = useState("");
  const [arm, setArm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null); // Track the selected row

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${url}/api/teacher/view/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: user.classId,
          classArmId: user.classArmId,
        }),
      });
      const data = await response.json();
      setStudents(data);
      setclassName(data[0].className);
      setArm(data[0].classArmName);
    } catch (err) {
      console.log(err);
    }
  }, [user.classArmId, user.classId]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(selectedRow);


  const tableColumns = [
    { label: "Id", field: "index" },
    { label: "FirstName", field: "firstName" },
    { label: "LastName", field: "lastName" },
    { label: "OtherName", field: "otherName" },
    { label: "Admission No", field: "admissionNumber" },
    { label: "class", field: "className" },
    { label: "classArm", field: "classArmName" },
  ];

  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar1 />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
              {selectedRow && (
                <StudentModal
                  studentData={selectedRow} // Pass the selected student data
                  closeModal={() => setSelectedRow(null)}
                />
              )}
              <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">
                    All Student in {className}-{arm} class
                  </h1>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="./">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      All Student in class
                    </li>
                  </ol>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card mb-4">
                          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                              All Student In class
                            </h6>
                          </div>
                          <div className="table-responsive align-items-center table-flush p-3">
                            <DynamicTable
                              columns={tableColumns} // Pass tableColumns as the columns prop
                              rows={students.map((row, i) => {
                                return {
                                  index: i + 1,
                                  firstName: row.firstName,
                                  lastName: row.lastName,
                                  otherName: row.otherName,
                                  admissionNumber: row.admissionNumber,
                                  className: row.className,
                                  classArmName: row.classArmName,
                                };
                              })}
                              RowClick={(studentData) => setSelectedRow(studentData)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
              {/* <!-- Footer --> */}
            </div>
          </div>

          {/* <!-- Scroll to top --> */}
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default ViewStudents;
