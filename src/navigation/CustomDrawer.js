import React from 'react';
import PropTypes from 'prop-types';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = props => {
  const { state } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(
    item => !['CapturePhoto', 'ShowPhoto'].includes(item.name)
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} state={newState} />
    </DrawerContentScrollView>
  );
};

CustomDrawer.propTypes = {
  state: PropTypes.object.isRequired,
};

export default CustomDrawer;
