import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => (
  <nav className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mb-8">
    <Link to="/" className="flex items-center hover:text-primary transition-colors">
      <Home className="w-3.5 h-3.5 mr-1" /> Home
    </Link>
    {items.map((item, i) => (
      <React.Fragment key={i}>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        {item.href ? (
          <Link to={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
        ) : (
          <span className="text-primary font-semibold">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

export default Breadcrumb;
