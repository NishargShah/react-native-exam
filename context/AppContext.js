import React, { useState, createContext } from 'react';

export const AppContext = createContext({
  categories: [],
  setCategories: null,
});

const AppContextProvider = ({ children }) => {
  const data = [
    {
      value: Math.floor(Math.random() * 10000) + 1,
      label: 'Full Stack Developer',
    },
    { value: Math.floor(Math.random() * 10000) + 1, label: 'Web Developer' },
    { value: Math.floor(Math.random() * 10000) + 1, label: 'App Developer' },
    { value: Math.floor(Math.random() * 10000) + 1, label: 'DevOps Engineer' },
  ];

  const [categories, setCategories] = useState(data);

  return (
    <AppContext.Provider value={{ categories, setCategories }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
