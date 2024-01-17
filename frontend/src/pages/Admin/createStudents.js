import "../../App.css";
import { useState, useEffect } from "react";
import "./css/ruang-admin.css";
import Sidebar from "../../component/sidebar";
import Topbar from "../../component/topbar";
import "bootstrap/dist/css/bootstrap.min.css";
import DynamicTable from "../../component/DynamicTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";

function CreateStudents() {
  const url = "https://ams-made-ez.onrender.com";
  const key = "key_local_storage";
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem(key)) ?? []
  );
  const [over, setOver] = useState({ id: "", value: false });
  const [over1, setOver1] = useState({ id: "", value: false });
  const [id, setId] = useState();
  const [updateflag, setUpdateflag] = useState(false);
  const [password] = useState("12345");
  const [Arms, setArms] = useState([]);
  const [classes, setClasses] = useState([]);
  const [Category, setCategory] = useState();
  const [classId, setClassId] = useState();
  const [classArmId, setClassArmId] = useState();
  const [student, setStudent] = useState({
    Id: "",
    firstName: "",
    lastName: "",
    otherName: "",
    admissionNumber: "",
    password: "",
    classId: "",
    classArmId: "",
    date: "",
  });
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const arr = [];
  classes.forEach((object) => {
    arr.push(object.className);
  });

 
  const arr2 = [];
  Arms.forEach((arm) => {
    arr2.push(arm.classArmName);
  });


  const FilterHandle = (e) => {
    setCategory(e.target.value);
    const Index = classes.find((i) => i.className === e.target.value);
    setClassId(Index.Id);
    const getClasses = async () => {
      const response2 = await fetch(`${url}/api/admin/class/arms/getall/${Index.Id}`);
      const data2 = await response2.json();
      setArms(data2);
    };
    getClasses();
    setStudent((prev) => {
      return { ...prev, classId: Index.Id };
    });
  };


  const HandleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(students));
  }, [students]);

 console.log(id);
  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/api/admin/student/getall`);
      const data = await response.json();
      setStudents(data);
      const response1 = await fetch(`${url}/api/admin/class/getallASC`);
      const data1 = await response1.json();
      setClasses(data1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // console.log("=======current id=====", id);
  const updateData = async () => {
    const response = await fetch(`${url}/api/admin/student/${student.Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
          firstName: student.firstName,
          lastName: student.lastName,
          otherName: student.otherName,
          admissionNumber: student.admissionNumber,
          password: student.password,
          classId: classId,
          classArmId: classArmId,
          dateCreated: date,
    
      }),
    });
    const resJson = await response.json();
    console.log(resJson);
    fetchData();
    setUpdateflag(false);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/admin/student/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          
            firstName: student.firstName,
            lastName: student.lastName,
            otherName: student.otherName,
            admissionNumber: student.admissionNumber,
            password: password,
            classId: classId,
            classArmId: classArmId,
            dateCreated: date
    
        }),
      });

      let resJson = await response.json();
      console.log(resJson);
      setId(resJson.data.Id + 1);
    } catch (err) {
      console.log(err);
    }
    fetchData();
  };

  const DeleteHandler = async (id) => {
    try {
      const response = await fetch(`${url}/api/admin/student/${id}`, {
        method: "delete",
      });
      console.log(response); // Log the response to examine its format
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    fetchData();
  };


  const UpdateHandler = async (id) => {
    setUpdateflag(true);
    const student = students.find((student) => student.Id === id);
    console.log(student);
    setStudent(student);
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        {/* Sidebar  */}
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid" id="container-wrapper">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Create Students</h1>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="./admin">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create Students
                  </li>
                </ol>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                {/* <!-- Form Basic --> */}
                <div className="card mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Create Students
                    </h6>
                    {/* <?php echo $statusMsg; ?> */}
                  </div>
                  <div className="card-body">
                    <form onSubmit={(e) => HandleSubmit(e)}>
                      <div className="form-group row mb-3">
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Firstname<span className="text-danger ml-2">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            name="firstName"
                            onChange={HandleChange}
                            value={student.firstName}
                            id="exampleInputFirstName"
                          />
                        </div>
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Lastname<span className="text-danger ml-2">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            name="lastName"
                            onChange={HandleChange}
                            value={student.lastName}
                            id="exampleInputFirstName"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-3">
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Other Name
                            <span className="text-danger ml-2">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            name="otherName"
                            onChange={HandleChange}
                            value={student.otherName}
                            id="exampleInputFirstName"
                          />
                        </div>
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Admission Number
                            <span className="text-danger ml-2">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            name="admissionNumber"
                            onChange={HandleChange}
                            value={student.admissionNumber}
                            id="exampleInputFirstName"
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-3">
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Select Class
                            <span className="text-danger ml-2">*</span>
                          </label>
                          {classes && (
                            <select
                              required
                              className="form-control mb-3"
                              onChange={(e) => FilterHandle(e)}
                            >
                              <option value="">--Select Class--</option>
                              {arr.map((item, index) => {
                                return (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                        </div>
                        <div className="col-xl-6">
                          <label className="form-control-label">
                            Class Arm<span className="text-danger ml-2">*</span>
                          </label>
                          {Category && (
                            <select
                              required
                              name="classArmId"
                              className="form-control custom-input mb-3"
                              onChange={(e) => {
                                const armId = Arms.find(
                                  (a) => a.classArmName === e.target.value
                                );
                                setClassArmId(armId.Id);
                                setStudent((prev) => {
                                  return { ...prev, classArmId: armId.Id };
                                });
                              }}
                            >
                              <option value="">--Select Class Arm--</option>
                              {arr2.map((item, index) => {
                                return (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                          {/* echo"<div id='txtHint'></div>"; */}
                        </div>
                      </div>

                      {updateflag ? (
                        <button
                          name="update"
                          type="button"
                          className="btn btn-warning"
                          onClick={updateData}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          type="submit"
                          name="save"
                          className="btn btn-primary"
                        >
                          Save
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      All Student
                    </h6>
                  </div>
                  <div className="table-responsive align-items-center table-flush p-3">
                    {/* <table className="table align-items-center table-flush table-hover">
                      <tbody> */}
                        {students && students.length > 0 && (
                          <DynamicTable
                            columns={[
                              { label: "Id", field: "index" },
                              { label: "FirstName", field: "firstName" },
                              { label: "LastName", field: "lastName" },
                              { label: "OtherName", field: "otherName" },
                              {
                                label: "Admission No",
                                field: "admissionNumber",
                              },
                              { label: "Class", field: "className" },
                              { label: "ClassArm", field: "classArmName" },
                              { label: "Date Created", field: "dateCreated" },
                              { label: "Edit", field: "edit" },
                              { label: "Delete", field: "delete" },
                            ]}
                            rows={students.map((item, i) => ({
                              index: item.Id.toString(),
                              firstName: item.firstName,
                              lastName: item.lastName,
                              otherName: item.otherName,
                              admissionNumber: item.admissionNumber,
                              className: item.className,
                              classArmName: item.classArmName,
                              dateCreated: item.dateCreated,
                              edit: (
                                <>
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    onMouseOver={() =>
                                      setOver({ id: item.Id, value: true })
                                    }
                                    onMouseLeave={() =>
                                      setOver({
                                        id: item.Id,
                                        value: false,
                                      })
                                    }
                                    style={
                                      over.id === item.Id && over.value === true
                                        ? {
                                            color: "blue",
                                            cursor: "pointer",
                                          }
                                        : {}
                                    }
                                    onClick={() => UpdateHandler(item.Id)}
                                  />
                                  <span> Edit </span>
                                </>
                              ),
                              delete: (
                                <>
                                  <FontAwesomeIcon
                                    icon={faTrashCan}
                                    onMouseOver={() =>
                                      setOver1({
                                        id: item.Id,
                                        value: true,
                                      })
                                    }
                                    onMouseLeave={() =>
                                      setOver1({
                                        id: item.Id,
                                        value: false,
                                      })
                                    }
                                    style={
                                      over1.id === item.Id &&
                                      over1.value === true
                                        ? {
                                            color: "red",
                                            cursor: "pointer",
                                          }
                                        : {}
                                    }
                                    onClick={() => DeleteHandler(item.Id)}
                                  />
                                  <span> Delete </span>
                                </>
                              ),
                            }))}
                          />
                        )}
                      {/* </tbody>
                    </table> */}
                  </div>
                  <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateStudents;
