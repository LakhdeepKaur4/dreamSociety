import React, { Component } from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
// import ScrollToTop from 'react-router-scroll-top';
// =====Components============//
import  {PrivateRoute}  from './components/privateRoute/privateRoute';
// ========Containers =========//
import Login from './containers/login/login';
import Parking from './containers/parking/parking';
// import QR from './containers/QR/QR Code';
import UserDetails from './containers/userDetails/userDetails';
import Demo from './containers/demo';
import Registration from './containers/userRegistration/userRegistration';
import AdminDashboard from './components/newUI/adminDashboard';
import OwnerDashboard from './containers/ownerDashboard/ownerDashboard';
import SuperDashboard from './containers/superDashboard/superDashboard';
import TenantDashboard from './containers/tenantDashboard/tenantDashboard';
import EmployeeDashboard from './components/newUI/employeeDashboard';
import VendorDashboard from './components/newUI/vendorDashboard';
import ParkingMaster from './containers/parkingMaster/parkingMaster';
import EmployeeMaster from './containers/employeeMaster/employeeMaster';
import DisplayEmployeeMaster from './containers/employeeMaster/displayEmployeeMaster';
import DisplayEmployeeMaster2 from './containers/employeeMaster/displayEmployeeMaster2';
import SocietyManagement from './containers/societyManagement/societyMangement';
import TowerMaster from './containers/towerMaster/towerMaster';
import DisplayTowerMaster from './containers/towerMaster/displayTowerMaster';
import SizeMaster from './containers/sizeMaster/sizeMaster';
import EventMaster from './containers/eventMaster/eventMaster';
import DisplayEventMaster from './containers/eventMaster/displayEventMaster';
import DisplaySizeMaster from './containers/sizeMaster/displaySizeMaster';
import FlatMaster from './containers/flatMaster/flatMaster';
import FlatMasterDetails from './containers/flatMaster/flatMasterDetails';
import countryMaster from './containers/countryMaster/countryMaster';
import countryMasterDetails from './containers/countryMaster/countryMasterDetails';
import stateMaster from './containers/stateMaster/stateMaster';
import stateMasterDetails from './containers/stateMaster/stateMasterDetails';

import PersonDetails from './containers/personDetails/personDetails';
import ServiceMaster from './containers/vendorMangement/serviceMaster/serviceMaster';
import DisplayServices from './containers/vendorMangement/serviceMaster/displayServiceMaster';
import vendorMaster from './containers/vendorMangement/vendorMaster/vendorMaster';
import DisplayVendorMaster from './containers/vendorMangement/vendorMaster/displayVendorMaster';
import DisplayVendorServices from './containers/vendorMangement/vendorMaster/displayVendorServices';

import displayPersonDetails from './containers/personDetails/displayPersonDetails';
import AssetTypeMaster from './containers/assetsTypeMaster/assetsTypeMaster';
import AssetList from './containers/assetsTypeMaster/assetsList';
import AssetsTypeSubMaster from './containers/assetsTypeSubMaster/assetsTypeSubMaster';
import AssetsTypeSubList from './containers/assetsTypeSubMaster/assetsTypeSubList'
import flatDetailMaster from './containers/flatDetailMaster/flatDetailMaster';
import flatDetails from './containers/flatDetailMaster/flatDetails';
import CityMaster from './containers/cityMaster/cityMaster';
import CityMasterDetail from './containers/cityMaster/cityMasterDetail';
import locationMaster from './containers/locationMaster/locationMaster';
import DisplayLocation from './containers/locationMaster/displayLocation';
import SocietyManagementDetail from './containers/societyManagement/societyManagementDetail';
import Inventory from './containers/inventory/inventory'
import InventoryDetails from './containers/inventory/inventoryDetails'
import MaintenanceMaster from './containers/maintenanceMaster/maintenanceMaster';
import MaintenanceMasterDetail from './containers/maintenanceMaster/maintenanceMasterDetail';
import DisplayEmployeeTypeMaster from './containers/employeeTypeMaster/displayEmployeeTypeMaster';
import MaintenanceSubMasterForm from './containers/maintenanceSubMaster/maintenanceSubMasterForm';
import MaintenanceSubMasterDetails from './containers/maintenanceSubMaster/maintenanceSubMasterDetails'
import DesignationMaster from './containers/designationMaster/designationMaster';
import EmployeeTypeMaster from './containers/employeeTypeMaster/employeeTypeMaster';
import DesignationMasterDetail from './containers/designationMaster/designationMasterDetail';
import SocietyComponent from './components/societyComponent/societyComponent';
import RelationshipMaster from './containers/relationshipMaster/relationshipMaster';
import RelationshipMasterDetail from './containers/relationshipMaster/relationshipMasterDetail';


import SocietyMemberEvents from './containers/societyMemberEvent/societyMemberEvents';
import MemberEventsDetail from './containers/societyMemberEvent/memberEventsDetail';
import MemberEventsBooking from './containers/societyMemberEventsBooking/memberEventsBooking';
import MemberEventsBookingDetail from './containers/societyMemberEventsBooking/memberEventsBookingDetail';

import EventSpaceMaster from './containers/eventSpaceMaster/eventSpaceMaster';
import EventSpaceMasterDetails from './containers/eventSpaceMaster/eventSpaceMasterDetails';
import FlatOwnerDetails from './containers/flatOwnerDetails/flatOwnerDetails';
import BoardMemberRegistrationForm from './containers/boardMemberRegistration/boardMemberRegistrationForm';
import BoardMemberDetails from './containers/boardMemberRegistration/boardMemberDetails';
import AddTenant from './containers/tenantMaster/addTenant';
import FlatOwnerList from './containers/flatOwnerDetails/flatOwnerList'
import FlatMemberList from './containers/flatOwnerDetails/flatMemberList';

import ChangePassword from './components/changePassword/changePassword';
import TenantDetail from './containers/tenantMaster/tenantDetail/tenantDetail';
import forgetPassword from './containers/login/forgetPassword';
import resetPassword from './containers/resetPassword/resetPassword';
import AccountVarification from './components/accountVarification/accountVarification'
import TenantMemberDetail from './containers/tenantMaster/tenantMemberDetail';
import TenantFlatsDetail from './containers/tenantMaster/tenantFlatsDetail';
import AddFloor from './containers/floorMaster/addFloor';
import GetFloorDetail from './containers/floorMaster/getFloorDetail';
import submitOTP from './containers/login/submitOtp';
import token from './containers/token';
import TokenVerification from './components/tokenVerification/tokenVerification';
import AccountVerificationTenant from './components/accountVerificationTenant/accountVerificationTenant';
import InventoryList from './containers/inventory/inventoryList'
import ShowList from './containers/activeDeactiveList/activeDeactiveList';
import ShowActiveListDetails from  './containers/activeDeactiveList/activeDeactiveListDetails';
import SWhowDeactiveListDetails from './containers/activeDeactiveList/deactivateActiveListDeatils';

import AssignRoles from './components/assignRoles/assignRoles';
import IndividualVendor from './containers/individualVendor/individualVendor';
import IndividualVendorDetail from './containers/individualVendor/individualVendorDetail';
import VendorServiceDetail from './containers/individualVendor/vendorServiceDetail';
// import AccountVerificationTenant from './components/accountVerificationTenant/accountVerificationTenant';
import SocietyEventBooking from './containers/societyEventBooking/societyEventBooking';
import DisplaySocietyEventBooking from './containers/societyEventBooking/displaySocietyEventBooking';

import ViewTenantDetail from './containers/tenantMaster/tenantDetail/viewTenantDetail';
import AssignRolesDetail from './components/assignRoles/assignRolesDetail';

import ChangePasswordTenant from './components/changePassword/changePasswordTenant';
import RegisterComplaintOwner from './containers/registerComplaintOwner/registerComplaintOwner';
import RegisterComplaint from './containers/registerComplaint.js/registerComplaint';
import MachineMaster from './containers/machineMaster/machineMaster';
import ViewMachinMaster from './containers/machineMaster/viewMachineMaster';
import ParkingSlotList from './containers/flatDetailMaster/slotList';
import ViewOwnerFlats from './containers/flatOwnerDetails/viewFlats';
import AddOwnerFlat from './containers/flatOwnerDetails/addFlats'
import TenantVerification from './components/tenantVerification/tenantVerification';
import CommonAreaMaster from './containers/commonAreaMaster/commonAreaMaster';
import DisplayCommonArea from './containers/commonAreaMaster/displayCommonAreaMaster';
import CommonAreaMachine from './containers/commonAreaMachineMaster/commonAreaMachineMaster';
import DisplayCommonAreaMachine from './containers/commonAreaMachineMaster/displayCommonAreaMachine';
     

import RFID from './containers/rfIdMaster/rfIdMaster';
import RfIdDetail from './containers/rfIdMaster/rfIdDetails';

import MachineIdMaster from './containers/machineIdMaster/machineIdMaster';
import DisplayMachineIdMaster from './containers/machineIdMaster/displayMachineIdMaster';

import ChangePasswordOwner from './components/changePassword/changePasswordOwner';
import ViewStatusOwner from './containers/viewStatus/viewStatusOwner';
import ComplaintOwnerDetails from './containers/registerComplaintOwner/complaintOwnerDetails';
import ComplaintTenantDetails from './containers/registerComplaint.js/complaintTenantDetails';

class App extends Component {
  render() {
    return (
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        
        <div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path='/login' exact component={Login} />
            <Route path='/forgetPassword' component= {forgetPassword}/>
            <Route path='/resetPassword' component= {resetPassword}/>
            <Route path='/login' exact component={Login} />
            <PrivateRoute path='/superDashboard' exact component={SuperDashboard} />
            <PrivateRoute path='/adminDashboard' component={AdminDashboard} />
            <PrivateRoute path='/ownerDashboard' exact component={OwnerDashboard} />
            <PrivateRoute path='/tenantDashboard' exact component={TenantDashboard} />
            <PrivateRoute path='/vendorDashboard' component={VendorDashboard} />
            <PrivateRoute path='/employeeDashboard' component={EmployeeDashboard} />
            <PrivateRoute path='/superDashboard/registration' component={Registration} />
            <PrivateRoute path='/superDashboard/user_details' component={UserDetails} />
            <PrivateRoute path='/superDashboard/parking_master' component={ParkingMaster} />
            <PrivateRoute path='/superDashboard/display-tower' component={DisplayTowerMaster} />
            <PrivateRoute path='/superDashboard/display-size' component={DisplaySizeMaster} />
            <PrivateRoute path='/superDashboard/towermaster' component={TowerMaster} />
            <PrivateRoute path='/superDashboard/sizemaster' component={SizeMaster} />
            <PrivateRoute path='/superDashboard/event' component={EventMaster} />
            <PrivateRoute path='/superDashboard/flatmaster' exact component={FlatMaster} />
            <PrivateRoute path='/superDashboard/flatmaster/flatmasterdetails' component={FlatMasterDetails} />
            <PrivateRoute path='/superDashboard/countryMaster' exact component={countryMaster} />
            <PrivateRoute path='/superDashboard/countryMaster/countryMasterDetails' exact component={countryMasterDetails} />
            <PrivateRoute path='/superDashboard/statemaster' exact component={stateMaster} />
            <PrivateRoute path='/superDashboard/statemaster/statemasterdetails' exact component={stateMasterDetails} />
            <PrivateRoute path='/superDashboard/societyManagement' component={SocietyManagement} />
            <PrivateRoute path ='/superDashboard/societyManagementDetail' component={SocietyManagementDetail}/>
            <PrivateRoute path='/superDashboard/display-event' component={DisplayEventMaster} />
            <PrivateRoute path='/superDashboard/add_parking/new' component={Parking} />
            <PrivateRoute path='/superDashboard/ServiceMaster' component={ServiceMaster} />
            <PrivateRoute path='/superDashboard/personDetails' component={PersonDetails} />
            <PrivateRoute path='/superDashboard/vendorMaster' component={vendorMaster} />
            <PrivateRoute path='/superDashboard/displayVendorMaster' component={DisplayVendorMaster}/>
            <PrivateRoute path='/superDashboard/displayVendorServices' component={DisplayVendorServices}/>
            <PrivateRoute path='/superDashboard/DisplayServices' component={DisplayServices} />
            <PrivateRoute path='/superDashBoard/displayPerson' exact component={displayPersonDetails} />
            <PrivateRoute path='/superDashBoard/demo' component={Demo} />
            <PrivateRoute path='/superDashBoard/assetsMaster' exact component={AssetList} />
            <PrivateRoute path='/superDashBoard/assetsMaster/assetsList' component={AssetTypeMaster} />
            <PrivateRoute path='/superDashBoard/assetsTypeSubMaster' exact component={AssetsTypeSubList} />
            <PrivateRoute path='/superDashBoard/assetsTypeSubMaster/assetsTypeSubList' component={AssetsTypeSubMaster} />
            <PrivateRoute path='/superdashboard/flatDetailMaster' component={flatDetailMaster} />
            <PrivateRoute path='/superdashboard/flatDetails' component={flatDetails} />   
            <PrivateRoute path='/superDashboard/cityMaster' component={CityMaster} />
            <PrivateRoute path='/superDashboard/cityMasterDetail' component={CityMasterDetail} />
            <PrivateRoute path='/superDashboard/locationMaster' component={locationMaster}/>
            <PrivateRoute path='/superDashboard/displayLocation' component={DisplayLocation}/>
            <PrivateRoute path='/superDashboard/maintenanceMaster' component={MaintenanceMaster}/>
            <PrivateRoute path='/superDashboard/maintenanceMasterDetail' component={MaintenanceMasterDetail}/>
            <PrivateRoute path='/superDashboard/inventoryDetails' component={InventoryDetails}/>
            <PrivateRoute path='/superDashboard/inventory' component={Inventory}/>
            <PrivateRoute  path ='/superDashboard/employeeType' component ={EmployeeTypeMaster}/>
            <PrivateRoute path='/superDashboard/displayEmployeeType' component ={DisplayEmployeeTypeMaster}/>
            <PrivateRoute path='/superDashboard/employee' component ={EmployeeMaster}/>
            <PrivateRoute path ='/superDashboard/displayEmployee' component={DisplayEmployeeMaster}/>
            <PrivateRoute path='/superDashboard/MaintenanceSubMasterForm' component={MaintenanceSubMasterForm} />
            <PrivateRoute path='/superDashboard/MaintenanceSubMasterDetails' component={MaintenanceSubMasterDetails} />
            <PrivateRoute path='/superDashboard/designationMaster' component={DesignationMaster} />
            <PrivateRoute path='/superDashboard/designationMasterDetail' component={DesignationMasterDetail} />
            <PrivateRoute path='/superDashboard/societyComponent' component={SocietyComponent} />
            <PrivateRoute path='/superDashboard/relationshipMaster' component={RelationshipMaster} />
            <PrivateRoute path='/superDashboard/relationshipMasterDetail' component={RelationshipMasterDetail} />
         
        
            <PrivateRoute path='/superDashboard/societyMemberEvents' component={SocietyMemberEvents} />
            <PrivateRoute path='/superDashboard/memberEventsDetail' component={MemberEventsDetail} />
            <PrivateRoute path='/superDashboard/memberEventsBooking' component={MemberEventsBooking} />
            <PrivateRoute path='/superDashboard/memberEventsBookingDetail' component={MemberEventsBookingDetail} />

            <PrivateRoute path='/superDashboard/eventSpaceMaster' exact component={EventSpaceMaster} />
            <PrivateRoute path='/superDashboard/eventSpaceMaster/eventSpaceMasterDetails' component={EventSpaceMasterDetails} />
            <PrivateRoute path='/superDashboard/flatOwnerDetail' component={FlatOwnerDetails} />
            <PrivateRoute path='/superDashboard/boardMemberRegistartionForm' component={BoardMemberRegistrationForm} />
            <PrivateRoute path='/superDashboard/boardMemberDetails' component={BoardMemberDetails} />
            <PrivateRoute path='/superDashboard/addTenant' component={AddTenant} />
            <PrivateRoute path='/superDashboard/flatOwnerList' component={FlatOwnerList} />
            <PrivateRoute path='/superDashboard/flatMemberList' component={FlatMemberList} />
            <PrivateRoute path='/superDashboard/tenantDetails' component={TenantDetail} />
            <Route path='/login/accountVerificationTenant' exact component={AccountVerificationTenant} />
            <Route path='/login/accountVerification' exact component={AccountVarification} />
            <Route path='/login/tokenVerification' exact component={TokenVerification} />
            <PrivateRoute path='/superDashBoard/tenantMemberDetail' component={TenantMemberDetail} />
            <PrivateRoute path='/superDashboard/addFloor' component={AddFloor} />
            <PrivateRoute path='/superDashboard/getFloor' component={GetFloorDetail} />
            <PrivateRoute path='/superDashboard/changePassword' component={ChangePassword} />
            <PrivateRoute path='/tenantDashboard/changePasswordTenant' component={ChangePasswordTenant} />
            <PrivateRoute path='/ownerDashboard/changePasswordOwner' component={ChangePasswordOwner} />
            <PrivateRoute path='/superDashboard/displayEmployee' component={DisplayEmployeeMaster} />
            <PrivateRoute path='/superDashboard/displayEmployee2' component={DisplayEmployeeMaster2} />
            <PrivateRoute path='/superDashboard/inventoryList' component={InventoryList} />
             <PrivateRoute path='/superDashboard/showList'exact component={ShowList} />
            <PrivateRoute path='/superDashboard/showList/showListDetails' component={ShowActiveListDetails} />
            <PrivateRoute path='/superDashboard/showList/showListDetails2' component={SWhowDeactiveListDetails} />
            <PrivateRoute path='/superDashboard/assignRoles' component={AssignRoles} />
            <PrivateRoute path='/superDashboard/individualVendor' component={IndividualVendor} />
            <PrivateRoute path='/superDashboard/individualVendorDetail' component={IndividualVendorDetail} />
            <PrivateRoute path='/superDashboard/vendorServiceDetail' component={VendorServiceDetail} />
           
            <PrivateRoute path='/superDashboard/SocietyEventBooking' component={SocietyEventBooking}/>
            <PrivateRoute path='/superDashboard/DisplaySocietyEventBooking' component={DisplaySocietyEventBooking}/>
       
            <PrivateRoute path='/superDashBoard/viewTenantDetail' component={ViewTenantDetail} />
            <PrivateRoute path='/superDashboard/assignRolesDetail' component={AssignRolesDetail} />
            <PrivateRoute path='/tenantDashboard/registerComplaint' component={RegisterComplaint} />
            <PrivateRoute path='/ownerDashboard/registerComplaintOwner' component={RegisterComplaintOwner} />
             <PrivateRoute path ='/superDashboard/machineMaster' component ={MachineMaster}/>
              <PrivateRoute path ='/superDashBoard/viewMachineMaster' component={ViewMachinMaster}/>
            <PrivateRoute path='/superDashboard/viewOwnerFlats' component={ViewOwnerFlats} />
            <PrivateRoute path="/superDashboard/addOwnerFlat" component={AddOwnerFlat}/>
            <PrivateRoute path='/superDashboard/parkingSlotList' component={ParkingSlotList}/>
            <PrivateRoute path='/superDashBoard/tenantFlatsDetail' component={TenantFlatsDetail} />
            <Route path='/submitotp' component= {submitOTP}/>
            <Route path='/token' component= {token}/>
            <Route path='/login/tenantVerification' exact component={TenantVerification} />
            <Route path='/superDashboard/commonAreaMaster' component={CommonAreaMaster}/>
            <Route path='/superDashboard/DisplayCommonAreaMaster' component={DisplayCommonArea}/>
            <Route path='/superDashboard/CommonAreaMachineMaster' component={CommonAreaMachine}/>
            <Route path='/superDashboard/DisplayCommonAreaMachineMaster' component={DisplayCommonAreaMachine}/>
            <PrivateRoute path='/superDashboard/rfId' component={RFID}/>
            <PrivateRoute path='/superDashboard/rfIdDetail' component={RfIdDetail}/>
            <PrivateRoute path='/superDashboard/machineIdMaster' component ={MachineIdMaster}/>
            <PrivateRoute path='/superDashboard/displayMachineIdMaster' component={DisplayMachineIdMaster}/>
          
            <PrivateRoute path='/ownerDashboard/viewStatusOwner' component={ViewStatusOwner}/>
            <PrivateRoute path='/ownerDashboard/complaintOwnerDetails' component={ComplaintOwnerDetails}/>
            <PrivateRoute path='/ownerDashboard/complaintTenantDetails' component={ComplaintTenantDetails}/>
          </Switch>
        </div>
        
      </BrowserRouter>
    );
  }
}

export default App;
