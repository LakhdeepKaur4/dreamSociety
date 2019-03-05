import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import $ from 'jquery';
import './common.css';
import ReactDOM from 'react-dom';

class Demo extends Component {
    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollIntoView();
        $(document).ready(function () {

            $('#sidebarCollapse').on('click', function () {
                if ($('#sidebar').hasClass('active')) {
                    $('#sidebar').removeClass('active').addClass('inactive');
                    $('#sidebarMaster').removeClass('active').addClass('inactive');
                    $('#sidebarDetails').removeClass('active').addClass('inactive');
                } else {
                    $('#sidebar').removeClass('inactive').addClass('active');
                }
            });

            $('#sidebarMasterCollapse').on('click', function () {
                if ($('#sidebarMaster').hasClass('active')) {
                    $('#sidebarMaster').removeClass('active').addClass('inactive');
                } else {
                    $('#sidebarMaster').removeClass('inactive').addClass('active');
                    $('#sidebarDetails').removeClass('active').addClass('inactive');
                }
            });

            $('#sidebarDetailsCollapse').on('click', function () {
                if ($('#sidebarDetails').hasClass('active')) {
                    $('#sidebarDetails').removeClass('active').addClass('inactive');
                } else {
                    $('#sidebarDetails').removeClass('inactive').addClass('active');
                    $('#sidebarMaster').removeClass('active').addClass('inactive');
                }
            });

            $('#body').on('click', function () {
                if ($('#sidebar').hasClass('active')) {
                    $('#sidebar').removeClass('active').addClass('inactive');
                }
                if ($('#sidebarMaster').hasClass('active')) {
                    $('#sidebarMaster').removeClass('active').addClass('inactive');
                }
                if ($('#sidebarDetails').hasClass('active')) {
                    $('#sidebarDetails').removeClass('active').addClass('inactive');
                }
            });

            $('#masterdrop').on('click', function () {
                $('.master').toggleClass('show hide');

            });

            $('#detailsdrop').on('click', function () {
                $('.details').toggleClass('show hide');

            });


        });
    }

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark" style={{ zIndex: "1001" }}>

                    <div id="content">

                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" className="btn btn-info bg-dark">

                                <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />


                            </button>

                        </div>
                    </div>
                    <Link className="navbar-brand" to="/superDashboard"><i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa mr-1">&#xf1ad;</i>DRE@M SOCIETY</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample04">
                        <ul className="navbar-nav mr-auto mx-auto">
                            <li  className="nav-item mx-3 active">
                                <Link className="nav-link" to="/superDashboard">Home<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" to="#">Gallery</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" to="#">About Us</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" to="#">Contact Us</Link>
                            </li>
                        </ul>
                        {/* <div style={{ position: 'relative', zIndex: "10000", color: 'white', paddingRight: '10px' }}> {localStorage.getItem('firstName')}</div>
                        <div className="form-inline mt-2 mt-md-0">
                            <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                onClick={this.props.onClick} >Logout</button>
                        </div> */}
                        <div className="dropdown mx-2">
                            <button className="btn btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {localStorage.getItem('firstName')}
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg-right bg-dark" aria-labelledby="dropdownMenuButton">
                                <div className="form-inline ml-lg-3 ml-md-2 ml-sm-2 mt-2 mt-md-0">
                                    <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                        onClick={this.props.onClick} >Logout</button>
                                </div> 
                            </div>
                        </div>

                    </div>
                </nav>
                <div className="wrapper">
                    <nav id="sidebar" className="bg-dark inactive">
                        <div id="sidebar-content">

                            {/* <Menu.Item id="masterdrop" className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="caret square down" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}>Masters</div></Menu.Item> */}
                            <Menu.Item id="sidebarMasterCollapse" className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="caret square down" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}>Masters</div></Menu.Item>


                            {/* <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/designationMasterDetail">Designation Master</Link></div></Menu.Item> */}

                            {/* <div></div>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/countrymaster/countrymasterdetails"> Country Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/statemaster/statemasterdetails"> State Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/cityMasterDetail">City Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/displayLocation"> Location Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/relationshipMasterDetail">Relationship Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/display-size">Size Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/maintenanceMasterDetail">Maintenance Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/MaintenanceSubMasterDetails">Maintainence Sub Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/displayEmployee">Employee Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/displayEmployeeType">Employee Type Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/parking_master">Parking Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/display-tower">Tower Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/display-event">Event Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/flatmaster/flatmasterdetails">Flat Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/flatDetails"> Flat Detail Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/assetsMaster"> Assets Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/assetsTypeSubMaster"> Assets Sub Type Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/statemaster/statemasterdetails"> State Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/cityMasterDetail">City Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/displayLocation"> Location Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/relationshipMasterDetail">Relationship Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/display-size">Size Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/maintenanceMasterDetail">Maintenance Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/MaintenanceSubMasterDetails">Maintainence Sub Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/vendorDashboard">Vendor</Link></div></Menu.Item> */}
                            <Menu.Item id="sidebarDetailsCollapse" className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="caret square down" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}>Details</div></Menu.Item>
                            {/* <Menu.Item className="details hide text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/user_details">Super Admin Registration Details</Link></div></Menu.Item>
                            <Menu.Item className="details hide text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/boardMemberDetails">Board Member Details</Link></div></Menu.Item>
                            <Menu.Item className="details hide text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/displayPerson"> Person details</Link></div></Menu.Item>
                            
                            <Menu.Item className="details hide text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/inventoryDetails"> Inventory Details</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/societyManagementDetail">Society Management</Link></div></Menu.Item>
                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/flatOwnerDetail"> Flat Owner Details</Link></div></Menu.Item> */}

                            <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}>Society Member Owner Register</div></Menu.Item>

                            <div style={{ height: '10%' }}></div>
                        </div>
                    </nav>
                    <nav id="sidebarMaster" className="bg-light  inactive">
                        <div id="sidebarMaster-content">
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/designationMasterDetail">Designation Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/countrymaster/countrymasterdetails"> Country Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/statemaster/statemasterdetails"> State Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/cityMasterDetail">City Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/displayLocation"> Location Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/relationshipMasterDetail">Relationship Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/display-size">Size Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/maintenanceMasterDetail">Maintenance Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/MaintenanceSubMasterDetails">Maintainence Sub Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/displayEmployee">Employee Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/displayEmployeeType">Employee Type Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/parking_master">Parking Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/display-tower">Tower Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/display-event">Event Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/flatmaster/flatmasterdetails">Flat Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/flatDetails"> Flat Detail Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/assetsMaster"> Assets Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/assetsTypeSubMaster"> Assets Sub Type Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/statemaster/statemasterdetails"> State Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/cityMasterDetail">City Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/displayLocation"> Location Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/relationshipMasterDetail">Relationship Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/display-size">Size Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/maintenanceMasterDetail">Maintenance Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/MaintenanceSubMasterDetails">Maintainence Sub Master</Link></div></Menu.Item>
                            <Menu.Item className="master text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/vendorDashboard">Vendor</Link></div></Menu.Item>


                            <div style={{ height: '10%' }}></div>
                        </div>
                    </nav>
                    <nav id="sidebarDetails" className="bg-light inactive">
                        <div id="sidebarDetails-content">

                            <Menu.Item className="details text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/user_details">Super Admin Registration Details</Link></div></Menu.Item>
                            <Menu.Item className="details text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/boardMemberDetails">Board Member Details</Link></div></Menu.Item>
                            <Menu.Item className="details text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/displayPerson"> Person details</Link></div></Menu.Item>

                            <Menu.Item className="details text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2 pb-3 border border-white border-left-0 border-right-0 border-top-0' style={{ fontSize: "0.8rem" }}><Link to="/superDashBoard/inventoryDetails"> Inventory Details</Link></div></Menu.Item>

                        </div>
                    </nav>
                    <div id="body" className="container">
                        <div className="mt-4 mb-4">
                            {this.props.children}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Demo;