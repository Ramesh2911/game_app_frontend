import React, { useEffect, useMemo, useState } from 'react';
import PageTitle from "../../layouts/PageTitle";
import DataTable from "react-data-table-component";
import CommonLoader from "../loader/CommonLoader";
import {
   API_GAME_LIST
}
   from '../../../config/Api';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import DataTableSettings from '../../../helpers/DataTableSettings';


const ListGame = (props) => {

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
      fetchListGame();
   }, []);

   const [loadingIndicator, setLoadingIndicator] = useState(false);
   const [listData, setListData] = useState([]);
   const [filterText, setFilterText] = useState("");
   const searchParam = [
      "game_id",
      "game_name",
   ];

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

   const columns = [
      {
         name: <h5>ID</h5>,
         selector: (row) => row.game_id,
         sortable: true,
      },
      {
         name: <h5>Game Name</h5>,
         selector: (row) => row.game_name,
         sortable: true,
      },
      {
         name: <h5>Action</h5>,
         center: true,
         cell: (row) => (
            <>
               <Link >
                  <i className="la la-edit" style={{ fontSize: '30px' }}></i>
               </Link>
               <Link >
                  <i className="la la-trash" style={{ fontSize: '30px' }}></i>
               </Link>
            </>
         ),
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
         <PageTitle activeMenu={"Game List"} motherMenu={"Game"} />

         <div className="table-responsive">
            <DataTable
               columns={listData.length > 0 ? columns : []}
               data={DataTableSettings.filterItems(
                  listData,
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

export default ListGame;
