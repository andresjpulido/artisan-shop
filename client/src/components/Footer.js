import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

export default function Footer(props) {

  const user = useSelector(state => state.authReducer.user)

  if (!user ||  !user.token)
    return (<div></div>)
  else
    return (
      <Fragment>
        <br /><br /><br /><br />
        <footer className="footer">
          <div className="text-center">© 2021 Developed by
            <a href="http://www.andresjpulido.com/"> AP</a>
          </div>
        </footer>
      </Fragment>
    );

}