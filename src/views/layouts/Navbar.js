import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar top-navbar navbar-expand-md navbar-light">
            <div className="navbar-header" data-logobg="skin5">
                <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
                    <i className="ti-menu ti-close"></i>
                </a>
            </div>
            <div className="navbar-brand">
                <a href="index.html" className="logo">
                    <b className="logo-icon">
                        <img src="../../assets/images/logo-icon.png" alt="homepage" className="dark-logo" />
                        <img src="../../assets/images/logo-light-icon.png" alt="homepage" className="light-logo" />
                    </b>
                    <span className="logo-text">
                        <img src="../../assets/images/logo-text.png" alt="homepage" className="dark-logo" />
                        <img src="../../assets/images/logo-light-text.png" className="light-logo" alt="homepage" />
                    </span>
                </a>
                <a className="sidebartoggler d-none d-md-block" href="javascript:void(0)" data-sidebartype="mini-sidebar">
                    <i className="mdi mdi-toggle-switch mdi-toggle-switch-off font-20"></i>
                </a>
            </div>
            <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="ti-more"></i>
            </a>
            <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin6">
                <ul className="navbar-nav float-left mr-auto">
                    <li className="nav-item search-box">
                        <a className="nav-link waves-effect waves-dark" href="javascript:void(0)">
                            <div className="d-flex align-items-center">
                                <i className="mdi mdi-magnify font-20 mr-1"></i>
                                <div className="ml-1 d-none d-sm-block">
                                    <span>Search</span>
                                </div>
                            </div>
                        </a>
                        <form className="app-search position-absolute">
                            <input type="text" className="form-control" placeholder="Search &amp; enter" />
                            <a className="srh-btn">
                                <i className="ti-close"></i>
                            </a>
                        </form>
                    </li>
                </ul>
                <ul className="navbar-nav float-right">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle waves-effect waves-dark" href="" id="2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="font-22 mdi mdi-email-outline"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown" aria-labelledby="2">
                            <span className="with-arrow">
                                <span className="bg-danger"></span>
                            </span>
                            <ul className="list-style-none">
                                <li>
                                    <div className="drop-title text-white bg-danger">
                                        <h4 className="m-b-0 m-t-5">5 New</h4>
                                        <span className="font-light">Messages</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="message-center message-body ps-container ps-theme-default">
                                        <a href="javascript:void(0)" className="message-item">
                                            <span className="user-img">
                                                <img src="../../assets/images/users/1.jpg" alt="user" className="rounded-circle" />
                                                <span className="profile-status online pull-right"></span>
                                            </span>
                                            <div className="mail-contnet">
                                                <h5 className="message-title">Pavan kumar</h5>
                                                <span className="mail-desc">Just see the my admin!</span>
                                                <span className="time">9:30 AM</span>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="message-item">
                                            <span className="user-img">
                                                <img src="../../assets/images/users/2.jpg" alt="user" className="rounded-circle" />
                                                <span className="profile-status busy pull-right"></span>
                                            </span>
                                            <div className="mail-contnet">
                                                <h5 className="message-title">Sonu Nigam</h5>
                                                <span className="mail-desc">I've sung a song! See you at</span>
                                                <span className="time">9:10 AM</span>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="message-item">
                                            <span className="user-img">
                                                <img src="../../assets/images/users/3.jpg" alt="user" className="rounded-circle" />
                                                <span className="profile-status away pull-right"></span>
                                            </span>
                                            <div className="mail-contnet">
                                                <h5 className="message-title">Arijit Sinh</h5>
                                                <span className="mail-desc">I am a singer!</span>
                                                <span className="time">9:08 AM</span>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="message-item">
                                            <span className="user-img">
                                                <img src="../../assets/images/users/4.jpg" alt="user" className="rounded-circle" />
                                                <span className="profile-status offline pull-right"></span>
                                            </span>
                                            <div className="mail-contnet">
                                                <h5 className="message-title">Pavan kumar</h5>
                                                <span className="mail-desc">Just see the my admin!</span>
                                                <span className="time">9:02 AM</span>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <a className="nav-link text-center link text-dark" href="javascript:void(0);">
                                        <b>See all e-Mails</b>
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item dropdown border-right">
                        <a className="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="mdi mdi-bell-outline font-22"></i>
                            <span className="badge badge-pill badge-info noti">3</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
                            <span className="with-arrow">
                                <span className="bg-primary"></span>
                            </span>
                            <ul className="list-style-none">
                                <li>
                                    <div className="drop-title bg-primary text-white">
                                        <h4 className="m-b-0 m-t-5">4 New</h4>
                                        <span className="font-light">Notifications</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="message-center notifications ps-container ps-theme-default">
                                        <a href="javascript:void(0)" className="message-item">
                                            <span className="btn btn-danger btn-circle">
                                                <i className="fa fa-link"></i>
                                            </span>
                                            <div className="mail-contnet">
                                                <h5 className="message-title">Launch Admin</h5>
                                                <span className="mail-desc">Just see the my new admin!</span>
                                                <span className="time">9:30 AM</span>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="message-item">
                                            <span className="btn btn-success btn-circle">
                                                <i className="ti-calendar"></i>
                                            </span>
                                            <div className="mail-contnet">
                                                <h5 className="message-title">Event today</h5>
                                                <span className="mail-desc">Just a reminder that you have event</span>
                                                <span className="time">9:10 AM</span>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="message-item">
                                            <span className="btn btn-info btn-circle">
                                                <i className="ti-settings"></i>
                                            </span>
                                            <div className="mail-contnet">
                                                <h5 className="message-title">Settings</h5>
                                                <span className="mail-desc">You can customize this template as you want</span>
                                                <span className="time">9:08 AM</span>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="message-item">
                                            <span className="btn btn-primary btn-circle">
                                                <i className="ti-user"></i>
                                            </span>
                                            <div className="mail-contnet">
                                                <h5 className="message-title">Pavan kumar</h5>
                                                <span className="mail-desc">Just see the my admin!</span>
                                                <span className="time">9:02 AM</span>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <a className="nav-link text-center m-b-5 text-dark" href="javascript:void(0);">
                                        <strong>Check all notifications</strong>
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle waves-effect waves-dark pro-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="../../assets/images/users/2.jpg" alt="user" className="rounded-circle" width="40" />
                            <span className="m-l-5 font-medium d-none d-sm-inline-block">Jonathan Doe <i className="mdi mdi-chevron-down"></i></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                            <span className="with-arrow">
                                <span className="bg-primary"></span>
                            </span>
                            <div className="d-flex no-block align-items-center p-15 bg-primary text-white m-b-10">
                                <div>
                                    <img src="../../assets/images/users/2.jpg" alt="user" className="rounded-circle" width="60" />
                                </div>
                                <div className="m-l-10">
                                    <h4 className="m-b-0">Jonathan Doe</h4>
                                    <p className="m-b-0">jon@gmail.com</p>
                                </div>
                            </div>
                            <div className="profile-dis scrollable ps-container ps-theme-default">
                                <a className="dropdown-item" href="javascript:void(0)">
                                    <i className="ti-user m-r-5 m-l-5"></i> My Profile
                                </a>
                                <a className="dropdown-item" href="javascript:void(0)">
                                    <i className="ti-wallet m-r-5 m-l-5"></i> My Balance
                                </a>
                                <a className="dropdown-item" href="javascript:void(0)">
                                    <i className="ti-email m-r-5 m-l-5"></i> Inbox
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="javascript:void(0)">
                                    <i className="ti-settings m-r-5 m-l-5"></i> Account Setting
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="javascript:void(0)">
                                    <i className="fa fa-power-off m-r-5 m-l-5"></i> Logout
                                </a>
                            </div>
                            <div className="p-l-30 p-10">
                                <a href="javascript:void(0)" className="btn btn-sm btn-success btn-rounded">View Profile</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;
