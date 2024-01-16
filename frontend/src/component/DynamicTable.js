import React from "react";
import { MDBDataTable } from "mdbreact";
import "../pages/Admin/css/mdreact.css";
import "../pages/Admin/css/ruang-admin.css";

const DynamicTable = ({ columns, rows, RowClick }) => {
  const extendedRows = rows.map((row, index) => {
    const extendedRow = { ...row, index: index + 1 };

    if (RowClick) {
      extendedRow.clickEvent = (event) => handleRowClick(row, event); //event must be passed as props on any click function otherwise click wont consider.
    } //here it is not a inbuilt onClick method for any react component.

    return extendedRow;
  });

  const extendedData = {
    columns,
    rows: extendedRows,
  };

  const handleRowClick = (event, studentData) => {
    RowClick(studentData);
    console.log(event);
  };

  return (
    <div>
      <MDBDataTable
        striped
        bordered
        small
        hover
        data={extendedData} // Use the extendedData with click events
        className="custom-table"
        noBottomColumns
        responsive
        noRecordsFoundLabel="No Record Found!"
        theadColor="primary-color"
        options={{
          showEntries: true,
          entriesLabel: "Show",
          paginationLabel: "Entries per page",
          entriesOptions: [5, 10, 20],
        }}
        classnames={{
          showEntriesWrapper: "show-entries-wrapper",
          showEntriesSelect: "show-entries-select",
          showEntriesLabel: "show-entries-label",
          showEntriesArrow: "show-entries-arrow",
        }}
      />
    </div>
  );
};

export default DynamicTable;
