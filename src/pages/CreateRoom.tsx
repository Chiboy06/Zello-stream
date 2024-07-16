import { Call, SpeakerLayout, StreamCall, StreamTheme, StreamVideoEvent, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import '@stream-io/video-react-sdk/dist/css/styles.css';
import '../../app/globals.css';
import ChatView from '../components/ChatView';
import { useMediaQuery } from 'react-responsive'
// import CustomBottomSheet from '../components/CustomBottomSheet';
import { CallControls } from '../components/CustomCallControls';
import { toast } from 'sonner';

type CustomCancelCallBtn = {
  reject?: boolean;
}

// type CustomProps = CustomCancelCallBtn & {callId: string}

const CreateRoom = ({ reject }: CustomCancelCallBtn) => {
  const  { id }  = useParams<{ id: string }>();  
  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();
  const navigate = useNavigate();
  const isMediumOrLarger = useMediaQuery({ query: '(min-width: 768px)' });
  // const { useCallCallingState, useLocalParticipant, useRemoteParticipants } = useCallStateHooks();
  // const callingState = useCallCallingState();
  // const localParticipant = useLocalParticipant();
  // const remoteParticipant = useRemoteParticipants();
  useEffect(() => {
    if (!client) return;

    const unsubscribe = client!.on('all', (event: StreamVideoEvent) => {
      console.log("Event: ", event.type);

      if (event.type === 'call.session_participant_joined') {
        console.log(event.participant.user.id);
        
        const user = event.participant.user.id
        toast(`User ${user} joined`)
      }

      if (event.type === 'call.session_participant_left') {
        const user = event.participant.user.id;
        toast(`User ${user} left`)
      }
    });
    return () => {
      unsubscribe();
    };
  }, [])
  
    
  useEffect(() => {
    if (!client || call) return;

    const joinCall = async () => {
      if (!id) {
        navigate('/home');
        return;
      }
      const call = client.call('default', id);
      await call.join({ create: true });
      setCall(call);
      
    }
    joinCall();
  }, [call]);

  const goToHomePage = async () => {
    call?.leave({ reject })
    await call?.endCall()
    navigate("/home");
  }

  if (!call || !id) return null;
  

  return (
    <div className='bg-slate-900 scroll-m-0'>
      <div className='flex flex-col h-svh md:flex-row'>
        <StreamTheme style={{ position: 'relative' }}>    
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls callId={id} onLeave={goToHomePage}/>
          </StreamCall>
        </StreamTheme>
        <div className='text-center justify-center w-full md:w-96 md:h-full bg-white text-black'>
          {id && (
            isMediumOrLarger && (
               <ChatView channelId={id} />
            )
          )}
        </div>
      </div>
     
    </div>
  )
}

export default CreateRoom;
