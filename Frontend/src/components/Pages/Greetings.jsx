import React from 'react'
import { Link } from 'react-router';

function Greetings() {
  return (
    <div className="text-center">
      <p className="text-base font-semibold text-indigo-600">200</p>
      <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
        Thank you
      </h1>
      <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
        Your profile is created
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        {/* <Link to="/" className="text-sm font-semibold text-gray-900"> */}
          application is in maintainance phase, more options will be available soon <span aria-hidden="true">&rarr;</span>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Greetings