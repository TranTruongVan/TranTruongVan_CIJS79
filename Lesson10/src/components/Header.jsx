import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center my-4">
      <div className="mr-2 text-3xl">Navigate:</div>
      <Link to="/" className="mr-2">
        <button className="btn">Home</button>
      </Link>
      <Link to="/products" className="mr-2">
        <button className="btn">Products</button>
      </Link>
      <Link to="/invoices" className="mr-2">
        <button className="btn">Invoices</button>
      </Link>
      <Link to="/cart" className="mr-2">
        <button className="btn">Cart</button>
      </Link>
      <Link to="/profile" className="mr-2">
        <button className="btn">Profile</button>
      </Link>
      <Link to="/about">
        <button className="btn mr-2">About</button>
      </Link>

      <button
        className="btn bg-red-600"
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/auth/login');
        }}
      >
        Logout
      </button>
    </div>
  );
}
