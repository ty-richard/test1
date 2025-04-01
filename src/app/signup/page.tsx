import SignupForm from '../components/forms/signupform';
import { dm_sans } from '../fonts';

export default function SignUpPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className={`text-3xl text-navy ${dm_sans.className} font-bold text-center mb-8 lowercase`}>
        account information
      </h1>
      <SignupForm />
    </div>
  );
}