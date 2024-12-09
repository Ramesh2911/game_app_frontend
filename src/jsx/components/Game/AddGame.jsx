import React, { useState } from 'react';
import PageTitle from "../../layouts/PageTitle";
import { Col, Row } from 'react-bootstrap';
import { Button, Input, Uploader, Checkbox } from "rsuite";
import Select from "react-select";
import { DatePicker } from 'antd';

const AddGame = (props) => {

   const gameTypeOptions = [
      { label: "Single", value: "SINGLE" },
      { label: "Patti", value: "PATTI" },
      { label: "Juri", value: "JURI" },
   ];

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
      game_name: "",
      game_pic: "",
      game_type_name: "",
      min_entry_fee: "",
      max_entry_fee: "",
      noOf_item_choose: "",
      prize_value_noOf_times: "",
      start_date_time: "",
      end_date_time: "",
      is_active: 1
   };

   const [formValues, setFormValues] = useState(initialValues);
   const [errors, setErrors] = useState({});
   const [selectedGameType, setSelectedGameType] = useState("");
   const [selectedSlot, setSelectedSlot] = useState(null);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      setErrors({ ...errors, [name]: "" });
   };

   const handleGameTypeChange = (selectedOption) => {
      setSelectedGameType(selectedOption ? selectedOption.value : "");
   };

   const getNumberChoice = () => {
      switch (selectedGameType) {
         case "SINGLE":
            return 1;
         case "PATTI":
            return 3;
         case "JURI":
            return 2;
         default:
            return "";
      }
   };

   const validateForm = () => {
      const
         {
            game_name,
            game_pic,
            game_type_name,
            min_entry_fee,
            max_entry_fee,
            noOf_item_choose,
            prize_value_noOf_times,
         }
            = formValues;
      const errors = {};
      let isValid = true;

      if (!phone) {
         isValid = false;
         errors.phone = "Phone is Required";
      }
      if (!password) {
         isValid = false;
         errors.password = "Password is Required";
      }

      setErrors(errors);
      return isValid;
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
                                 value={formValues.game_name ?? ""}
                                 placeholder="Enter Game name"
                                 onChange={(e) => handleChange(e, "game_name")}
                              />

                           </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="game_pic">
                                 Photo
                              </label>
                              <Uploader
                                 listType="picture-text"
                                 // defaultFileList={fileList}
                                 action="//jsonplaceholder.typicode.com/posts/"
                              >
                                 <Button>Select files...</Button>
                              </Uploader>
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="game_type_name">
                                 Type Name
                              </label>
                              <Select
                                 options={gameTypeOptions}
                                 isClearable={true}
                                 onChange={handleGameTypeChange}
                              />
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
                                 value={formValues.min_entry_fee ?? ""}
                                 placeholder="Enter  Minimum Entry Fee"
                                 onKeyDown={props.handleKeyPress}
                                 onChange={(e) => handleChange(e, "min_entry_fee")}
                              />

                           </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="max_entry_fee">
                                 Maxmimum Entry Fee
                              </label>

                              <Input
                                 type="text"
                                 name="max_entry_fee"
                                 value={formValues.max_entry_fee ?? ""}
                                 placeholder="Enter  Maxmimum Entry Fee"
                                 onKeyDown={props.handleKeyPress}
                                 onChange={(e) => handleChange(e, "max_entry_fee")}
                              />
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="noOf_item_choose">
                                 Number Choice
                              </label>
                              <Input
                                 type="text"
                                 name="noOf_item_choose"
                                 disabled={selectedGameType === ""}
                                 value={getNumberChoice()}
                                 readOnly
                              />
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
                                 onChange={(e) => handleChange(e, "prize_value_noOf_times")}
                              />
                           </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <label className="form-label" htmlFor="game_type_name">
                                 Slot
                              </label>
                              <Select
                                 options={gameSlotOptions}
                                 isClearable={true}
                                 onChange={(option) => setSelectedSlot(Number(option?.value) || null)}
                              />
                           </div>
                        </div>
                        {Array.from({ length: selectedSlot || 0 }, (_, index) => (
                           <div key={index} className="row">
                              <div className="col-lg-6 col-md-6 col-sm-6">
                                 <div className="form-group">
                                    <label className="form-label">Start Date Time {index + 1}</label>
                                    <DatePicker
                                       showTime
                                       format="YYYY-MM-DD HH:mm:ss"
                                       style={{ width: "100%" }}
                                       placeholder={`Select Start Date Time ${index + 1}`}
                                    />
                                 </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-6">
                                 <div className="form-group">
                                    <label className="form-label">End Date Time {index + 1}</label>
                                    <DatePicker
                                       showTime
                                       format="YYYY-MM-DD HH:mm:ss"
                                       style={{ width: "100%" }}
                                       placeholder={`Select End Date Time ${index + 1}`}
                                    />
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                           <div className="form-group">
                              <Checkbox>Active</Checkbox>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end">
                        <Button appearance="primary">Submit</Button>
                     </div>

                  </div>
               </div>
            </Col>
         </Row>
      </>
   );
};

export default AddGame;