import React from 'react';

const Button = ({ children, className = '', variant = 'default', size = 'default', ...props }) => {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    default: 'bg-orange-600 text-white hover:bg-orange-700',
    ghost: 'bg-transparent hover:bg-orange-100 text-orange-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    default: 'h-10 px-4 text-sm',
    icon: 'h-10 w-10 p-0',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export { Button };
