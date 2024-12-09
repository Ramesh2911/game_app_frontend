import React, { Component } from "react";
import axios from "axios";
import { refresh } from "../classes/auth";
import moment from "moment";
import Swal from "sweetalert2";

const Common = (WrappedComponent) => {
  class common extends Component {
    state = {
      ctrlDownKey: false,
    };

    callRequest(method, url, auth, data = "") {
      try {
        if (auth) {
          axios.defaults.headers.common["token"] =
            localStorage.getItem("token");
        }

        return new Promise((resolve, reject) => {
          axios({
            method: method,
            url: url,
            data: data,
          })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              const status = error.response ? error.response.status : null;
              if (status === 401 && auth) {
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: error.response.data.message,
                  showConfirmButton: false,
                  timer: 3000
                });
                let response = refresh(error);
                response.then((res) => {
                  resolve(res);
                });
              } else {
                reject(error);
              }
            });
        });
      } catch (e) {
        console.log("Call Request Error:", e);
      }
    }

    getCurrentMonth() {
      let month = moment().format("MMMM");
      return month;
    }

    getCurrentYear() {
      let year = moment().format("YYYY");
      return year;
    }

    getCurrentMonthYear() {
      let month_year = moment().format("MMMM-YYYY");
      return month_year;
    }

    getCurrentDate(dateFormat = "DD/MM/YYYY") {
      let today = moment().format(dateFormat);
      return today;
    }

    getNextDays(n = 7) {
      let days = [];
      let daysRequired = n;

      for (let i = 0; i < daysRequired; i++) {
        days.push(moment().add(i, "days").format("dddd,DD-MM-YYYY"));
      }
      return days;
    }

    getCurrentFinancialYear() {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      let financialYear;

      // Check if the current month is after March (which marks the end of the financial year)
      if (currentMonth >= 2) {
        financialYear = `${currentYear}-${currentYear + 1}`;
      } else {
        financialYear = `${currentYear - 1}-${currentYear}`;
      }

      return financialYear;
    }

    getFormatedDateTime(datetime, format = "hh:mm A, DD/MM/YYYY") {
      const dateTime = moment(datetime);
      const formattedDateTime = dateTime.format(format);
      return formattedDateTime;
    }

    getFormatedDate(datetime, format = "DD-MMM-YYYY") {
      const dateTime = moment(datetime);
      const formattedDateTime = dateTime.format(format);
      return formattedDateTime;
    }

    convertDate(dateString) {
      const date = new Date(dateString);

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const newDateString = `${day}-${month}-${year}`;

      return newDateString;
    }

    convertDateStringToYMD(dateString) {
      const date = new Date(dateString);

      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      const newDateString = `${year}-${month}-${day}`;

      return newDateString;
    }

    compareDate = (from_date, to_date = null) => {
      const f_date = new Date(from_date);
      const t_date = (to_date === null) ? new Date() : new Date(to_date);
      if (t_date > f_date) {
        return true;
      } else {
        return false;
      }
    };

    getDateObj(timestamp) {
      let date = new Date(timestamp * 1000),
        datevalues = {
          year: date.getFullYear(),
          month: ("0" + (date.getMonth() + 1)).slice(-2),
          date: ("0" + date.getDate()).slice(-2),
          hrs: ("0" + date.getHours()).slice(-2),
          min: ("0" + date.getMinutes()).slice(-2),
          sec: ("0" + date.getSeconds()).slice(-2),
        };

      return datevalues;
    }

    getExcerpt(text, len = 120) {
      if (text === "") {
        return text;
      } else {
        if (text.length > len) {
          let excerpt = text.substr(0, len) + " ...";
          return excerpt;
        } else {
          return text;
        }
      }
    }

    ucFirst(text) {
      const textCapitalized = text.charAt(0).toUpperCase() + text.slice(1);
      return textCapitalized;
    }

    getLowerCase(text) {
      return text.toLowerCase();
    }

    getCurrencyFormat(number) {
      let cur = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(number);

      return cur;
    }

    displayDashboardCurrency(number) {
      let cur = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(number);

      const [wholePart, decimalPart] = cur.split('.');

      return (
        <>
          {wholePart}<span className="small-superscript"><sup>{decimalPart}</sup></span>
        </>
      );
    }

    changeUrlToTitle(str, wordToReplace = "-", wordByReplace = " ") {
      let modified_string = "";
      const words = str.split(wordToReplace);

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }

      modified_string = words.join(wordByReplace);

      return modified_string;
    }

    getWeekdayNames() {
      const weekdayNames = {
        MONDAY: "MONDAY",
        TUESDAY: "TUESDAY",
        WEDNESDAY: "WEDNESDAY",
        THURSDAY: "THURSDAY",
        FRIDAY: "FRIDAY",
        SATURDAY: "SATURDAY",
        SUNDAY: "SUNDAY",
      };

      return weekdayNames;
    }

    getDuration() {
      const duration = {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
      };
      return duration;
    }

    getMonth() {
      const month = {
        "01": "JANUARY",
        "02": "FEBRUARY",
        "03": "MARCH",
        "04": "APRIL",
        "05": "MAY",
        "06": "JUNE",
        "07": "JULY",
        "08": "AUGUST",
        "09": "SEPTEMBER",
        "010": "OCTOBER",
        "011": "NOVEMBER",
        "012": "DECEMBER",
      };
      return month;
    }

    getGender() {
      const genderOptions = [
        { value: '', label: 'Select Gender' },
        { value: 'MALE', label: 'MALE' },
        { value: 'FEMALE', label: 'FEMALE' },
        { value: 'OTHER', label: 'OTHER' }
      ];
      return genderOptions;
    }

    getGovId() {
      const govIdOptions = [
        { value: '', label: 'Select Gov. ID Type' },
        { value: 'AADHAAR CARD', label: 'AADHAAR CARD' },
        { value: 'VOTER CARD', label: 'VOTER CARD' },
        { value: 'PAN CARD', label: 'PAN CARD' },
        { value: 'DRIVING LICENCE', label: 'DRIVING LICENCE' },
        { value: 'PASSPORT', label: 'PASSPORT' },
      ];
      return govIdOptions;
    }

    getCategory() {
      const categorysOptions = [
        "GENERAL",
        "SC",
        "ST",
        "OBC-A",
        "OBC-B"
      ];
      return categorysOptions;
    }

    getPayment() {
      const paymentOptions = [
        { value: '', label: 'Select Payment Option' },
        { value: '1', label: 'Full Payment' },
        { value: '2', label: 'Part Payment' },
        { value: '3', label: 'Custom Payment' },
      ];
      return paymentOptions;
    }

    getPaymentMode() {
      const paymentModeOptions = [
        { value: '', label: 'Select ' },
        { value: 'CASH', label: 'CASH' },
        { value: 'CHEQUE', label: 'CHEQUE' },
        { value: 'DEMAND DRAFT', label: 'DEMAND DRAFT' },
        { value: 'UPI', label: 'UPI' },
        { value: 'NET BANKING', label: 'NET BANKING' },
      ];
      return paymentModeOptions;
    }

    generateHours() {
      const startHour = 6; // Starting hour (06:00 AM)
      const endHour = 22; // Ending hour (10:00 PM)

      const hours = [];

      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const currentTime = new Date().setHours(hour, minute);
          const formattedTime = new Date(currentTime).toLocaleString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          hours.push(formattedTime.toUpperCase());
        }
      }
      return hours;
    }

    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    checkAlphaOnly(item) {
      const alphaOnlyPattern = new RegExp("^[a-zA-Z .]+$");
      return alphaOnlyPattern.test(item);
    }

    checkNumericOnly(item) {
      const numericOnlyPattern = new RegExp("^[0-9 ]+$");
      return numericOnlyPattern.test(item);
    }

    handleKeyPress = (event) => {
      const keyCode = event.charCode || event.keyCode;

      if (keyCode === 0 || keyCode === 8 || keyCode === 9 || keyCode === 46) return true;

      if (keyCode === 17) this.setState(prevState => { return { ...prevState, ctrlDownKey: true }; });
      if (this.state.ctrlDownKey && (keyCode === 86 || keyCode === 67)) return true;

      if (keyCode < 48) {
        event.preventDefault();
      } else if (keyCode > 57) {
        if (keyCode < 96 || keyCode > 105) {
          event.preventDefault();
        }
        else {
          return true;
        }
      }
    };

    getFileType = (file) => {
      let type;
      let source;
      let regexp =
        /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-)[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-)[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S)?$/;

      if (regexp.test(file)) {
        if (file.match(/\.(jpeg|jpg|png)$/)) {
          type = "image";
          source = file;
        } else {
          type = "video";
          source = file;
        }
      } else {
        type = file.type.split("/")[0];
        source = URL.createObjectURL(file);
      }

      return type + "~" + source;
    };

    isValidDate(dateString) {
      let regexPattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!regexPattern.test(dateString)) {
        return false;
      } else {
        return true;
      }
    }

    getFinancialYear() {
      let fiscalyear = "";
      let today = new Date();
      if ((today.getMonth() + 1) <= 3) {
        fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear();
      } else {
        let admissionfiscalyear = (today.getFullYear() + 1).toString().slice(2);
        fiscalyear = today.getFullYear() + "-" + (admissionfiscalyear);
      }
      return fiscalyear;
    }

    compareAndEqualDate = (from_date, to_date = null) => {
      const f_date = new Date(from_date);
      const t_date = (to_date === null) ? new Date() : new Date(to_date);
      if (this.convertDateStringToYMD(t_date) > this.convertDateStringToYMD(f_date)) {
        return true;
      } else if (this.convertDateStringToYMD(f_date) === this.convertDateStringToYMD(t_date)) {
        return true;
      } else {
        return false;
      }
    };

    getTimeFromDateString(dateString) {
      let timeString = "";
      if (dateString) {
        const hours = dateString.getHours().toString().padStart(2, '0');
        const minutes = dateString.getMinutes().toString().padStart(2, '0');
        timeString = `${hours}:${minutes}`;
      }
      return timeString;
    }

    render() {
      return (
        <WrappedComponent
          callRequest={this.callRequest}
          getCurrentMonth={this.getCurrentMonth}
          getCurrentYear={this.getCurrentYear}
          getCurrentMonthYear={this.getCurrentMonthYear}
          getCurrentDate={this.getCurrentDate}
          getNextDays={this.getNextDays}
          getGender={this.getGender}
          getGovId={this.getGovId}
          getCategory={this.getCategory}
          getPayment={this.getPayment}
          getPaymentMode={this.getPaymentMode}
          getCurrentFinancialYear={this.getCurrentFinancialYear}
          getFormatedDateTime={this.getFormatedDateTime}
          getFormatedDate={this.getFormatedDate}
          convertDate={this.convertDate}
          compareDate={this.compareDate}
          convertDateStringToYMD={this.convertDateStringToYMD}
          getDateObj={this.getDateObj}
          getExcerpt={this.getExcerpt}
          ucFirst={this.ucFirst}
          getLowerCase={this.getLowerCase}
          getCurrencyFormat={this.getCurrencyFormat}
          displayDashboardCurrency={this.displayDashboardCurrency}
          changeUrlToTitle={this.changeUrlToTitle}
          getWeekdayNames={this.getWeekdayNames}
          getDuration={this.getDuration}
          getMonth={this.getMonth}
          generateHours={this.generateHours}
          validateEmail={this.validateEmail}
          checkAlphaOnly={this.checkAlphaOnly}
          checkNumericOnly={this.checkNumericOnly}
          handleKeyPress={this.handleKeyPress}
          isValidDate={this.isValidDate}
          getFinancialYear={this.getFinancialYear}
          compareAndEqualDate={this.compareAndEqualDate}
          getTimeFromDateString={this.getTimeFromDateString}
          {...this.props}
        />
      );
    }
  }

  return common;
};

export default Common;
