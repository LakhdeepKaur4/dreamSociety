import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { getEmployee,getEmployeeType,getEmployeeWorkType,updateEmployee,deleteEmployee} from '../../actionCreators/employeeTypeMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
class DisplayEmployeeTypeMaster extends Component {
    // constructor(props){
    //     super(props)
    // }

    state = {
        editEmployeeData: {
            serviceType: '',
            employeeTypeId: '',
            employeeType: '',
            employeeWorkTypeId: '',
            employeeWorkType: '',


            isActive: false
        },
        editEmployeeModal: false,
        loading:true
    }
    componentDidMount() {
     
        this.refreshData()
       
    }
  

    refreshData(){
        this.props.getEmployee().then(() => this.setState({loading:false}));
        this.props.getEmployeeType().then(() => this.setState({loading:false}));
        this.props.getEmployeeWorkType().then(() => this.setState({loading:false}));
        console.log("123", this.props.getEmployee())
    }
    toggleEditEmployeeModal() {
        this.setState({
            editEmployeeModal: !this.state.editEmployeeModal
        })
    }

    editEmployee( employeeDetailId,employeeTypeId, employeeWorkTypeId, serviceType) {
        console.log('i m in edit ', employeeTypeId, employeeWorkTypeId, serviceType);
        this.setState({
            editEmployeeData: { employeeDetailId,employeeTypeId, employeeWorkTypeId, serviceType },
            editEmployeeModal: !this.state.editEmployeeModal
        })
    }

    updateEmployee = (  ) => {
      
        let {employeeDetailId,employeeTypeId, employeeWorkTypeId, serviceType}=this.state.editEmployeeData;
                            this.props.updateEmployee( employeeDetailId,employeeTypeId, employeeWorkTypeId, serviceType ).then(()=>{this.refreshData()})
                              
                   
                                       
                            
                       this.setState({
                               editEmployeeModal: false,  loading:true, editEmployeeData: { employeeTypeId:'', employeeWorkTypeId:'', serviceType:'' }
                       })
               }



               deleteEmployee(employeedetailId){
                this.setState({loading:true})

                   let {isActive}=this.state.editEmployeeData;

                   this.props.deleteEmployee(employeedetailId,isActive).then(()=> this.refreshData()) 
                   this.setState({editEmployeeData:{isActive:false}}) 
               }

addEmployee =()=>{
    this.props.history.push('/superDashboard/employeeType')
}


    getEmpType({employeeType}){
        console.log(employeeType,"emptype");
        if(employeeType){
            return(
                employeeType.employeeType.map((item)=>{
                    return(
                        <option key={item.employeeTypeId} value ={item.employeeTypeId} > 
                        {item.employeeType}
                        </option>
                    )
                })
            )
        }
    }
    
    getEmpWorkType({employeeWorkType}){
    console.log(employeeWorkType,"emp")
    if(employeeWorkType){
        return(
            employeeWorkType.employeeWorkType.map((item)=>{
                return(
                    <option key={item.employeeWorkTypeId} value ={item.employeeWorkTypeId}>
                    {item.employeeWorkType}
                    </option>
                )
            })
        )
    }
}











    getEmployee({ getEmployee }) {
        console.log(getEmployee)
        if (getEmployee) {
            return (
                getEmployee.employeeDetail.map((item,index) => {
                    return (
                        <tr key={item.employeeDetailId}>
                            <td>{index+1}</td>
                            <td>{item.serviceType} </td>
                            <td>{item.employee_work_type_master.employeeWorkType}</td>
                            <td>{item.employee_type_master.employeeType}</td>
                            <td>
                                <button className="btn btn-success" onClick={this.editEmployee.bind(this,item.employeeDetailId, item.employeeTypeId, item.employeeWorkTypeId, item.serviceType)}  >Edit</button>
                                <button className="btn btn-danger" onClick ={this.deleteEmployee.bind(this,item.employeeDetailId)}>Delete</button>
                            </td>
                        </tr>

                    )
                }
                ))
        }
    }
    render() {
        let tableData;
        tableData =
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Service Type</th>
                        <th>Employee Work Type</th>
                        <th>Employee Type</th>
                        <th> Actions  </th>
                    </tr>
                </thead>
                <tbody>
                    {this.getEmployee(this.props.employeeDetails)}
                </tbody>
            </Table>
        return (



            <div>

                <UI onClick={this.logout}>

                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details" >
                            <h3 align="center"> Employee Details</h3>
                            <Button  color ="primary" onClick ={this.addEmployee} > Add Employee</Button>
                        </div>
                        <Modal isOpen={this.state.editEmployeeModal} toggle={this.toggleEditEmployeeModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditEmployeeModal.bind(this)}>Edit  Employee Details</ModalHeader>
                            <ModalBody>


                                <FormGroup>
                                    <Label for="eventType"> Service Type</Label>
                                    <Input id="serviceType" value={this.state.editEmployeeData.serviceType}
                                        onChange={(e) => {
                                            let { editEmployeeData } = this.state;

                                            editEmployeeData.serviceType = e.target.value;

                                            this.setState({ editEmployeeData });
                                        }}
                                        required
                                        maxLength={25}
                                        onKeyPress={this.OnKeyPresshandler}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventType"> Employee Work Type</Label>
                                    <select id="serviceType" value={this.state.editEmployeeData.employeeWorkTypeId}
                                        onChange={(e) => {
                                            let { editEmployeeData } = this.state;

                                            editEmployeeData.employeeWorkTypeId = e.target.value;

                                            this.setState({ editEmployeeData });
                                        }}
                                >
                                 {this.getEmpWorkType(this.props.employeeDetails)}
                                </select>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="eventType"> Employee Type</Label>
                                    <select id="serviceType" value={this.state.editEmployeeData.employeeTypeId}
                                        onChange={(e) => {
                                            let { editEmployeeData } = this.state;

                                            editEmployeeData.employeeTypeId = e.target.value;

                                            this.setState({ editEmployeeData });
                                        }}
                                        

                                    >
                                     {this.getEmpType(this.props.employeeDetails)}
                                    </select>
                                </FormGroup>

                                
                                                                <Button color="primary" className="mr-2" onClick={this.updateEmployee}>Save</Button>
                                                                <Button color="danger" onClick={this.toggleEditEmployeeModal.bind(this)}>Cancel</Button>
                                                  
                            </ModalBody>
                        </Modal>

                        {!this.state.loading? tableData:<Spinner/>}

                    </div>


                </UI>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        employeeDetails: state.employeeDetails
    }
}
function mapDispatchToProps(dispatch) {

    return bindActionCreators({ getEmployee,getEmployeeType,getEmployeeWorkType,updateEmployee,deleteEmployee }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEmployeeTypeMaster)