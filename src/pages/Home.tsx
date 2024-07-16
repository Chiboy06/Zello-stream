import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import Header from "../components/Header"


export const Home = () => {
  const navigate = useNavigate();

  const onStartMeeting = async() => {
    const randomId = Math.floor(Math.random() * 1000000).toString();
    navigate(`/home/create/${randomId}`, { replace: true});
  };

  const onJoinMeeting = async () => {
    navigate(`/home/room`);
  }

  return (
    <div className='h-svh'>
      <Header />
      <div className="flex flex-col gap-5 h-3/5 justify-center align-middle items-center">
        <Button
          onClick={onStartMeeting}
          className='bg-blue-500 p-5 w-60 rounded-xl text-white font-medium cursor-pointer text-xl'
        >
          Create Meeting
        </Button>
        <Button
          onClick={onJoinMeeting}
          className='bg-blue-500 p-5 w-60 rounded-xl text-white font-medium cursor-pointer text-xl'
        >
          Join Meeting
        </Button>          
      </div>
    </div>
  )
}
