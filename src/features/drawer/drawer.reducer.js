import { OPEN_DRAWER, CLOSE_DRAWER } from './drawer.constants';

const drawerReducerInitialState = null;

const drawerReducer = (
  state = drawerReducerInitialState,
  { type, payload }
) => {
  switch (type) {
    case OPEN_DRAWER:
      const { drawerType, drawerProps } = payload;

      return { drawerType, drawerProps };
    case CLOSE_DRAWER:
      return null;
    default:
      return state;
  }
};

export default drawerReducer;
