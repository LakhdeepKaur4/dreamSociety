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
import AdminDashboard from './containers/adminDashboard/adminDashboard';
import OwnerDashboard from './containers/ownerDashboard/ownerDashboard';
import SuperDashboard from './containers/superDashboard/superDashboard';
import TenantDashboard from './containers/tenantDashboard/tenantDashboard';
import VendorDashboard from './containers/vendorDashboard/vendorDashboard';
import ParkingMaster from './containers/parkingMaster/parkingMaster';
import EmployeeMaster from './containers/employeeMaster/employeeMaster';
import DisplayEmployeeMaster from './containers/employeeMaster/displayEmployeeMaster';
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
import serviceMaster from './containers/vendorMangement/serviceMaster/serviceMaster';
import displayServices from './containers/vendorMangement/serviceMaster/displayServiceMaster';
import vendorMaster from './containers/vendorMangement/vendorMaster/vendorMaster';
import DisplayVendorMaster from './containers/vendorMangement/vendorMaster/displayVendorMaster';

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
import SocietyMemberRegistrationForm from './containers/societyMemberRegistration/societyMemberRegistrationForm';
import FlatOwnerDetails from './containers/flatOwnerDetails/flatOwnerDetails';


class App extends Component {
  render() {
    return (
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        
        <div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/superDashboard' exact component={SuperDashboard} />
            <PrivateRoute path='/adminDashboard' component={AdminDashboard} />
            <PrivateRoute path='/ownerDashboard' component={OwnerDashboard} />
            <PrivateRoute path='/tenantDashboard' component={TenantDashboard} />
            <PrivateRoute path='/vendorDashboard' component={VendorDashboard} />
            <PrivateRoute path='/superDashboard/registration' component={Registration} />
            <PrivateRoute path={'/superDashboard/user_details'} component={UserDetails} />
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
            <PrivateRoute path='/superDashboard/serviceMaster' component={serviceMaster} />
            <PrivateRoute path='/superDashboard/personDetails' component={PersonDetails} />
            <PrivateRoute path='/superDashboard/vendorMaster' component={vendorMaster} />
            <PrivateRoute path='/superDashboard/displayVendorMaster' component={DisplayVendorMaster}/>
            <PrivateRoute path='/superDashboard/displayServices' component={displayServices} />
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
            <PrivateRoute path='/superDashboard/societyMemberRegistartionForm' component={SocietyMemberRegistrationForm} />
            <PrivateRoute path='/superDashboard/flatOwnerDetail' component={FlatOwnerDetails} />
          </Switch>
        </div>
        
      </BrowserRouter>
    );
  }
}

export default App;
