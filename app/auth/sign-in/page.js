import GithubSigning from '@/components/GithubSigning';
import GoogleSigning from '@/components/GoogleSigning';
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import { Login } from '@/lib/auth/handleCredentialSigning';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const SignIn = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  if(isAuthenticated){
    redirect('/');
  }

    return (
      <div className='w-full min-h-screen flex justify-center items-center px-4'>
        <div className='w-[35rem] flex flex-col gap-10 items-center border rounded-xl px-14 py-16 shadow-xl max-sm:px-10 max-sm:py-12 max-sm:w-[30rem]'>
          <div className='w-full text-center'>
            <h1 className='text-5xl font-semibold mb-4'>Sign in</h1>
            <p className='text-gray-500'>Sign in to your account</p>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <GoogleSigning text='in'/>
            <GithubSigning text='in'/>
          </div>
          <div className='w-full flex justify-center items-center gap-1'>
            <div className='flex-1 h-[1px] bg-gray-500'></div>
            <div className='flex-1 text-gray-500 text-sm text-center'>Or with credentials</div>
            <div className='flex-1 h-[1px] bg-gray-500'></div>
          </div>
          <form 
          action={async (formData)=> {
            "use server"
            await Login(formData)
          }}
          className='w-full'>
            <div className='flex flex-col gap-4 w-full'>
              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="email" className='font-medium text-sm text-gray-700'>Email</label>
                <input type="email" id='email' name='email' placeholder='Enter your email' className='border rounded-lg px-6 py-4' />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="password" className='font-medium text-sm text-gray-700'>Password</label>
                <input type="password" id='password' name='password' placeholder='Enter your password' className='border rounded-lg px-6 py-4' />
              </div>
              {/* {error && <p className="text-red-500">{error}</p>} */}
              <button type='submit' className='w-full border border-stone-50 text-center py-4 bg-black hover:bg-black/90 text-white font-medium rounded-md'>Sign in</button>
            </div>
          </form>
          <p>Don&apos;t have an account? <Link href='/auth/sign-up' className='text-blue-600'>Sign up</Link></p>
        </div>
      </div>
    )
}

export default SignIn;