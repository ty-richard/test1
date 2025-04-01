'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { inter, dm_sans } from '@/app/fonts';

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    homeAirport: '',
    countryOfResidence: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    marketingConsent: false
  });
  
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    // Ready for API call with formData
    console.log('Form data ready for submission:', formData);
    router.push('/upsell');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <input
        type="text"
        name="firstName"
        placeholder="FIRST NAME"
        value={formData.firstName}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      
      <input
        type="text"
        name="lastName"
        placeholder="LAST NAME"
        value={formData.lastName}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      
      <input
        type="text"
        name="homeAirport"
        placeholder="HOME AIRPORT"
        value={formData.homeAirport}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      
      <input
        type="text"
        name="countryOfResidence"
        placeholder="COUNTRY OF RESIDENCE"
        value={formData.countryOfResidence}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      
      <input
        type="tel"
        name="phoneNumber"
        placeholder="PHONE NUMBER"
        value={formData.phoneNumber}
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
      
      <input
        type="password"
        name="confirmPassword"
        placeholder="CONFIRM PASSWORD"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        className={`w-full p-2 border border-navy rounded-xl bg-light ${inter.className}`}
      />
      
      {passwordError && (
        <p className="text-red-900 text-sm">{passwordError}</p>
      )}
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="marketingConsent"
          checked={formData.marketingConsent}
          onChange={handleInputChange}
          className="h-6 w-6 rounded border-navy text-sage focus:ring-navy"
        />
        <label className={`text-sm text-navy ${inter.className}`}>
          Yes! Sign me up for early access to new features, product updates, and new content
        </label>
      </div>
      
      <button
        type="submit"
        className={`w-full border-navy bg-skyBlue text-navy text-center text-bold py-2 px-4 rounded hover:bg-skyBlue-600 text-3xl ${dm_sans.className}`}
      >
        submit
      </button>
    </form>
  );
}
