import Rides from './Rides';
import SideBar from './SideBar';
import NavBar from './NavBar';
import CreateNewRide from './CreateNewRide';
import { useSelector } from 'react-redux';
import { useState } from 'react';
function FrontPage() {
    const [refreshKey, setRefreshKey] = useState(0);
    const show = useSelector(state => state.showModal.show);
    return (
        <div>
            <SideBar />
            <NavBar />
            <Rides refreshKey={refreshKey} />
            {show && <CreateNewRide onNewRideCreated={() => setRefreshKey(oldKey => oldKey + 1)} />}
        </div>
    );
}

export default FrontPage;
