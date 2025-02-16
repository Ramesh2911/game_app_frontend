import React, { useEffect, useMemo, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import DataTable from 'react-data-table-component';
import DataTableSettings from '../../../helpers/DataTableSettings';
import { Col, Form, Row } from 'react-bootstrap';
import CommonLoader from '../loader/CommonLoader';
import { API_GAME_LIST, API_GAME_TYPE_NAME, API_RESULT_LIST, API_RESULT_UPDATE, API_SLOT_INFO } from '../../../config/Api';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResultList = (props) => {

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
      fetchResultData();
   }, []);

   useEffect(() => {
      fetchListGame();
      fetchGameName();
      fetchSlotData();
   }, []);


   const [filterText, setFilterText] = useState("");
   const [loadingIndicator, setLoadingIndicator] = useState(false);
   const [resultData, setResultData] = useState([]);
   const [listData, setListData] = useState([]);
   const [typeName, setTypeName] = useState([]);
   const [slotInfo, setSlotInfo] = useState([]);
   const [editRow, setEditRow] = useState(null);
   const [editedWinnerValue, setEditedWinnerValue] = useState('');
   const searchParam = [
      "game_id",
      "game_type_id",
   ];

   const fetchResultData = () => {
      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      axios({
         method: "POST",
         url: API_RESULT_LIST,
         headers: headers,
      })
         .then((res) => {
            const result = res?.data?.data;
            setResultData(result);
            setLoadingIndicator(false);
         }).catch((e) => {
            console.log(e);
         });
   };

   const fetchListGame = () => {
      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      const payload = {
         type: "ADMIN"
      };

      axios({
         method: "POST",
         url: API_GAME_LIST,
         headers: headers,
         data: payload,
      })
         .then((res) => {
            const result = res.data?.gameList;
            setListData(result);
            setLoadingIndicator(false);
         }).catch((e) => {
            console.log(e);
         });
   };

   const fetchGameName = () => {
      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      axios({
         method: "POST",
         url: API_GAME_TYPE_NAME,
         headers: headers,
      })
         .then((res) => {
            const result = res.data?.data;
            setTypeName(result);
            setLoadingIndicator(false);
         }).catch((e) => {
            console.log(e);
         });
   };

   const fetchSlotData = () => {
      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      axios({
         method: "POST",
         url: API_SLOT_INFO,
         headers: headers,
      })
         .then((res) => {
            const result = res.data?.data;
            setSlotInfo(result);
            setLoadingIndicator(false);
         }).catch((e) => {
            console.log(e);
         });
   };

   const handleCancelClick = () => {
      setEditRow(null);
   };

   const handleUpdateClick = async (row) => {

      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      const payload = {
         result_id: row.result_id,
         winner_value: editedWinnerValue,
      };

      try {
         const response = await axios({
            method: "PUT",
            url: API_RESULT_UPDATE,
            headers: headers,
            data: payload,
         });

         if (response.status === 200) {
            Swal.fire({
               position: "top-end",
               icon: "success",
               title: "Row updated successfully!",
               showConfirmButton: false,
               timer: 1500,
            });
            setEditRow(null);
            fetchResultData();
         } else {
            Swal.fire({
               position: "top-end",
               icon: "error",
               title: "Failed to update row",
               showConfirmButton: true,
            });
         }
      } catch (error) {
         console.error('Error:', error.response || error.message || error);
      }
   };


   const columns = [
      {
         name: <h5>Game Name</h5>,
         selector: (row) => {
            const game = listData.find((game) => game.game_id === row.game_id);
            return game ? game.game_name : "Unknown Game";
         },
         sortable: true,
      },
      {
         name: <h5>Game Type Name</h5>,
         selector: (row) => {
            const name = typeName.find((result) => result.game_type_id === row.game_type_id);
            return name ? name.game_type_name : "Unknown Name";
         },
         sortable: true,
      },
      {
         name: <h5>Date</h5>,
         selector: (row) => row.result_date,
         sortable: true,
      },
      {
         name: <h5>Slot</h5>,
         selector: (row) => {
            const slotTime = slotInfo.find((result) => result.slot_id === row.slot_id);
            return slotTime ? `${slotTime.start_time} - ${slotTime.end_time}` : "Unknown Slot";
         },
         sortable: true,
      },
      {
         name: <h5>Winner No.</h5>,
         selector: (row) => {
            if (editRow === row.result_id) {
               return (
                  <Form.Control
                     type="text"
                     value={editedWinnerValue}
                     onChange={(e) => setEditedWinnerValue(e.target.value)}
                  />
               );
            }
            return row.winner_value;
         },
         sortable: true,
      },
      {
         name: <h5>Action</h5>,
         center: true,
         cell: (row) => (
            <div>
               {editRow === row.result_id ? (
                  <>
                     <button
                        onClick={() => handleUpdateClick(row)}
                        className="btn btn-success btn-sm"
                     >
                        Update
                     </button>
                     <button
                        onClick={handleCancelClick}
                        className="btn btn-danger btn-sm"
                        style={{ marginLeft: "10px" }}
                     >
                        Cancel
                     </button>
                  </>
               ) : (
                  <Link>
                     <i
                        className="la la-edit"
                        style={{ fontSize: "30px", cursor: "pointer" }}
                        onClick={() => handleEditClick(row)}
                     ></i>
                  </Link>
               )}
            </div>
         ),
      },
   ];

   const handleEditClick = (row) => {
      setEditRow(row.result_id);
      setEditedWinnerValue(row.winner_value);
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
         <PageTitle activeMenu={"Result List"} motherMenu={"Result"} />

         <div className="table-responsive">
            <DataTable
               columns={resultData.length > 0 ? columns : []}
               data={DataTableSettings.filterItems(
                  resultData,
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

export default ResultList;
