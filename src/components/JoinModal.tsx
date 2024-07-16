import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-sdk';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import { Home } from '../pages/Home';
import CreateRoom from '../pages/CreateRoom';
import JoinRoom from '../pages/JoinRoom';

const API_KEY = import.meta.env.VITE_EXPO_PUBLIC_STREAM_ACCESS_KEY!;

const Layout = () => {
  const { authState, initialized } = useAuth();
  console.log("AS, IN", authState, initialized)
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (!initialized) return;

    if (authState?.authenticated) {
      console.log("Authenticated");
      console.log("Client: ", client);
      client
      navigate("/home");
      
    } else if (!authState?.authenticated) {
      console.log("Not Authenticated");
      client?.disconnectUser();
      navigate("/login");
    }
  }, [authState, initialized]);

  useEffect(() => {
    if (authState?.authenticated && authState.token) {
      console.log("creating a client");
      const user: User = { id: authState.user_id! };

      try {
        const client = new StreamVideoClient({ apiKey: API_KEY, user, token: authState.token })
        setClient(client);
      } catch (e) {
        console.log("Error creating client", e);
      }
    }
  }, [authState]);
  

  
  return (
    <>
      {!client && (
        <Login/>
      )}
      {client && (
        <StreamVideo client={client}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/home/create/:id" element={<CreateRoom />} />
            <Route path="/home/room" element={<JoinRoom />} />
            
          </Routes>
          {/* <Home /> */}
        </StreamVideo>
      )}
    </>
  )
}

const JoinModal = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='*' element={<Layout />} />
      </Routes>
      {/* <Layout/> */}
    </AuthProvider>
  )
}

export default JoinModal