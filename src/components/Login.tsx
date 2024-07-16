import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ReactLoading from 'react-loading'


const Login = () => {
  // const [data, setData] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const { onLogin, onRegister } = useAuth();
  const { onLogin, onRegister } = useAuth()

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSignInPress = async () => {
    setLoading(true);    
  
    try {
      const result = await onLogin!(email, password);
      console.log('Login result: ', result);
      setPassword('');
      setEmail('');
    } catch (e) {
      console.error('Error during login: ', e);
      let errorMessage = 'Error: Could not login';
  
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onSignUpPress = async () => {
    setLoading(true);
  
    try {
      const result = await onRegister!(email, password);
      console.log('Register result: ', result);
      setPassword('');
      setEmail('');
    } catch (e) {
      console.error('Error during registeration: ', e);
      let errorMessage = 'Error: Could not Register';
  
      if (e instanceof Error) {
        errorMessage = e.message;
      }
  
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-slate-900 h-screen text-white font-bold flex items-center justify-center'>
      <ReactLoading className={`${loading && ('visible')}`} type='bars' height={667} width={375} />
      <div className='flex w-full h-svh items-center justify-center'>
        <div className="bg-slate-800 rounded-xl shadow-lg py-10  md:w-2/5 w-4/5 h-3/5 ">
          <div className='text-gray-200 py-3 flex flex-col items-center justify-center'>
            <h1 className='font-semibold text-3xl'>Zello</h1>
            <p className='text-sm font-normal'>Friend meet</p>
          </div>
          <div className="flex justify-center px-5 items-center py-6 flex-col gap-y-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                type="email"
                className='p-3 outline-0 bg-slate-500 rounded-xl'
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                type="password"
                className='p-3 outline-0 border-0 bg-slate-500 rounded-xl'
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <button onClick={onSignInPress} className='bg-slate-700 px-5 py-3 w-full rounded-xl'>Sign In</button>
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Button type='submit' onClick={onSignUpPress} className='bg-slate-700 px-5 py-3 w-full rounded-xl' variant='secondary'>Register</Button>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default Login