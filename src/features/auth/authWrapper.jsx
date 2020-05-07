import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../modal/modal.actions';

export const UserIsAuthenticated = connectedReduxRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: true,
  redirectPath: '/events',
  authenticatedSelector: ({ firebase: { profile } }) =>
    profile.isLoaded && !profile.isEmpty,
  redirectAction: newLoc => dispatch => {
    dispatch(openModal('UnAuthModal'));
  },
});
