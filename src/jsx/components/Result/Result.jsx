import React, { useEffect, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import { Col, Row } from 'react-bootstrap';
import { Button, Input } from 'rsuite';
import Select from "react-select";
import {
   API_GAME_LIST,
   API_GAME_TYPE_LIST,
   API_RESULT_CREATE,
   API_SLOT_LIST
} from '../../../config/Api';
import axios from 'axios';
import Swal from 'sweetalert2';

const Result = (props) => {

   const login = localStorage.getItem("phone");
   const accessToken = localStorage.getItem("token");

   const initialValues = {
      game_id: "",
      game_type_id: "",
      slot_id: [],
      winner_values: {},
   };

   const [formValues, setFormValues] = useState(initialValues);
   const [errors, setErrors] = useState({});
   const [listData, setListData] = useState([]);
   const [gameTypeData, setGameTypeData] = useState([]);
   const [slotData, setSlotData] = useState([]);

   useEffect(() => {
      fetchListGame();
   }, []);

   useEffect(() => {
      formValues.game_id && fetchListGameType();
   }, [formValues.game_id]);

   useEffect(() => {
      formValues.game_id && formValues.game_type_id && fetchSlot();
   }, [formValues.game_id, formValues.game_type_id]);

   const fetchListGame = () => {
      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      const payload = {
         type: "ADMIN"
      };

      axios.post(API_GAME_LIST, payload, { headers })
         .then((res) => {
            const formattedData = res.data?.gameList?.map((game) => ({
               value: game.game_id,
               label: game.game_name,
            }));
            setListData(formattedData);
         })
         .catch(console.error);
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

      axios.post(API_GAME_TYPE_LIST, payload, { headers })
         .then((res) => {
            const formattedData = res.data?.gameTypeList?.map((type) => ({
               value: type.game_type_id,
               label: type.game_type_name,
            }));
            setGameTypeData(formattedData);
         })
         .catch(console.error);
   };

   const fetchSlot = () => {
      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      const payload = {
         game_id: formValues.game_id,
         game_type_id: formValues.game_type_id,
      };

      axios.post(API_SLOT_LIST, payload, { headers })
         .then((res) => {
            const formattedData = res.data?.data?.map((type) => ({
               value: type.slot_id,
               label: `${type.start_time} - ${type.end_time}`,
            }));
            setSlotData(formattedData);
         })
         .catch(console.error);
   };

   const handleChange = (e, field) => {
      if (field === 'game_id') {
         setFormValues({
            ...formValues,
            game_id: e ? e.value : "",
            game_type_id: "",
            slot_id: [],
            winner_values: {},
         });
         setGameTypeData([]);
         setSlotData([]);
      } else if (field === 'game_type_id') {
         setFormValues({
            ...formValues,
            game_type_id: e ? e.value : "",
            slot_id: [],
            winner_values: {},
         });
         setSlotData([]);
      } else if (field === 'slot_id') {
         const selectedSlots = e ? e.map((item) => item.value) : [];
         const updatedWinnerValues = Object.keys(formValues.winner_values)
            .filter((key) => selectedSlots.includes(parseInt(key)))
            .reduce((acc, key) => {
               acc[key] = formValues.winner_values[key];
               return acc;
            }, {});
         setFormValues({
            ...formValues,
            slot_id: selectedSlots,
            winner_values: updatedWinnerValues,
         });
      }
   };

   const handleWinnerValueChange = (slotId, value) => {
      setFormValues((prevState) => ({
         ...prevState,
         winner_values: {
            ...prevState.winner_values,
            [slotId]: value,
         },
      }));
   };

   const validateForm = () => {
      const { game_id, game_type_id, slot_id, winner_values } = formValues;
      const errors = {};
      let isValid = true;

      if (!game_id) {
         isValid = false;
         errors.game_id = "Game name is required.";
      }
      if (!game_type_id) {
         isValid = false;
         errors.game_type_id = "Game type name is required.";
      }
      if (!slot_id.length) {
         isValid = false;
         errors.slot_id = "At least one slot must be selected.";
      }
      slot_id.forEach((slotId) => {
         if (!winner_values[slotId] || winner_values[slotId].trim() === "") {
            isValid = false;
            errors[`winner_values_${slotId}`] = "Field is required.";
         }
      });

      setErrors(errors);
      return isValid;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      const headers = {
         "Content-Type": "application/json",
         "login": login,
         "access_token": accessToken,
      };

      const payload = {
         game_id: formValues.game_id,
         game_type_id: formValues.game_type_id,
         slot_id: formValues.slot_id,
         winner_values: formValues.winner_values,
      };

      try {
         const response = await axios({
            method: 'POST',
            url: API_RESULT_CREATE,
            headers: headers,
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
            // setTimeout(() => {
            //    navigate("/list-game");
            // }, 1500);
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
         <PageTitle activeMenu={"Create Result"} motherMenu={"Result"} />
         <Row>
            <Col lg={12}>
               <div className="card shadow">
                  <div className="card-body">
                     <div className="row">
                        <div className="col-lg-4">
                           <label>Game Name</label>
                           <Select
                              isClearable
                              options={listData}
                              value={listData.find((item) => item.value === formValues.game_id) || null}
                              onChange={(e) => handleChange(e, "game_id")}
                           />
                           <div className="text-danger fs-12">
                              {!formValues.game_id && errors.game_id}
                           </div>
                        </div>
                        <div className="col-lg-4">
                           <label>Game Type Name</label>
                           <Select
                              isClearable
                              options={gameTypeData}
                              value={gameTypeData.find((item) => item.value === formValues.game_type_id) || null}
                              onChange={(e) => handleChange(e, "game_type_id")}
                           />
                           <div className="text-danger fs-12">
                              {!formValues.game_type_id && errors.game_type_id}
                           </div>
                        </div>
                        <div className="col-lg-4">
                           <label>Slot</label>
                           <Select
                              isMulti
                              options={slotData}
                              value={slotData.filter((item) => formValues.slot_id.includes(item.value))}
                              onChange={(e) => handleChange(e, "slot_id")}
                           />
                           <div className="text-danger fs-12">
                              {!formValues.slot_id.length && errors.slot_id}
                           </div>
                        </div>
                     </div>

                     <div className="row mt-4">
                        {formValues.slot_id.map((slotId) => {
                           const slotLabel = slotData.find((slot) => slot.value === slotId)?.label || `Slot ${slotId}`;
                           return (
                              <div className="col-lg-4" key={slotId}>
                                 <label>Winner Value - {slotLabel}</label>
                                 <Input
                                    type="text"
                                    value={formValues.winner_values[slotId] || ""}
                                    onChange={(value) => handleWinnerValueChange(slotId, value)}
                                 />
                                 {/* <div className="text-danger fs-12">
                                    {errors[`winner_values_${slotId}`]}
                                 </div> */}
                              </div>
                           );
                        })}
                     </div>

                     <div className="d-flex justify-content-end mt-4">
                        <Button appearance="primary" onClick={handleSubmit}>
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

export default Result;