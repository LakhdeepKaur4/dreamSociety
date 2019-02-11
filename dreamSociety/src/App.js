import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import displayVendorMaster from './containers/vendorMangement/vendorMaster/displayVendorMaster';
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



class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
            <PrivateRoute path='/superDashboard/displayVendorMaster' component={displayVendorMaster} />
            <PrivateRoute path='/superDashboard/displayServices' component={displayServices} />
            <PrivateRoute path='/superDashBoard/displayPerson' component={displayPersonDetails} />
            <PrivateRoute path='/superDashBoard/demo' component={Demo} />
            <PrivateRoute path='/superDashBoard/assetsMaster' exact component={AssetTypeMaster} />
            <PrivateRoute path='/superDashBoard/assetsMaster/assetsList' component={AssetList} />
            <PrivateRoute path='/superDashBoard/assetsTypeSubMaster' exact component={AssetsTypeSubMaster} />
            <PrivateRoute path='/superDashBoard/assetsTypeSubMaster/assetsTypeSubList' component={AssetsTypeSubList} />
            <PrivateRoute path='/superdashboard/flatDetailMaster' component={flatDetailMaster} />
            <PrivateRoute path='/superdashboard/flatDetails' component={flatDetails} />
             
            <PrivateRoute path='/superDashboard/cityMaster' component={CityMaster} />
            <PrivateRoute path='/superDashboard/cityMasterDetail' component={CityMasterDetail} />
            <PrivateRoute path='/superDashboard/locationMaster' component={locationMaster}/>
            
            <Route path='/superDashboard' exact component={SuperDashboard} />
            <Route path='/adminDashboard' component={AdminDashboard} />
            <Route path='/ownerDashboard' component={OwnerDashboard} />
            <Route path='/tenantDashboard' component={TenantDashboard} />
            <Route path='/vendorDashboard' component={VendorDashboard} />

            <Route path='/superDashboard/registration' component={Registration} />
            <Route path={'/superDashboard/user_details'} component={UserDetails} />
            <Route path='/superDashboard/parking_master' component={ParkingMaster} />
            <Route path='/superDashboard/display-tower' component={DisplayTowerMaster} />
            <Route path='/superDashboard/display-size' component={DisplaySizeMaster} />
            <Route path='/superDashboard/towermaster' component={TowerMaster} />
            <Route path='/superDashboard/sizemaster' component={SizeMaster} />
            <Route path='/superDashboard/event' component={EventMaster} />
            <Route path='/superDashboard/flatmaster' exact component={FlatMaster} />
            <Route path='/superDashboard/flatmaster/flatmasterdetails' component={FlatMasterDetails} />
            <Route path='/superDashboard/countryMaster' exact component={countryMaster} />
            <Route path='/superDashboard/countryMaster/countryMasterDetails' exact component={countryMasterDetails} />
            <Route path='/superDashboard/statemaster' exact component={stateMaster} />
            <Route path='/superDashboard/statemaster/statemasterdetails' exact component={stateMasterDetails} />
            <Route path='/superDashboard/displayLocation'  component={DisplayLocation} />

            <Route path='/superDashboard/societyManagement' component={SocietyManagement} />
            <Route path ='/superDashboard/societyManagementDetail' component={SocietyManagementDetail}/>
            <Route path='/superDashboard/display-event' component={DisplayEventMaster} />
            <Route path='/superDashboard/add_parking/new' component={Parking} />
            <Route path='/superDashboard/serviceMaster' component={serviceMaster} />
            <Route path='/superDashboard/personDetails' component={PersonDetails} />
            <Route path='/superDashboard/vendorMaster' component={vendorMaster} />
            <Route path='/superDashboard/displayVendorMaster' component={displayVendorMaster} />
            <Route path='/superDashboard/displayServices' component={displayServices} />
            <Route path='/superDashBoard/displayPerson' component={displayPersonDetails} />
            <Route path='/superDashBoard/demo' component={Demo} />
            <Route path='/superDashBoard/assetsMaster' exact component={AssetTypeMaster} />
            <Route path='/superDashBoard/assetsMaster/assetsList' component={AssetList} />
            <Route path='/superDashBoard/assetsTypeSubMaster' exact component={AssetsTypeSubMaster} />
            <Route path='/superDashBoard/assetsTypeSubMaster/assetsTypeSubList' component={AssetsTypeSubList} />
      
            <Route path='/superdashboard/flatDetailMaster' component={flatDetailMaster} />
            <Route path='/superdashboard/flatDetails' component={flatDetails} />
  
            
      
            <Route path='/superDashboard/cityMaster' component={CityMaster} />
            <Route path='/superDashboard/cityMasterDetail' component={CityMasterDetail} />
            <Route path='/superDashboard/locationMaster' component={locationMaster}/>
        
        
            <Route path='/superdashboard/DisplayLocation' component={DisplayLocation} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
