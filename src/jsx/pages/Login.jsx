import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from '../../assets/images/login.png';
import {
	API_ADMIN_AUTHENTICATE
}
	from '../../config/Api';
import { toast } from 'react-toastify';

function Login(props) {
	const navigate = useNavigate();
	const initialValues = {
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
		const { phone, password } = formValues;
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

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const payload = {
			phone: formValues.phone,
			password: formValues.password,
		};

		props
			.callRequest("POST", API_ADMIN_AUTHENTICATE, false, payload)
			.then(({ data: { data } }) => {

				if (!data) {
					throw new Error("Invalid API response structure");
				}

				localStorage.setItem("id", data.id);
				localStorage.setItem("name", data.name);
				localStorage.setItem("email", data.email);
				localStorage.setItem("phone", data.phone);
				localStorage.setItem("token", data.token);
				localStorage.setItem("tokenExpiredOn", data.token_expired_on);

				navigate("/dashboard");
			})
			.catch((err) => {
				if (err.message === "Network Error") {
					toast.error(`${err.message}`, {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 5000,
					});
				} else {
					const errorMessage = err?.response?.data?.message || "An unexpected error occurred";
					toast.error(errorMessage, {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 5000,
					});
				}
			});
	};

	return (
		<div className="page-wraper">
			<div className="authincation ">
				<div className="container ">
					<div className="row justify-content-center h-100 align-items-center">
						<div className="col-md-12 h-100 d-flex align-items-center">
							<div className="authincation-content style-1">
								<div className="row h-100">
									<div className="col-md-6 h-100">
										<div className="img-bx">
											<img src={login} alt="" className="img-fluid" />
										</div>
									</div>
									<div className="col-md-6">
										<div className="auth-form">
											<h4 className="main-title">Sign in </h4>
											<form onSubmit={handleSubmit}>
												<div className="form-group mb-3 pb-3">
													<label className="font-w600">Phone</label><span className='required'> *</span>
													<input
														type="text"
														className="form-control solid"
														placeholder='Type Your Register Phone Number'
														name='phone'
														value={formValues.phone}
														onChange={(e) => handleChange(e)}
														maxLength={15}
														onKeyDown={props.handleKeyPress}
													/>
													<div className="text-danger fs-12">
														{!formValues.phone && errors.phone}
													</div>
												</div>
												<div className="form-group mb-3 pb-3">
													<label className="font-w600">Password</label><span className='required'> *</span>
													<input
														type="password"
														placeholder="passowrd"
														className="form-control solid"
														name='password'
														value={formValues.password}
														onChange={(e) => handleChange(e)}
													/>
													<div className="text-danger fs-12">
														{!formValues.password && errors.password}
													</div>
												</div>
												<div className="text-center">
													<button type="submit" className="btn btn-primary btn-block rounded">Sign Me In</button>
												</div>
											</form>
											<div className="new-account mt-3">
												<p>Don't have an account? <Link to="/register" className="text-primary">Sign up</Link></p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;