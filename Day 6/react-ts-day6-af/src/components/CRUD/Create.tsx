import React from 'react';

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthday: string;
};

type Props = {
  onCreated?: (customer: Customer) => void;
};

const url = 'https://server.aptech.io/online-shop/customers';
export default function Create({ onCreated }: Props) {
  // State to hold form data
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthday: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    console.log(`Input changed: ${id} = ${value}`);
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Customer created successfully:', data);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthday: '',
      });

      alert('Customer created successfully!');
      if (onCreated && typeof onCreated === 'function') {
        onCreated(data);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    } finally {
      //
    }
  };

  return (
    <div>

      <form className='w-full max-w-xl mx-auto bg-white rounded shadow mb-4' onSubmit={handleSubmit}>
        <h2 className='text-xl font-bold mb-4'>Create Customer</h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='firstName'>
            First Name
          </label>
          <input type='text' id='firstName' value={formData.firstName} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='lastName'>
            Last Name
          </label>
          <input type='text' id='lastName' value={formData.lastName} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='email'>
            Email
          </label>
          <input type='email' id='email' value={formData.email} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='phoneNumber'>
            Phone Number
          </label>
          <input type='tel' id='phoneNumber' value={formData.phoneNumber} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='address'>
            Address
          </label>
          <input type='text' id='address' value={formData.address} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='birthday'>
            Birthday
          </label>
          <input type='date' id='birthday' value={formData.birthday} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} />
        </div>
        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors'>
          Create Customer
        </button>
      </form>
    </div>
  );
}