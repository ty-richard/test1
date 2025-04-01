'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        className="w-full p-2 border rounded"
      />
      
      <input
        type="text"
        name="lastName"
        placeholder="LAST NAME"
        value={formData.lastName}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      
      <input
        type="text"
        name="homeAirport"
        placeholder="HOME AIRPORT"
        value={formData.homeAirport}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      
      <input
        type="text"
        name="countryOfResidence"
        placeholder="COUNTRY OF RESIDENCE"
        value={formData.countryOfResidence}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      
      <input
        type="tel"
        name="phoneNumber"
        placeholder="PHONE NUMBER"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      
      <input
        type="password"
        name="password"
        placeholder="PASSWORD"
        value={formData.password}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      
      <input
        type="password"
        name="confirmPassword"
        placeholder="CONFIRM PASSWORD"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      
      {passwordError && (
        <p className="text-red-500 text-sm">{passwordError}</p>
      )}
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="marketingConsent"
          checked={formData.marketingConsent}
          onChange={handleInputChange}
          className="h-4 w-4 rounded"
        />
        <label className="text-sm">
          Yes! Sign me up for early access to new features, product updates, and new content
        </label>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
