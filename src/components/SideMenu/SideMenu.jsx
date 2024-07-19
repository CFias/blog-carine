import React, { useState } from "react";
import PropTypes from "prop-types";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  AdminPanelSettings,
  ArrowRight,
  ExpandLess,
  ExpandMore,
  FormatListBulletedRounded,
  HomeRounded,
  InfoRounded,
  InventoryRounded,
  LogoutRounded,
  Person2Rounded,
  PersonRounded,
  SettingsRounded,
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
        <List>
          <div className="side-infos">
            {user ? (
              <>
                <div className="infos-pri">
                  <span className="icon-banner">
                    <Person2Rounded fontSize="large" className="icon-side" />
                  </span>{" "}
                  <div className="name-email">
                    <h4>{user.displayName ? user.displayName : "Usuário"}</h4>
                    <p>
                      {user.email ? user.email : <p>Mulheres em movimento</p>}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <NavLink to="/login" className="link-list">
                <p>Faça login</p>
                <ArrowRight />
              </NavLink>
            )}
          </div>
          <ListItem button component={NavLink} to="/" onClick={onClose}>
            <HomeRounded fontSize="small" className="icones" />
            <ListItemText className="side-text" primary="Inicio" />
          </ListItem>
          <ListItem button component={NavLink} to="/" onClick={onClose}>
            <PersonRounded fontSize="small" className="icones" />
            <ListItemText className="side-text" primary="Meu perfil" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/productsAll"
            onClick={onClose}
          >
            <InventoryRounded fontSize="small" className="icones" />
            <ListItemText
              className="side-text"
              primary="Todas as publicações"
            />
          </ListItem>
          <ListItem button onClick={toggleCategories}>
            <FormatListBulletedRounded fontSize="small" className="icones" />
            <ListItemText className="side-text" primary="Categorias" />
            {categoriesOpen ? (
              <ExpandLess className="icones" fontSize="small" />
            ) : (
              <ExpandMore className="icones" fontSize="small" />
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
                <ListItemText className="list-item" primary="Podcasts" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/productsAll"
                onClick={onClose}
              >
                <ListItemText className="list-item" primary="Artigos" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/productsAll"
                onClick={onClose}
              >
                <ListItemText className="list-item" primary="Carreira" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/productsAll"
                onClick={onClose}
              >
                <ListItemText className="list-item" primary="Palestras" />
              </ListItem>
            </>
          )}
          <ListItem button component={NavLink} to="/contact" onClick={onClose}>
            <Share fontSize="small" className="icones" />
            <ListItemText className="side-text" primary="Redes" />
          </ListItem>
          <ListItem button component={NavLink} to="/about" onClick={onClose}>
            <InfoRounded fontSize="small" className="icones" />
            <ListItemText className="side-text" primary="Carine Lima" />
          </ListItem>
          <ListItem button component={NavLink} to="/about" onClick={onClose}>
            <SettingsRounded fontSize="small" className="icones" />
            <ListItemText className="side-text" primary="Configurações" />
          </ListItem>
          {user &&
            (user.uid === "Ivhz4g1swbds6NZyLa6yUsGynPB3" ||
              user.uid === "9t1GnsVos7Wem9liOT8oRU8MbU53") && (
              <ListItem button component={NavLink} to="/adm" onClick={onClose}>
                <AdminPanelSettings fontSize="small" className="icones" />
                <ListItemText
                  className="side-text"
                  primary="Área administrativa"
                />
              </ListItem>
            )}
        </List>
        <div className="side-infos-two">
          {user ? (
            <NavLink onClick={handleLogout} className="link-list">
              Sair <LogoutRounded fontSize="small" className="icones" />
            </NavLink>
          ) : (
            <div className="">Caren Blog</div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

SideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideMenu;
