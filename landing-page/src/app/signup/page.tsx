import SignupForm from '../components/forms/signupform';

export default function SignUpPage() {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8 lowercase">account information</h1>
        <SignupForm />
      </div>
    );
}