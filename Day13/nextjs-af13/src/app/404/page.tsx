import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className=" text-lg text-center text-red-500">404 - Page Not Found</h1>
      <hr />
      <p className="mt-4 text-gray-600">The page you are looking for does not exist.</p>
      <p className="mt-2 text-gray-600">If you believe this is an error, please contact support.</p>
      <hr className="my-6" />
      <p className="text-gray-600">Return to the home page:</p>
      <br />

      <Link className="text-blue-500 hover:underline" href="/login">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </Link>
    </div>
  );
}