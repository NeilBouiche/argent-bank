import Logo from '../assets/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { disconnectUser } from '../utils/apiSlice';

export default function MenuBar() {
  const user = useSelector((state) => state.api.user);
  const token =
    useSelector((state) => state.api.token) || localStorage.getItem('token');
  const dispatch = useDispatch();

  return (
    <nav className='main-nav'>
      <Link className='main-nav-logo' to='/'>
        <img
          className='main-nav-logo-image'
          src={Logo}
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <div>
        {token && user && user.firstName ? (
          <div className='main-nav-item-container'>
            <Link className='main-nav-item' to='/user'>
              <FontAwesomeIcon icon={faCircleUser} />
              <span className='main-nav-item-text'>{user.firstName}</span>
            </Link>
            <Link
              className='main-nav-item'
              to='/'
              onClick={() => {
                dispatch(disconnectUser());
              }}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span className='main-nav-item-text'>Sign Out</span>
            </Link>
          </div>
        ) : (
          <Link className='main-nav-item' to='/sign-in'>
            <FontAwesomeIcon icon={faCircleUser} />
            <span className='main-nav-item-text'>Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
