import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-sdk';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../src/components/Login';
import { Home } from '../src/pages/Home';
import CreateRoom from '../src/pages/CreateRoom';
import JoinRoom from '../src/pages/JoinRoom';

const API_KEY = import.meta.env.VITE_EXPO_PUBLIC_STREAM_ACCESS_KEY!;

const Layout = () => {
  const { authState, initialized } = useAuth();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (!initialized) return;

    if (authState?.authenticated) {
      client
      navigate("/home");
      
    } else if (!authState?.authenticated) {
      client?.disconnectUser();
      navigate("/login");
    }
  }, [authState, initialized]);

  useEffect(() => {
    if (authState?.authenticated && authState.token) {
      const user: User = { id: authState.user_id! };

      try {
        const client = new StreamVideoClient({ apiKey: API_KEY, user, token: authState.token })
        setClient(client);
      } catch (e) {
        console.error("Error creating client", e);
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
            <Route  path="*" element={<Home />} />
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

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='*' element={<Layout />} />
      </Routes>
      {/* <Layout/> */}
    </AuthProvider>
  )
}

export default App