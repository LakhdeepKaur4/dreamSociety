import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './common.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Demo extends Component {
    // componentDidMount() {
    //     $(document).ready(function () {

    //         $('#sidebarCollapse').on('click', function () {
    //             // $("#sidebar").toggle().animate();
    //             // $('#sidebar').toggleClass('inactive active');
    //             if ($('#sidebar').hasClass('active')) {
    //                 $('#sidebar').removeClass('active').addClass('inactive');
    //             } else {
    //                 $('#sidebar').removeClass('inactive').addClass('active');
    //             }
    //         });

    //         $('#body').on('click', function () {
    //             if ($('#sidebar').hasClass('active')) {
    //                 $('#sidebar').removeClass('active').addClass('inactive');
    //             }

    //         });


    //     });
    // }

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">

                    {/* <div id="content">
                        <div className="container-fluid">
                            <button type="button" id="sidebarCollapse" className="btn btn-info bg-dark">
                                <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />
                            </button>
                        </div>
                    </div> */}
                    <Link className="navbar-brand" to="#"><i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa mr-1">&#xf1ad;</i>DRE@M SOCIETY</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        <ul className="navbar-nav mr-auto mx-auto">
                            <li className="nav-item mx-3 active">
                                <a className="nav-link" href="#home">Home<span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link" href="#gallery">Gallery</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link" href="#aboutUs">About Us</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link" href="#">Contact Us</a>
                            </li>
                        </ul>
                        <div className="form-inline mt-2 ml-3 mt-md-0">
                            <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                onClick={this.props.onClick}>Login</button>
                        </div>

                    </div>
                </nav>
                  <div className="wrapper" style={{backgroundImage: `url('assets/society.jpg')`}}>
                {/* <div className="wrapper" style={{'backgroundImage':`url('assets/society.jpg')`}}> */}
                
              

                    {/* <nav id="sidebar" className="bg-dark inactive">
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/registration">Super Admin Register</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}>Admin Register</div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}>Society Member Owner Register</div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}>Society Member Tenant Register</div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/vendorDashboard">Vendor</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/add_parking/new">Parking Master</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/towermaster">Tower Master</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/event">Event Master</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/flatmaster">Flat Master</Link></div></Menu.Item>
                        <Menu.Item className="text-center h1 mr-4 mt-4 mb-4"><Icon className='col' name="user" /><div className='col ml-2' style={{ fontSize: "0.8rem" }}><Link to="/superDashboard/sizemaster">Size Master</Link></div></Menu.Item>
                    </nav> */}
                    <div id="body" className="container">
                        <div className="mt-4 mb-4">
                            {this.props.children}
                        </div>

                        <div id="gallery">
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                        <div class="carousel-item sliderImages active">
                        <img class="d-block w-100" src="assets/picture1.jpg" alt="First slide"></img>
                        </div>
                        <div class="carousel-item sliderImages">
                        <img class="d-block w-100" src="assets/picture5.jpg" alt="Second slide"></img>
                        </div>
                        <div class="carousel-item sliderImages">
                        <img class="d-block w-100" src="assets/picture3.jpg"alt="Third slide"></img>
                        </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                        </div>
                        </div>
                      
                       
                        <div id="home">
                        <h2>HOME</h2>
                        <p>Cras facilisis urna ornare ex volutpat, et
                        convallis erat elementum. Ut aliquam, ipsum vitae
                        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                        metus nec massa. Maecenas hendrerit laoreet augue
                        nec molestie. Cum sociis natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus.</p>
                        <p>Cras facilisis urna ornare ex volutpat, et
                        convallis erat elementum. Ut aliquam, ipsum vitae
                        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                        metus nec massa. Maecenas hendrerit laoreet augue
                        nec molestie. Cum sociis natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus.</p>
                        <p>Cras facilisis urna ornare ex volutpat, et
                        convallis erat elementum. Ut aliquam, ipsum vitae
                        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                        metus nec massa. Maecenas hendrerit laoreet augue
                        nec molestie. Cum sociis natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus.</p>
                        
                
                        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
                        </div>
                        <div id="aboutUs">
                        <h2>ABOUT US</h2>
                        <p>Cras facilisis urna ornare ex volutpat, et
                        convallis erat elementum. Ut aliquam, ipsum vitae
                        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                        metus nec massa. Maecenas hendrerit laoreet augue
                        nec molestie. Cum sociis natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus.</p>
                        <p>Cras facilisis urna ornare ex volutpat, et
                        convallis erat elementum. Ut aliquam, ipsum vitae
                        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                        metus nec massa. Maecenas hendrerit laoreet augue
                        nec molestie. Cum sociis natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus.</p>
                        <p>Cras facilisis urna ornare ex volutpat, et
                        convallis erat elementum. Ut aliquam, ipsum vitae
                        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                        metus nec massa. Maecenas hendrerit laoreet augue
                        nec molestie. Cum sociis natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus.</p>
                        <p>Cras facilisis urna ornare ex volutpat, et
                        convallis erat elementum. Ut aliquam, ipsum vitae
                        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                        metus nec massa. Maecenas hendrerit laoreet augue
                        nec molestie. Cum sociis natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus.</p>
                
                        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}


export default Demo;