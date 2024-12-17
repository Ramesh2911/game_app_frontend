import React, { useEffect, useMemo, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import DataTable from 'react-data-table-component';
import DataTableSettings from '../../../helpers/DataTableSettings';
import { Col, Form, Row } from 'react-bootstrap';
import CommonLoader from '../loader/CommonLoader';
import axios from 'axios';
import {
   API_USER_WITHDRAWAL_INFO
}
   from '../../../config/Api';
import { Button } from 'rsuite';

const ListWithdrawal = (props) => {

   const login = localStorage.getItem("phone");
   const accessToken = localStorage.getItem("token");

   const customStyles = {
      headCells: {
         style: {
            backgroundColor: "#6082b6",
            borderRight: "1px solid white",
            color: "white",
         },
      },
   };

   useEffect(() => {
      fetchWithdrawalData();
   }, []);

   const [filterText, setFilterText] = useState("");
   const [loadingIndicator, setLoadingIndicator] = useState(false);
   const [withdrawalData, setwithdrawalData] = useState([]);
   const searchParam = [
      "name",
      "email",
      "phone",
      "status",
      "account_holder_name",
      "account_number",
      "ifsc_code"
   ];

   const fetchWithdrawalData = () => {
      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      axios({
         method: "POST",
         url: API_USER_WITHDRAWAL_INFO,
         headers: headers,
      })
         .then((res) => {
            const result = res?.data?.data;
            setwithdrawalData(result);
            setLoadingIndicator(false);
         }).catch((e) => {
            console.log(e);
         });
   };

   const columns = [
      {
         name: <h5 style={{ minWidth: "120px" }}>Name</h5>,
         selector: (row) => row.name,
         sortable: true,
         cell: (row) => <div style={{ whiteSpace: "nowrap" }}>{row.name}</div>,
      },
      {
         name: <h5 style={{ minWidth: "200px" }}>Email</h5>,
         selector: (row) => row.email,
         sortable: true,
         cell: (row) => (
            <div
               title={row.email} // Tooltip displays full value on hover
               style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
               }}
            >
               {row.email}
            </div>
         ),
      },
      {
         name: <h5 style={{ minWidth: "120px" }}>Phone</h5>,
         selector: (row) => row.phone,
         sortable: true,
         cell: (row) => (
            <div
               title={row.phone} // Tooltip for phone
               style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
               }}
            >
               {row.phone}
            </div>
         ),
      },
      {
         name: <h5>Amount</h5>,
         selector: (row) => row.withdrawal_amount,
         sortable: true,
      },
      {
         name: <h5>Account Holder Name</h5>,
         selector: (row) => row.account_holder_name,
         sortable: true,
      },
      {
         name: <h5>Account Number</h5>,
         selector: (row) => row.account_number,
         sortable: true,
      },
      {
         name: <h5>IFSC Code</h5>,
         selector: (row) => row.ifsc_code,
         sortable: true,
      },
      {
         name: <h5>Paytm Number</h5>,
         selector: (row) => row.paytm_number,
         sortable: true,
      },
      {
         name: <h5>UPI Address</h5>,
         selector: (row) => row.upi_address,
         sortable: true,
      },
      {
         name: <h5>Status</h5>,
         selector: (row) => row.statusText,
         sortable: true,
      },
      {
         name: <h5>Date</h5>,
         selector: (row) => row.created_at,
         sortable: true,
         cell: (row) => {
            const [date, time] = row.created_at.split(" ");
            return (
               <div style={{ textAlign: "center" }}>
                  <div>{date}</div>
                  <div style={{ fontSize: "12px", color: "#555" }}>{time}</div>
               </div>
            );
         },
      },
      {
         name: <h5>Action</h5>,
         center: true,
         cell: (row) => {
            return row.statusText === "Pending" ? (
               <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                     color="blue"
                     appearance="primary"
                     size="sm"
                  >
                     Approve
                  </Button>
                  <Button
                     color="red"
                     appearance="primary"
                     size="sm"
                  >
                     Reject
                  </Button>
               </div>
            ) : (
               <span>Status Updated</span>
            );
         },
      },
   ];



   const subHeaderComponentMemo = useMemo(() => {
      return (
         <div>
            <Row>
               <Col lg={12}>
                  <Form className="d-flex">
                     <Form.Control
                        type="search"
                        placeholder="Search..."
                        className="me-2 rounded-pill"
                        aria-label="Search"
                        onChange={(e) => setFilterText(e.target.value)}
                     />
                  </Form>
               </Col>
            </Row>
         </div>
      );
   }, []);

   return (
      <>
         <PageTitle activeMenu={"Withdrawal List"} motherMenu={"Wallet"} />

         <div className="table-responsive">
            <DataTable
               columns={withdrawalData.length > 0 ? columns : []}
               data={DataTableSettings.filterItems(
                  withdrawalData,
                  searchParam,
                  filterText
               )}
               customStyles={customStyles}
               direction="auto"
               highlightOnHover
               persistTableHead
               pagination
               paginationPerPage={DataTableSettings.paginationPerPage}
               paginationRowsPerPageOptions={
                  DataTableSettings.paginationRowsPerPageOptions
               }
               subHeader
               fixedHeaderScrollHeight="400px"
               subHeaderComponent={subHeaderComponentMemo}
               progressPending={loadingIndicator}
               progressComponent={
                  <CommonLoader loadingIndicator={loadingIndicator} />
               }
            />
         </div>
      </>
   );
};

export default ListWithdrawal;
