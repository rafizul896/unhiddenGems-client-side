import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { TbFidgetSpinner } from 'react-icons/tb';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const { signIn, signInWithGoogle, loading, setLoading, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || '/';


  const handleLogin = async (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    setEmail(email)
    const password = form.password.value;
    try {
      const result = await signIn(email, password)
      console.log(result)
      if (result?.user) {
        toast.success('Success!');
      }
      navigate(from);
    }
    catch (err) {
      setLoading(false)
      toast.error(err.message);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Succese');
      navigate(from);
    }
    catch (err) {
      toast.error(err.message);
    }
  }

  const handleResetPassword = async () => {
    if (!email) return toast.error('Please write your email first')
    try {
      await resetPassword(email);
      toast.success('Request success check your email')
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                onBlur={e => setEmail(e.target.value)}
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00aa6c] bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00aa6c] bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-[#00aa6c] w-full rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner className='m-auto text-xl animate-spin' /> : "Continue"}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button onClick={handleResetPassword} className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button disabled={loading} onClick={handleGoogleLogin} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/register'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
          Register
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login;
