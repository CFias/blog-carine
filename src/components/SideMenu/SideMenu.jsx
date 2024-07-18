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
                <Avatar />

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
            <Home fontSize="small" className="icon-list" />
            <ListItemText className="side-text" primary="Inicio" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/productsAll"
            onClick={onClose}
          >
            <Inventory fontSize="small" className="icon-list" />
            <ListItemText
              className="side-text"
              primary="Todas as publicações"
            />
          </ListItem>
          <ListItem button onClick={toggleCategories}>
            <FormatListBulletedRounded fontSize="small" className="icon-list" />
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
            <Share fontSize="small" className="icon-list" />
            <ListItemText className="side-text" primary="Redes" />
          </ListItem>
          <ListItem button component={NavLink} to="/about" onClick={onClose}>
            <InfoRounded fontSize="small" className="icon-list" />
            <ListItemText className="side-text" primary="Carine Lima" />
          </ListItem>
          {user && (
            <ListItem button component={NavLink} to="/adm" onClick={onClose}>
              <AdminPanelSettings fontSize="small" className="icon-list" />
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
