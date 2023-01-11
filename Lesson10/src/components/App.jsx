import {
  Routes,
  Route,
  Outlet,
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom';
import React from 'react';
import PrivateRoute from '../utils/PrivateRoute';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Product />}>
            <Route path=":productId" element={<ProductDetail />} />
          </Route>
          <Route path="/invoices" element={<Invoices />}>
            <Route path=":invoiceId" element={<InvoiceDetail />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function Auth() {
  return (
    <div>
      <div className="text-center text-5xl">Auth Page</div>
      <div className="flex items-center justify-center my-4">
        <div className="mr-2 text-3xl">Navigate:</div>
        <Link to="/auth/login" className="mr-2">
          <button className="btn">Login</button>
        </Link>
        <Link to="/auth/register">
          <button className="btn">Register</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      Username:
      <input className=" m-4 border border-black" type="text" />
      Password:
      <input className=" m-4 border border-black" type="password" />
      <button
        className="btn"
        onClick={() => {
          localStorage.setItem('token', 'abc123');
          navigate('/');
        }}
      >
        Login
      </button>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      Username:
      <input className=" m-4 border border-black" type="text" />
      Password:
      <input className=" m-4 border border-black" type="password" />
      Confirm Password:
      <input className=" m-4 border border-black" type="password" />
      <button
        className="btn"
        onClick={() => {
          localStorage.setItem('token', 'abc123');
          navigate('/');
        }}
      >
        Register
      </button>
    </div>
  );
}

function HomePage() {
  return <div>HomePage</div>;
}

function Product() {
  return (
    <div>
      Products
      <Outlet />
    </div>
  );
}

function ProductDetail() {
  const params = useParams();
  return <div>Product {params.productId}</div>;
}

function Invoices() {
  return (
    <div>
      Invoices
      <Outlet />
    </div>
  );
}

function InvoiceDetail() {
  const params = useParams();
  return <div>Invoice {params.invoiceId}</div>;
}

function Cart() {
  return <div>Cart</div>;
}

function Profile() {
  return <div>Profile</div>;
}

function About() {
  return <div>About</div>;
}

function NotFound() {
  return (
    <div>
      <p className="my-2">Not Found 404</p>
      <Link to="/">
        <button className="btn mr-2">Back To HomePage</button>
      </Link>
    </div>
  );
}
