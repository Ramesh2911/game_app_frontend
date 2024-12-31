import React, { useEffect, useState } from 'react';
import PageTitle from "../../layouts/PageTitle";
import { Col, Form, Row } from 'react-bootstrap';
import { Button, Input, Checkbox } from "rsuite";
import Select from "react-select";
import {
   API_CREATE_GAME
}
   from '../../../config/Api';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddGame = (props) => {
   const navigate = useNavigate();

   const gameTypeOptions = [
      { label: "Single", value: "SINGLE" },
      { label: "Patti", value: "PATTI" },
      { label: "Juri", value: "JURI" },
   ];

   const initialValues = {
      game_name: "",
      game_pic: null,
      game_type_name: [],
      min_entry_fee: "",
      max_entry_fee: "",
      noOf_item_choose: "",
      prize_value_noOf_times: "",
      start_date: "",
      end_date: "",
      is_active: 1
   };

   const [formValues, setFormValues] = useState(initialValues);
   const [errors, setErrors] = useState({});
   const [selectedGameTypes, setSelectedGameTypes] = useState([]);

   useEffect(() => {
      const numberChoices = getNumberChoices(selectedGameTypes);
      setFormValues((prevValues) => ({
         ...prevValues,
         noOf_item_choose: numberChoices,
      }));
   }, [selectedGameTypes]);

   const handleChange = (name, value) => {
      if (name === "game_pic" && value instanceof File) {
         setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
         }));
      } else {
         setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
         }));
      }

      setErrors((prevErrors) => ({
         ...prevErrors,
         [name]: "",
      }));
   };

   const handleGameTypeChange = (selectedOptions) => {
      const gameTypeNames = selectedOptions ? selectedOptions.map(option => option.value) : [];
      setSelectedGameTypes(gameTypeNames);
      handleChange("game_type_name", gameTypeNames);
   };

   const getNumberChoices = (gameTypes) => {
      const choices = [];
      gameTypes.forEach(type => {
         switch (type) {
            case "SINGLE":
               choices.push({ label: "Number Choice - Single", value: 1 });
               break;
            case "PATTI":
               choices.push({ label: "Number Choice - Patti", value: 3 });
               break;
            case "JURI":
               choices.push({ label: "Number Choice - Juri", value: 2 });
               break;
            default:
               break;
         }
      });
      return choices;
   };


   const validateForm = () => {
      const
         {
            game_name,
            game_pic,
            game_type_name,
            min_entry_fee,
            max_entry_fee,
            prize_value_noOf_times,
         }
            = formValues;
      const errors = {};
      let isValid = true;

      if (!game_name) {
         isValid = false;
         errors.game_name = "Game name is Required";
      }
      if (!game_pic) {
         isValid = false;
         errors.game_pic = "Photo is Required";
      }
      if (!game_type_name) {
         isValid = false;
         errors.game_type_name = "Type name is Required";
      }
      if (!min_entry_fee) {
         isValid = false;
         errors.min_entry_fee = "Minimum entry fee is Required";
      } else if (parseFloat(min_entry_fee) < 10) {
         isValid = false;
         errors.min_entry_fee = "Minimum entry fee must be at least 10";
      }
      if (!max_entry_fee) {
         isValid = false;
         errors.max_entry_fee = "Maximum entry fee is Required";
      } else if (parseFloat(max_entry_fee) > 1000) {
         isValid = false;
         errors.max_entry_fee = "Maximum entry fee cannot exceed 1000";
      }
      if (!prize_value_noOf_times) {
         isValid = false;
         errors.prize_value_noOf_times = "Prize value is Required";
      }

      setErrors(errors);
      return isValid;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }

      const formData = new FormData();
      if (formValues.game_pic) {
         formData.append('game_pic', formValues.game_pic);
      }
      formData.append('game_name', formValues.game_name);
      formData.append('game_type_name', formValues.game_type_name);
      formData.append('min_entry_fee', formValues.min_entry_fee);
      formData.append('max_entry_fee', formValues.max_entry_fee);
      formData.append('noOf_item_choose', formValues.noOf_item_choose);
      formData.append('prize_value_noOf_times', formValues.prize_value_noOf_times);
      formData.append('start_date', formValues.start_date);
      formData.append('end_date', formValues.end_date);
      formData.append('is_active', formValues.is_active);

      try {
         const response = await axios({
            method: 'POST',
            url: API_CREATE_GAME,
            data: formData,
         });
         if (response.status) {
            Swal.fire({
               position: "top-end",
               icon: "success",
               title: response.message,
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
         <PageTitle activeMenu={"Create Game"} motherMenu={"Game"} />

         <Row>
            <Col lg={12}>
               <div className="card shadow">
                  <div className="card-body">
                     <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="game_name">
                                 Game Name
                              </label>
                              <Input
                                 type="text"
                                 name="game_name"
                                 value={formValues.game_name || ""}
                                 placeholder="Enter Game name"
                                 onChange={(value) => handleChange("game_name", value)}
                              />
                              <div className="text-danger fs-12">
                                 {!formValues.game_name && errors.game_name}
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <Form.Group className="mb-2" controlId="game_pic">
                              <Form.Label>
                                 Photo
                              </Form.Label>
                              <Form.Control
                                 size="sm"
                                 type="file"
                                 name='game_pic'
                                 onChange={(e) => handleChange("game_pic", e.target.files[0])}
                              />
                              <div className="text-danger fs-12">
                                 {!formValues.game_pic && errors.game_pic}
                              </div>
                           </Form.Group>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="game_type_name">
                                 Type Name
                              </label>
                              <Select
                                 options={gameTypeOptions}
                                 isClearable={true}
                                 isMulti={true}
                                 onChange={handleGameTypeChange}
                              />
                              <div className="text-danger fs-12">
                                 {!formValues.game_type_name && errors.game_type_name}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="min_entry_fee">
                                 Minimum Entry Fee
                              </label>
                              <Input
                                 type="text"
                                 name="min_entry_fee"
                                 value={formValues.min_entry_fee || ""}
                                 placeholder="Enter  Minimum Entry Fee"
                                 onKeyDown={props.handleKeyPress}
                                 onChange={(value) => handleChange("min_entry_fee", value)}
                              />
                              <div className="text-danger fs-12">
                                 {!formValues.min_entry_fee && errors.min_entry_fee}
                                 {formValues.min_entry_fee && parseFloat(formValues.min_entry_fee) < 10 && errors.min_entry_fee}
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="max_entry_fee">
                                 Maximum Entry Fee
                              </label>
                              <Input
                                 type="text"
                                 name="max_entry_fee"
                                 value={formValues.max_entry_fee ?? ""}
                                 placeholder="Enter  Maxmimum Entry Fee"
                                 onKeyDown={props.handleKeyPress}
                                 onChange={(value) => handleChange("max_entry_fee", value)}
                              />
                              <div className="text-danger fs-12">
                                 {!formValues.max_entry_fee && errors.max_entry_fee}
                                 {formValues.max_entry_fee && parseFloat(formValues.max_entry_fee) > 1000 && errors.max_entry_fee}
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                           <div className="form-group">
                              {selectedGameTypes.map((type) => {
                                 const label = `Number Choice - ${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}`;
                                 const value = type === "SINGLE" ? 1 : type === "PATTI" ? 3 : 2;
                                 return (
                                    <div key={type} className="form-group mb-3">
                                       <label className="form-label">{label}</label>
                                       <Input
                                          type="text"
                                          name="noOf_item_choose"
                                          value={value}
                                          readOnly
                                       />
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="prize_value_noOf_times">
                                 Prize Value
                              </label>
                              <Input
                                 type="text"
                                 name="prize_value_noOf_times"
                                 value={formValues.prize_value_noOf_times ?? ""}
                                 placeholder="Enter Prize Value"
                                 onKeyDown={props.handleKeyPress}
                                 onChange={(value) => handleChange("prize_value_noOf_times", value)}
                              />
                              <div className="text-danger fs-12">
                                 {!formValues.prize_value_noOf_times && errors.prize_value_noOf_times}
                              </div>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <Form.Group className="mb-3" controlId="start_date">
                              <Form.Label>Start Date</Form.Label>
                              <Form.Control
                                 size="sm"
                                 type="date"
                                 name='start_date'
                                 value={formValues.start_date ?? ""}
                                 onChange={(e) => handleChange("start_date", e.target.value)}
                              />
                           </Form.Group>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <Form.Group className="mb-3" controlId="end_date">
                              <Form.Label>End Date</Form.Label>
                              <Form.Control
                                 size="sm"
                                 type="date"
                                 name='end_date'
                                 value={formValues.end_date ?? ""}
                                 onChange={(e) => handleChange("end_date", e.target.value)}
                              />
                           </Form.Group>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <Checkbox
                                 name="is_active"
                                 checked={formValues.is_active === 1}
                                 onChange={handleChange}
                              >
                                 Active
                              </Checkbox>
                           </div>
                        </div>
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

export default AddGame;
