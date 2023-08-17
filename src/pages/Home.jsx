import Banner from '../components/Banner';
import Features from '../components/Features';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { fetchUserProfile } from '../utils/apiSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const token =
    useSelector((state) => state.api.token) || localStorage.getItem('token');
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);
  return (
    <div>
      <MenuBar />
      <main>
        <Banner />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
