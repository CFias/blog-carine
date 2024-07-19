import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  AdminPanelSettings,
  AlignVerticalTopSharp,
  ExpandLess,
  ExpandMore,
  FormatListBulletedRounded,
  HelpRounded,
  Home,
  InfoRounded,
  Inventory,
  LogoutRounded,
  Person2Rounded,
  Phone,
  Share,
} from "@mui/icons-material";
import "./styles.css"; // Ensure to style the side menu
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../contexts/AuthContext";

const SideMenu = ({ isOpen, onClose }) => {
  const { logout } = useAuthentication();
  const { user } = useAuthValue();
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div className="side-menu">
        <div className="side-infos">
          {user ? (
            <>
              <h4>
                <span className="icon-banner">
                  <Person2Rounded className="icon-side" />
                </span>{" "}
                Olá, {user.displayName ? user.displayName : "Usuário"}
              </h4>
              <NavLink onClick={handleLogout} className="link-list">
                Sair <LogoutRounded fontSize="10" className="icon-list" />
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" className="link-list">
              Faça login
            </NavLink>
          )}
        </div>
        <List>
          <ListItem button component={NavLink} to="/" onClick={onClose}>
            <span className="icon-list">
              <Home fontSize="small" className="icons" />
            </span>
            <ListItemText className="side-text" primary="Inicio" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/productsAll"
            onClick={onClose}
          >
            <span className="icon-list">
              <Inventory fontSize="small" className="icons" />
            </span>
            <ListItemText
              className="side-text"
              primary="Todas as publicações"
            />
          </ListItem>
          <ListItem button onClick={toggleCategories}>
            <span className="icon-list">
              <FormatListBulletedRounded fontSize="small" className="icons" />
            </span>
            <ListItemText className="side-text" primary="Categorias" />
            {categoriesOpen ? (
              <ExpandLess fontSize="small" />
            ) : (
              <ExpandMore fontSize="small" />
            )}
          </ListItem>
          {categoriesOpen && (
            <>
              <ListItem
                button
                component={NavLink}
                to="/productsAll"
                onClick={onClose}
              >
                <ListItemText primary="Podcasts" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/productsAll"
                onClick={onClose}
              >
                <ListItemText primary="Artigos" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/productsAll"
                onClick={onClose}
              >
                <ListItemText primary="Carreira" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/productsAll"
                onClick={onClose}
              >
                <ListItemText primary="Palestras" />
              </ListItem>
            </>
          )}
          <ListItem button component={NavLink} to="/contact" onClick={onClose}>
            <span className="icon-list">
              <Share fontSize="small" className="icons" />
            </span>
            <ListItemText className="side-text" primary="Redes" />
          </ListItem>
          <ListItem button component={NavLink} to="/about" onClick={onClose}>
            <span className="icon-list">
              <InfoRounded fontSize="small" className="icons" />
            </span>
            <ListItemText className="side-text" primary="Carine Lima" />
          </ListItem>
          {user && (
            <ListItem button component={NavLink} to="/adm" onClick={onClose}>
              <span className="icon-list">
                <AdminPanelSettings fontSize="small" className="icons" />
              </span>
              <ListItemText
                className="side-text"
                primary="Área administrativa"
              />
            </ListItem>
          )}
        </List>
      </div>
    </Drawer>
  );
};

SideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideMenu;
