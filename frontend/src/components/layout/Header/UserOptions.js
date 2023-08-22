import { SpeedDial, SpeedDialAction } from '@mui/material';
import React, { Fragment, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { CgBorderStyleDashed } from 'react-icons/cg';
import './Header.css'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();

    const options = [
        { icons: <ListAltIcon />, name: "Orders", func: orders },
        { icons: <PersonIcon />, name: "Profile", func: account },
        { icons: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    // below function will be only only visible for admin i.e. dashboard, stats etc
    if (user.role === "admin") {
        // shift removes 1st element fm an array
        // unshift ulta
        options.unshift({ icons: <DashboardIcon />, name: "Dashboard", func: dashboard })
    }

    function dashboard() {
        history.push("./dashboard")
    }
    function orders() {
        history.push("./orders")
    }
    function account() {
        history.push("./account")
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfull");
    }
    return (
        <Fragment>
            {/* here zindex is 10 which is less than zindex of speedDialIcon by 1 which givesblacking effect on open is true onHover */}
            <Backdrop open={open} style={{ zIndex: "10"}} /> 
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className="speedDial"
                style={{ zIndex: "11" }}
                onClose={() => setOpen(false)} // this is on hover for speeddial
                onOpen={() => setOpen(true)} // this is on hover for speeddial
                open={open}
                direction="down" // to set direction of the tooltip downwords
                icons={<img
                    className="speedDialIcon"
                    src={user.avatar.url ? user.avatar.url : "./profileImg.png"}
                    // src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    alt="Profile"
                />
                }
            >
                {/* <SpeedDialAction icon={<DashboardIcon />} tooltipTitle="Dashboard" /> */}
                {options.map((item) => {
                    return (
                        <SpeedDialAction key={item.name} icon={item.icons} tooltipTitle={item.name} onClick={item.func} />
                    )
                })}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions