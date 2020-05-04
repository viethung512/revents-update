import React from 'react';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';

function Toastr(props) {
  return (
    <ReduxToastr
      timeOut={1500}
      newestOnTop={false}
      preventDuplicates
      position='bottom-right'
      getState={state => state.toastr} // This is the default
      transitionIn='fadeIn'
      transitionOut='fadeOut'
      closeOnToastrClick
    />
  );
}

export default Toastr;
