import React, { useState, useContext, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import LogoutPage from './Logout';
import { IMAGES } from "../../constant/theme";
import { ThemeContext } from "../../../context/ThemeContext";

import profile from './../../../assets/images/profile/17.jpg';

const NotificationBlog = ({ classChange }) => {
	return (
		<>
			<li>
				<div className="timeline-panel">
					<div className="media me-2">
						<img alt="images" width={50} src={IMAGES.Avatar} />
					</div>
					<div className="media-body">
						<h6 className="mb-1">Dr sultads Send you Photo</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
			<li>
				<div className="timeline-panel">
					<div className={`media me-2 ${classChange}`}>KG</div>
					<div className="media-body">
						<h6 className="mb-1">Resport created successfully</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
			<li>
				<div className="timeline-panel">
					<div className={`media me-2 ${classChange}`}><i className="fa fa-home" /></div>
					<div className="media-body">
						<h6 className="mb-1">Reminder : Treatment Time!</h6>
						<small className="d-block">29 July 2022 - 02:26 PM</small>
					</div>
				</div>
			</li>
		</>
	);
};

const Header = ({ onNote }) => {
	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []);

	const { background, changeBackground } = useContext(ThemeContext);
	const handleThemeMode = () => {
		if (background.value === 'dark') {
			changeBackground({ value: "light", label: "Light" });
		} else {
			changeBackground({ value: "dark", label: "Dark" });
		}
	};

	return (
		<div className={`header ${headerFix ? "is-fixed" : ""}`}>
			<div className="header-content">
				<nav className="navbar navbar-expand">
					<div className="collapse navbar-collapse justify-content-between">
						<ul className="header-right navbar-nav ms-auto">
							<Dropdown as="li" className="nav-item dropdown notification_dropdown">
								<Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a">
									<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M22.75 15.8385V13.0463C22.7471 10.8855 21.9385 8.80353 20.4821 7.20735C19.0258 5.61116 17.0264 4.61555 14.875 4.41516V2.625C14.875 2.39294 14.7828 2.17038 14.6187 2.00628C14.4546 1.84219 14.2321 1.75 14 1.75C13.7679 1.75 13.5454 1.84219 13.3813 2.00628C13.2172 2.17038 13.125 2.39294 13.125 2.625V4.41534C10.9736 4.61572 8.97429 5.61131 7.51794 7.20746C6.06159 8.80361 5.25291 10.8855 5.25 13.0463V15.8383C4.26257 16.0412 3.37529 16.5784 2.73774 17.3593C2.10019 18.1401 1.75134 19.1169 1.75 20.125C1.75076 20.821 2.02757 21.4882 2.51969 21.9803C3.01181 22.4724 3.67904 22.7492 4.375 22.75H9.71346C9.91521 23.738 10.452 24.6259 11.2331 25.2636C12.0142 25.9013 12.9916 26.2497 14 26.2497C15.0084 26.2497 15.9858 25.9013 16.7669 25.2636C17.548 24.6259 18.0848 23.738 18.2865 22.75H23.625C24.321 22.7492 24.9882 22.4724 25.4803 21.9803C25.9724 21.4882 26.2492 20.821 26.25 20.125C26.2486 19.117 25.8998 18.1402 25.2622 17.3594C24.6247 16.5786 23.7374 16.0414 22.75 15.8385ZM7 13.0463C7.00232 11.2113 7.73226 9.45223 9.02974 8.15474C10.3272 6.85726 12.0863 6.12732 13.9212 6.125H14.0788C15.9137 6.12732 17.6728 6.85726 18.9703 8.15474C20.2677 9.45223 20.9977 11.2113 21 13.0463V15.75H7V13.0463ZM14 24.5C13.4589 24.4983 12.9316 24.3292 12.4905 24.0159C12.0493 23.7026 11.716 23.2604 11.5363 22.75H16.4637C16.284 23.2604 15.9507 23.7026 15.5095 24.0159C15.0684 24.3292 14.5411 24.4983 14 24.5ZM23.625 21H4.375C4.14298 20.9999 3.9205 20.9076 3.75644 20.7436C3.59237 20.5795 3.50014 20.357 3.5 20.125C3.50076 19.429 3.77757 18.7618 4.26969 18.2697C4.76181 17.7776 5.42904 17.5008 6.125 17.5H21.875C22.571 17.5008 23.2382 17.7776 23.7303 18.2697C24.2224 18.7618 24.4992 19.429 24.5 20.125C24.4999 20.357 24.4076 20.5795 24.2436 20.7436C24.0795 20.9076 23.857 20.9999 23.625 21Z" fill="#007A64" />
									</svg>
									<span className="badge light text-white bg-primary">3</span>
								</Dropdown.Toggle>
								<Dropdown.Menu align="end" className="mt-2 dropdown-menu dropdown-menu-end">
									<div className="widget-media dz-scroll p-3 height380">
										<ul className="timeline">
											<NotificationBlog classChange='media-info' />
											<NotificationBlog classChange='media-success' />
											<NotificationBlog classChange='media-danger' />
											<NotificationBlog classChange='media-info' />
										</ul>
										<div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
											<div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} />
										</div>
										<div className="ps__rail-y" style={{ top: 0, right: 0 }}>
											<div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 0 }} />
										</div>
									</div>
									<Link className="all-notification" to="#">
										See all notifications <i className="ti-arrow-right" />
									</Link>
								</Dropdown.Menu>
							</Dropdown>
							<Dropdown as="li" className="nav-item header-profile">
								<Dropdown.Toggle className="nav-link i-false p-0" as="div">
									<img src={profile} alt="" width="20" />
								</Dropdown.Toggle>
								<Dropdown.Menu align="end">
									<Link to={"/app-profile"} className="dropdown-item ai-icon ">
										<svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
										</svg>
										<span className="ms-2">Profile </span>
									</Link>
									<LogoutPage />
								</Dropdown.Menu>
							</Dropdown>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Header;
