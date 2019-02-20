import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AddSize } from '../../actionCreators/sizeMasterAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';


import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

class SizeMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeType: "",
            menuVisible: false,
            loading:true
        }

        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount(){
        this.refreshData()
    }

    refreshData =()=>{
            this.setState({loading:false})
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
 onkeyPresshandle(event){
    const pattern = /[a-zA-Z _]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
 }

    submit(e) {
this.setState({loading:true})
        console.log(this.state);
        this.props.AddSize(this.state).then(()=> this.props.history.push('/superDashboard/display-size')

    )
        return this.setState({
            state: {

                sizeType: ""
            }
        })
           
    }
    size=()=>{
        this.props.history.push('/superDashboard/display-size')
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
       
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }


    
    render() {
        let form;
        if(!this.state.loading){
        form=
        <div>
        <Form onSubmit={this.submit}>
        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>

        <h3 align="center">  Add Size </h3>
            <FormGroup>
                <Label> Size Type</Label>
                <Input type="text" className="form-control" placeholder="sizeType" value={this.state.size_type} name="sizeType" onChange={this.onChange}  onKeyPress={this.onkeyPresshandle} maxLength ={20} required/>
            </FormGroup>
            <FormGroup>
                <Button type="submit" color="success">Submit</Button>
                <button className=" btn btn-danger" onClick ={this.size}>Cancel</button>
            </FormGroup>
        </Form>
    </div>  
        }
        else if(this.submit){
            form=<Spinner/>
        }
        return (
                     
            
            <div>
                <UI onClick={this.logout}>
                        
       {form}
           
                </UI>
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