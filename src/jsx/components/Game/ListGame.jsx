import React, { useState } from 'react';
import PageTitle from "../../layouts/PageTitle";
import DataTable from "react-data-table-component";
import CommonLoader from "../loader/CommonLoader";


const ListGame = (props) => {

   const customStyles = {
      headCells: {
         style: {
            backgroundColor: "#6082b6",
            borderRight: "1px solid white",
            color: "white",
         },
      },
   };

   const [loadingIndicator, setLoadingIndicator] = useState(false);

   return (
      <>
         <PageTitle activeMenu={"Game List"} motherMenu={"Game"} />

         <div className="table-responsive">
            <DataTable
               // columns={attendanceData.length > 0 ? columns : []}
               // data={attendanceData}
               customStyles={customStyles}
               direction="auto"
               highlightOnHover
               persistTableHead
               progressPending={loadingIndicator}
               progressComponent={
                  <CommonLoader loadingIndicator={loadingIndicator} />
               }
            />
         </div>
      </>
   );
};

export default ListGame;
