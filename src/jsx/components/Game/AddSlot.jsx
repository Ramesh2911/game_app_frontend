import React, { useState, useEffect } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { Col, Row } from 'react-bootstrap';
import Select from "react-select";
import { Button } from 'rsuite';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import {
   API_CREATE_SLOT,
   API_GAME_LIST,
   API_GAME_TYPE_LIST
}
   from '../../../config/Api';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddSlot = (props) => {
   const navigate = useNavigate();
   const login = localStorage.getItem("phone");
   const accessToken = localStorage.getItem("token");

   const gameSlotOptions = [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
      { label: "7", value: "7" },
      { label: "8", value: "8" },
   ];

   const initialValues = {
      game_id: "",
      game_type_id: "",
      slot: "",
      start_time: [],
      end_time: [],
   };

   const [formValues, setFormValues] = useState(initialValues);
   const [errors, setErrors] = useState({});
   const [listData, setListData] = useState([]);
   const [gameTypeData, setGameTypeData] = useState([]);

   useEffect(() => {
      fetchListGame();
   }, []);

   useEffect(() => {
      formValues.game_id && fetchListGameType();
   }, [formValues.game_id]);

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
            const formattedData = result?.map((game) => ({
               value: game.game_id,
               label: game.game_name,
            }));
            setListData(formattedData);
         }).catch((e) => {
            console.log(e);
         });
   };

   const fetchListGameType = () => {
      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      const payload = {
         game_id: formValues.game_id,
         type: "ADMIN"
      };

      axios({
         method: "POST",
         url: API_GAME_TYPE_LIST,
         headers: headers,
         data: payload,
      })
         .then((res) => {
            const result = res.data?.gameTypeList;
            const formattedData = result?.map((type) => ({
               value: type.game_type_id,
               label: type.game_type_name,
            }));
            setGameTypeData(formattedData);
         }).catch((e) => {
            console.log(e);
         });
   };

   const handleChange = (e, field) => {
      if (field === 'game_id') {
         setFormValues(prevState => ({
            ...prevState,
            game_id: e ? e.value : null,
            game_type_id: null,
         }));
         setGameTypeData([]);
      }
      if (field === 'game_type_id') {
         setFormValues(prevState => ({
            ...prevState,
            game_type_id: e ? e.value : null
         }));
      }
      setErrors({
         ...errors,
         [field]: "",
      });
   };

   const handleSlotChange = (option) => {
      const slotCount = Number(option?.value) || 0;
      setFormValues(prevState => ({
         ...prevState,
         slot: slotCount,
         start_time: Array(slotCount).fill(""),
         end_time: Array(slotCount).fill(""),
      }));
      setErrors(prevState => ({ ...prevState, slot: "" }));
   };

   const handleTimeChange = (time, timeString, index, type) => {
      setFormValues(prevState => {
         const updatedTimes = [...prevState[type]];
         updatedTimes[index] = timeString;
         return { ...prevState, [type]: updatedTimes };
      });
   };

   const validateForm = () => {
      const { game_id, game_type_id, slot, start_time, end_time } = formValues;
      const errors = {};
      let isValid = true;

      if (!game_id) {
         isValid = false;
         errors.game_id = "Game name is Required";
      }
      if (!game_type_id) {
         isValid = false;
         errors.game_type_id = "Type name is Required";
      }
      if (!slot) {
         isValid = false;
         errors.slot = "Slot is Required";
      }
      if (slot > 0) {
         start_time.forEach((time, index) => {
            if (!time) {
               isValid = false;
               errors[`start_time_${index}`] = `Start time for slot ${index + 1} is required`;
            }
         });
         end_time.forEach((time, index) => {
            if (!time) {
               isValid = false;
               errors[`end_time_${index}`] = `End time for slot ${index + 1} is required`;
            }
         });
      }

      setErrors(errors);
      return isValid;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }

      const payload = {
         game_id: formValues.game_id,
         game_type_id: formValues.game_type_id,
         start_time: formValues.start_time,
         end_time: formValues.end_time,
      };

      try {
         const response = await axios({
            method: 'POST',
            url: API_CREATE_SLOT,
            data: payload,
         });
         if (response.status) {
            Swal.fire({
               position: "top-end",
               icon: "success",
               title: response.data.message,
               showConfirmButton: false,
               timer: 1500,
            });
            setTimeout(() => {
               navigate("/list-game");
            }, 1500);
         } else {
            Swal.fire({
               position: "top-end",
               icon: "error",
               title: "An error occurred",
               showConfirmButton: true,
            });
         }
         setFormValues(initialValues);
      } catch (error) {
         console.error('Error:', error.response || error.message || error);
      }
   };

   return (
      <>
         <PageTitle activeMenu={"Create Slot"} motherMenu={"Game"} />

         <Row>
            <Col lg={12}>
               <div className="card shadow">
                  <div className="card-body">
                     <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="game_id">
                                 Game Name
                              </label>
                              <Select
                                 isSearchable={true}
                                 isLoading={false}
                                 isClearable={true}
                                 name="game_id"
                                 value={
                                    formValues.game_id ?
                                       listData.find((item) => item.value === formValues.game_id)
                                       : null
                                 }
                                 options={listData}
                                 onChange={(e) => handleChange(e, "game_id")}
                              />
                              <div className="text-danger fs-12">
                                 {!formValues.game_id && errors.game_id}
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="game_type_id">
                                 Game Type
                              </label>
                              <Select
                                 isSearchable={true}
                                 isLoading={false}
                                 isClearable={true}
                                 name="game_type_id"
                                 value={
                                    formValues.game_type_id ?
                                       gameTypeData.find((item) => item.value === formValues.game_type_id)
                                       : null
                                 }
                                 options={gameTypeData}
                                 onChange={(e) => handleChange(e, "game_type_id")}
                              />
                              <div className="text-danger fs-12">
                                 {!formValues.game_type_id && errors.game_type_id}
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="game_type_name">
                                 Slot
                              </label>
                              <Select
                                 isClearable={true}
                                 options={gameSlotOptions}
                                 onChange={handleSlotChange}
                              />
                              <div className="text-danger fs-12">
                                 {!formValues.slot && errors.slot}
                              </div>
                           </div>
                        </div>
                        {Array.from({ length: formValues.slot }, (_, index) => (
                           <Row key={index}>
                              <Col lg={6}>
                                 <div className="form-group">
                                    <label>Start Time {index + 1}</label>
                                    <TimePicker
                                       onChange={(time, timeString) => handleTimeChange(time, timeString, index, 'start_time')}
                                       defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                    />
                                    <div className="text-danger">{errors[`start_time_${index}`]}</div>
                                 </div>
                              </Col>
                              <Col lg={6}>
                                 <div className="form-group">
                                    <label>End Time {index + 1}</label>
                                    <TimePicker
                                       onChange={(time, timeString) => handleTimeChange(time, timeString, index, 'end_time')}
                                       defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                    />
                                    <div className="text-danger">{errors[`end_time_${index}`]}</div>
                                 </div>
                              </Col>
                           </Row>
                        ))}
                        {/* {Array.from({ length: selectedSlot || 0 }, (_, index) => (
                           <div key={index} className="row">
                              <div className="col-lg-6 col-md-6 col-sm-6">
                                 <div className="form-group">
                                    <label className="form-label">Start Time {index + 1}</label>
                                    <TimePicker
                                       onChange={onChange}
                                       defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                    />
                                 </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-6">
                                 <div className="form-group">
                                    <label className="form-label">End Time {index + 1}</label>
                                    <TimePicker
                                       onChange={onChange}
                                       defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                                    />
                                 </div>
                              </div>
                           </div>
                        ))} */}
                     </div>

                     <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end">
                        <Button
                           appearance="primary"
                           onClick={handleSubmit}
                        >
                           Submit
                        </Button>
                     </div>
                  </div>
               </div>
            </Col>
         </Row>
      </>
   );
};

export default AddSlot;
