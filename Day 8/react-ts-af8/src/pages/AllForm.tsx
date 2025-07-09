import HomePage from './Form1/HomePage';
import FormRegister from './Form2/FormRegister';
import FormLogin from './Form3/LoginForm';

export default function AllForm() {
  return (
    <div>
        <h1 className='text-2xl font-bold'>1. Form Sign in and Sign up</h1>
        <HomePage />
        <h1 className='text-2xl font-bold'>2. Form Register</h1>
        <FormRegister />
        <h1 className='text-2xl font-bold'>3. Form Login</h1>
        <FormLogin />
    </div>
  );
}
