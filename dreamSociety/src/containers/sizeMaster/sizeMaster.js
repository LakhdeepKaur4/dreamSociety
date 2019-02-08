import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AddSize } from '../../actionCreators/sizeMasterAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import UI from '../../components/newUI/superAdminDashboard';

import { Link } from 'react-router-dom';
import './sizeMaster.css';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

class SizeMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeType: "",
            menuVisible: false
        }

        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
 onkeyPresshandle(event){
    const pattern = /^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
 }

    submit(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.AddSize(this.state)
        return this.setState({
            state: {

                sizeType: ""
            }
        }),
            this.props.history.push('/superDashboard/display-size');

    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    render() {
        return (
            <div>
                {/* <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
            <div style={{ margin: '48px auto' }}>
                <SideBar onClick={() => this.setState({ menuVisible: false })}
                 visible={this.state.menuVisible}> */}
                <UI onClick={this.logout}>
                    <div style={{ margin: '48px auto' }}>

                        <div className="form">
                            <Form onSubmit={this.submit}>
                                <FormGroup>
                                    <Label> Size Type</Label>
                                    <Input type="text" className="form-control" placeholder="sizeType" value={this.state.size_type} name="sizeType" onChange={this.onChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" color="success">Submit</Button>
                                    <Link color="primary" to="/superDashboard/display-size">Size details</Link>
                                </FormGroup>
                            </Form>
                        </div>

                    </div>
                </UI>
                {/* </SideBar>
</div> */}


            </div>

        )

    }

}

function mapStateToProps(state) {
    console.log('shub', state);
    return {
        size: state.SizeDetails
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddSize }, dispatch);

}


export default connect(mapStateToProps, mapDispatchToProps)(SizeMaster)