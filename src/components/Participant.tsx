import { useCallStateHooks } from '@stream-io/video-react-sdk';
import { Users } from 'lucide-react';

const Participant = () => {
    const { useParticipantCount } = useCallStateHooks();
    const participantCount = useParticipantCount();
  return (
        <div className='w-12 flex text-sm justify-center font-bold gap-x-1 items-center content-center h-9 bg-[#19232d] px-2 rounded-full'>
          {participantCount}  <Users className='w-10 h-9 text-sm' />
        </div>
  )
}

export default Participant