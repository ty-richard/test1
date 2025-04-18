'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { inter } from '@/app/fonts';

export default function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ready for API call with formData
    console.log('Form data ready for submission:', formData);
    router.push('/home');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <input
        type="email"
        name="email"
        placeholder="EMAIL"
        value={formData.email}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      
      <input
        type="password"
        name="password"
        placeholder="PASSWORD"
        value={formData.password}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      
      <button
        type="submit"
        className="w-full bg-skyblue border-2 border-navy px-6 py-3 font-semibold"
      >
        SIGN IN
      </button>
    </form>
  );
}
