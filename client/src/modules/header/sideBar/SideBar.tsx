import React from 'react';
import { ReactComponent as CloseMenuIcon } from '../../../assets/icons/closeMenuIcon.svg';
import { motion } from 'framer-motion';
import variables from './SideBar.scss';
import NavItem from './navItem/NavItem';
import NavItemLogout from './navItem/NavItemLogout';
import { SideBarProps } from './SideBar.types';

const SideBar: React.FC<SideBarProps> = ({ sideBarOpen, closeSideBar }) => {

    const hiddenWidth = -1 * variables.sideBarWidth.slice(0, -4);

    const variants = {
        visible: { left: "0vw", transition: { ease: "linear" } },
        hidden: { left: `${hiddenWidth}vmax`, transition: { ease: "linear" } }
    };

    return (
        <motion.div className="SideBar" initial={"hidden"} animate={sideBarOpen ? "visible" : "hidden"} variants={variants}>
            <div className="Header">
                <div className="HeaderItem MenuTitle">
                    MENU
                    </div>
                <div className="HeaderItem CloseMenuButton" onClick={closeSideBar}>
                    <CloseMenuIcon />
                </div>
            </div>
            <nav className="Body">
                <NavItem path="/loading" label="Place cargo" />
                <NavItem path="/overview" label="Deck overview" />
                <NavItem path="/discharge" label="Discharge" />
                <NavItem path="/history" label="History" />
                <NavItem path="/settings" label="Settings" />
                <NavItemLogout path="/login" label="Logout" />
            </nav>
        </motion.div>
    );
}

export default SideBar;