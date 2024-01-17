import React, { useState } from "react";
import profilePic from "../pages/Admin/img/user.png";
import "../pages/Admin/css/ruang-admin.css";

const StudentModal = ({ studentData, closeModal }) => {
  const { firstName, lastName, admissionNumber, className, classArmName } =
    studentData;

  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    setIsOpen(false);
    closeModal(); // Call the closeModal function passed as a prop
  };

   // Render the component only if rowData is defined
   if (!studentData) {
    return null;
  }
  
  return (
    <>
      {isOpen && (
        <>
          <div className="modal" tabIndex="-1" >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {firstName} {lastName}
                  </h5>
                  <button
                    type="button"
                    className="close border-0 bg-light"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  >
                    <i className="fas fa-times fs-4"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="profile-container">
                    <img
                      className="profile-image"
                      src={profilePic}
                      alt="Profile"
                    />
                  </div>
                  <div className="student-details">
                    <p>
                      <strong>Admission Number:</strong> {admissionNumber}
                    </p>
                    <p>
                      <strong>Class:</strong> {className}
                    </p>
                    <p>
                      <strong>Class Arm:</strong> {classArmName}
                    </p>
                    {/* Add more student details here */}
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentModal;
