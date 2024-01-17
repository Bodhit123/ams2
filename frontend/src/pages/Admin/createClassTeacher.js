import React, { useState, useEffect } from "react";
import Sidebar from "../../component/sidebar";
import Topbar from "../../component/topbar";
import "./css/ruang-admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import DynamicTable from "../../component/DynamicTable";
import md5 from "md5";

const CreateclassTeacher = () => {
  const url = "https://ams-made-ez.onrender.com";
  const [error, setError] = useState("");
  const [over1, setOver1] = useState({ id: "", value: false });
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    phoneNo: "",
    classId: "",
    classArmId: "",
    dateCreated: "",
  });
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const password = "pass123";
  const hashpass = md5(password);
  const [classId, setClassId] = useState();
  const [classArmId, setClassArmId] = useState();
  const [Category, setCategory] = useState();
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [Arms, setArms] = useState([]);

  const arr = [];
  classes.forEach((object) => {
    arr.push(object.className);
  });

  const arr2 = [];
  Arms.forEach((arm) => {
    arr2.push(arm.classArmName);
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const FilterHandle = (e) => {
    setCategory(e.target.value);
    const Index = classes.find((i) => i.className === e.target.value);
    setClassId(Index.Id);
    const getClasses = async () => {
      const response2 = await fetch(
        `${url}/api/admin/class/arms/getall/${Index.Id}`
      );
      const data2 = await response2.json();
      setArms(data2);
    };
    console.log(classId);
    getClasses();
    setTeacher((prev) => {
      return { ...prev, classId: Index.Id };
    });
  };
  console.log(classes);
  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/api/admin/teacher/getall`);
      const data = await response.json();
      setTeachers(data);
      const response1 = await fetch(`${url}/api/admin/class/getallASC`);
      const data1 = await response1.json();
      setClasses(data1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${url}/api/admin/teacher/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          emailAddress: teacher.emailAddress,
          password: hashpass,
          phoneNo: teacher.phoneNo,
          classId: classId,
          classArmId: classArmId,
          dateCreated: date
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data);
      }
    } catch (err) {
      setError(err.message);
    }
    fetchData();
  };

  const DeleteHandler = async (id) => {
    const armId = teachers.find((teacher) => teacher.Id === id).classArmId;
    try {
      const response = await fetch(`${url}/api/admin/teacher/${id}/${armId}`, {
        method: "delete",
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            {/* <!-- Container Fluid-->  */}
            <div className="container-fluid" id="container-wrapper">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Create class Teachers</h1>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="./">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create class Teachers
                  </li>
                </ol>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  {/* <!-- Form Basic --> */}
                  <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Create class Teachers
                      </h6>
                      {error ? (
                        <div
                          className="alert alert-danger alert-dismissible fade show js-alert"
                          role="alert"
                          style={{ padding: "5px", marginRight: "700px" }}
                        >
                          {error}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="card-body">
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group row mb-3">
                          <div className="col-xl-6">
                            <label className="form-control-label">
                              Firstname
                              <span className="text-danger ml-2">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              required
                              name="firstName"
                              value={teacher.firstName}
                              onChange={HandleChange}
                              id="exampleInputFirstName"
                            />
                          </div>
                          <div className="col-xl-6">
                            <label className="form-control-label">
                              Lastname
                              <span className="text-danger ml-2">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              required
                              name="lastName"
                              value={teacher.lastName}
                              onChange={HandleChange}
                              id="exampleInputFirstName"
                            />
                          </div>
                        </div>
                        <div className="form-group row mb-3">
                          <div className="col-xl-6">
                            <label className="form-control-label">
                              Email Address
                              <span className="text-danger ml-2">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              required
                              name="emailAddress"
                              value={teacher.emailAddress}
                              onChange={HandleChange}
                              id="exampleInputFirstName"
                            />
                          </div>
                          <div className="col-xl-6">
                            <label className="form-control-label">
                              Phone No
                              <span className="text-danger ml-2">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="phoneNo"
                              value={teacher.phoneNo}
                              onChange={HandleChange}
                              id="exampleInputFirstName"
                            />
                          </div>
                        </div>
                        <div className="form-group row mb-3">
                          <div className="col-xl-6">
                            <label className="form-control-label">
                              Select class
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
                              class Arm
                              <span className="text-danger ml-2">*</span>
                            </label>
                            {Category && (
                              <select
                                required
                                name="classArmId"
                                className="form-control mb-3"
                                onChange={(e) => {
                                  const armId = Arms.find(
                                    (a) => a.classArmName === e.target.value
                                  );
                                  setClassArmId(armId.Id);
                                  setTeacher((prev) => {
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
                            {/* <?php
                                echo"<div id='txtHint'></div>";
                            ?> */}
                          </div>
                        </div>
                        <button
                          type="submit"
                          name="save"
                          className="btn btn-primary"
                        >
                          Save
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* //   <!-- Input Group --> */}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">
                            All class Teachers
                          </h6>
                        </div>
                        <div className="table-responsive align-items-center table-flush p-3">
                          {teachers && teachers.length > 0 && (
                            <DynamicTable
                              columns={[
                                { label: "#", field: "index" },
                                { label: "FirstName", field: "firstName" },
                                { label: "LastName", field: "lastName" },
                                {
                                  label: "EmailAddress",
                                  field: "emailAddress",
                                },
                                { label: "Phone No", field: "phoneNo" },
                                { label: "ClassName", field: "className" },
                                {
                                  label: "ClassArm Name",
                                  field: "classArmName",
                                },
                                { label: "Date Created", field: "dateCreated" },
                                { label: "Delete", field: "delete" },
                              ]}
                              rows={teachers.map((item, i) => ({
                                index: item.Id.toString(),
                                firstName: item.firstName,
                                lastName: item.lastName,
                                emailAddress: item.emailAddress,
                                phoneNo: item.phoneNo,
                                className: item.className,
                                classArmName: item.classArmName,
                                dateCreated: item.dateCreated,
                                delete: (
                                  <FontAwesomeIcon
                                    icon={faTrashCan}
                                    onMouseOver={() =>
                                      setOver1({ id: item.Id, value: true })
                                    }
                                    onMouseLeave={() =>
                                      setOver1({ id: item.Id, value: false })
                                    }
                                    style={
                                      over1.id === item.Id &&
                                      over1.value === true
                                        ? { color: "red", cursor: "pointer" }
                                        : {}
                                    }
                                    onClick={() => DeleteHandler(item.Id)}
                                  />
                                ),
                              }))}
                            />
                          )}
                          {/* </table> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--Row--> */}
              </div>
              {/* <!---Container Fluid--> */}
            </div>
            {/* <!-- Footer -->
             */}
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

export default CreateclassTeacher;
