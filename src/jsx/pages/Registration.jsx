import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// image
import logo from '../../assets/images/logo-text.png';
import { toast } from "react-toastify";
//import { API_ADMIN_REGISTER } from "../../config/Api";

function Register(props) {

	const initialValues = {
		name: "",
		email: "",
		phone: "",
		password: "",
	};

	const [formValues, setFormValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const validateForm = () => {
		const { name, email, phone, password } = formValues;
		const errors = {};
		let isValid = true;

		if (!name) {
			isValid = false;
			errors.name = "Name is Required";
		}
		if (!email) {
			isValid = false;
			errors.email = "Email is Required";
		}
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate registration form inputs
		if (!validateForm()) {
			// toast.error("Please fill in all required fields correctly!", {
			// 	position: toast.POSITION.TOP_RIGHT,
			// 	autoClose: 5000,
			// });
			return;
		}

		// Prepare payload
		const payload = {
			name: formValues.name,
			email: formValues.email,
			phone: formValues.phone,
			password: formValues.password,
		};

		try {
			const response = await axios.post("http://127.0.0.1:3000/api/admin-register", payload);

			// Handle success response
			const { data } = response;
			// Swal.fire({
			// 	title: "Registration Successful!",
			// 	text: `${data.message}`,
			// 	icon: "success",
			// });

			// Reset the form if needed
			setFormValues(initialValues);

		} catch (err) {
			// Handle error response
			if (err.response && err.response.data) {
				// Server-side error
				// toast.error(`${err.response.data.message}`, {
				// 	position: toast.POSITION.TOP_RIGHT,
				// 	autoClose: 5000,
				// });
			} else if (err.message === "Network Error") {
				// Network error
				// toast.error("Network error! Please check your connection.", {
				// 	position: toast.POSITION.TOP_RIGHT,
				// 	autoClose: 5000,
				// });
			} else {
				// Generic error
				// toast.error("An unexpected error occurred. Please try again.", {
				// 	position: toast.POSITION.TOP_RIGHT,
				// 	autoClose: 5000,
				// });
			}
		}
	};


	return (
		<>
			<div className="authincation h-100">
				<div className="container h-100">
					<div className="row justify-content-center h-100 align-items-center">
						<div className="col-md-6">
							<div className="authincation-content">
								<div className="row no-gutters">
									<div className="col-xl-12">
										<div className="auth-form bg-primary">
											<div className="text-center mb-3">
												<Link to="#"><img src={logo} alt="" className="" /></Link>
											</div>
											<h4 className="text-center text-white mb-4">Sign up your account</h4>
											<form onSubmit={handleSubmit}>
												<div className="mb-3">
													<label className="form-label"><strong className="text-white">Name</strong> </label><span className='required'> *</span>
													<input
														type="text"
														className="form-control"
														placeholder="name"
														name="name"
														value={formValues.name}
														onChange={(e) => handleChange(e)}
													/>
													<div className="text-danger fs-12">
														{!formValues.name && errors.name}
													</div>
												</div>
												<div className="mb-3">
													<label className="form-label"><strong className="text-white">Email</strong></label>	<span className='required'> *</span>
													<input
														type="text"
														className="form-control"
														placeholder="hello@example.com"
														name="email"
														value={formValues.email}
														onChange={(e) => handleChange(e)}
													/>
													<div className="text-danger fs-12">
														{!formValues.email && errors.email}
													</div>
												</div>
												<div className="mb-3">
													<label className="form-label"><strong className="text-white">Phone</strong></label>	<span className='required'> *</span>
													<input
														type="text"
														className="form-control"
														placeholder="123 456 7890"
														name="phone"
														value={formValues.phone}
														onChange={(e) => handleChange(e)}
														maxLength={15}
													/>
													<div className="text-danger fs-12">
														{!formValues.phone && errors.phone}
													</div>
												</div>
												<div className="mb-3">
													<label className="form-label"><strong className="text-white">Password</strong></label><span className='required'> *</span>
													<input
														type="text"
														className="form-control"
														placeholder="passowrd"
														name="password"
														value={formValues.password}
														onChange={(e) => handleChange(e)}
													/>
													<div className="text-danger fs-12">
														{!formValues.password && errors.password}
													</div>
												</div>
												<div className="text-center mt-4">
													<button type="submit" className="btn btn-secondary btn-block">Sign me up</button>
												</div>
											</form>

											<div className="new-account mt-3">
												<p className="text-white">Already have an account? <Link to={"/"} className="text-secondary" >Sign in</Link></p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// const mapStateToProps = (state) => {
// 	return {
// 		errorMessage: state.auth.errorMessage,
// 		successMessage: state.auth.successMessage,
// 		showLoading: state.auth.showLoading,
// 	};
// };

// export default connect(mapStateToProps)(Register);

export default Register;
