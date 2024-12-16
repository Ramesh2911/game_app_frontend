import React, { useEffect, useMemo, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import DataTable from 'react-data-table-component';
import DataTableSettings from '../../../helpers/DataTableSettings';
import { Col, Form, Row } from 'react-bootstrap';
import CommonLoader from "../loader/CommonLoader";
import {
   API_USER_WALLET_INFO,
   API_WALLET_STATUS_UPDATE
}
   from '../../../config/Api';
import axios from 'axios';
import { Button } from 'rsuite';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ListWallet = (props) => {

   const login = localStorage.getItem("phone");
   const accessToken = localStorage.getItem("token");

   useEffect(() => {
      fetchWalletData();
   }, []);

   const customStyles = {
      headCells: {
         style: {
            backgroundColor: "#6082b6",
            borderRight: "1px solid white",
            color: "white",
         },
      },
   };

   const [filterText, setFilterText] = useState("");
   const [loadingIndicator, setLoadingIndicator] = useState(false);
   const [walletInfoData, setWalletInfoData] = useState([]);
   const searchParam = [
      "name",
      "email",
      "phone",
      "status",
      "transaction_id",
      "wallet_amount",
   ];

   const fetchWalletData = () => {
      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      axios({
         method: "POST",
         url: API_USER_WALLET_INFO,
         headers: headers,
      })
         .then((res) => {
            const result = res?.data?.data;
            setWalletInfoData(result);
            setLoadingIndicator(false);
         }).catch((e) => {
            console.log(e);
         });
   };

   const columns = [
      {
         name: <h5>Name</h5>,
         selector: (row) => row.name,
         sortable: true,
      },
      {
         name: <h5>Email</h5>,
         selector: (row) => row.email,
         sortable: true,
         cell: (row) => <span style={{ whiteSpace: "nowrap" }}>{row.email}</span>,
      },
      {
         name: <h5>Phone</h5>,
         selector: (row) => row.phone,
         sortable: true,
      },
      {
         name: <h5>Amount</h5>,
         selector: (row) => row.wallet_amount,
         sortable: true,
      },
      {
         name: <h5>Transaction ID</h5>,
         selector: (row) => row.transaction_id,
         sortable: true,
      },
      {
         name: <h5>Status</h5>,
         selector: (row) => row.status,
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
            return row.status === "Pending" ? (
               <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                     color="blue"
                     appearance="primary"
                     size="sm"
                     onClick={() => handleUpdate(row.user_id, row.wallet_id, 1)}
                  >
                     Approve
                  </Button>
                  <Button
                     color="red"
                     appearance="primary"
                     size="sm"
                     onClick={() => handleUpdate(row.user_id, row.wallet_id, 2)}
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

   const handleUpdate = async (user_id, wallet_id, status) => {
      try {

         const response = await axios.put(
            `${API_WALLET_STATUS_UPDATE}/${wallet_id}`,
            { status }
         );
         if (response.data.status) {
            Swal.fire({
               position: "top-end",
               icon: "success",
               title: response.data.message,
               showConfirmButton: false,
               timer: 1500,
            });
            fetchWalletData();
         } else {
            toast.error(response.data.message || "Failed to approve wallet", {
               position: toast.POSITION.TOP_CENTER,
               autoClose: 5000,
            });
         }
      } catch (e) {
         const errorMessage = e.response && e.response.data && e.response.data.message
            ? e.response.data.message
            : "An error occurred. Please try again.";
      }
   };


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
         <PageTitle activeMenu={"Wallet List"} motherMenu={"Wallet"} />

         <div className="table-responsive">
            <DataTable
               columns={walletInfoData.length > 0 ? columns : []}
               data={DataTableSettings.filterItems(
                  walletInfoData,
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

export default ListWallet;