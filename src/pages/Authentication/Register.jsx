import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { TbFidgetSpinner } from 'react-icons/tb'
import { toast } from 'react-toastify'

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const formData = new FormData()
    formData.append('image', image)

    try {
      setLoading(true)
      // stap-1
      const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
      console.log(data.data.display_url)

      // stap-2
      const result = await createUser(email, password);
      console.log(result)

      // stap-3
      await updateUserProfile(name, data.data.display_url)
      toast.success('Success')
      navigate(from)
    }
    catch (err) {
      toast.error(err?.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Succese')
      navigate(from)
    }
    catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Register</h1>
          <p className='text-sm text-gray-400'>Welcome to Unhidden Gems</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00aa6c] bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
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
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#00aa6c] bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-[#00aa6c] w-full rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner className='animate-spin text-xl m-auto' /> : 'Continue'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button disabled={loading} onClick={handleGoogleLogin} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-[#00aa6c] text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Register
