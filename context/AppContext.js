import React, { useState, createContext } from 'react';

export const AppContext = createContext({
  categories: [],
  setCategories: null,
});

const AppContextProvider = ({ children }) => {
  const data = [
    {
      value: 1,
      label: 'Full Stack Developer',
    },
    { value: 2, label: 'Web Developer' },
    { value: 3, label: 'App Developer' },
    { value: 4, label: 'DevOps Engineer' },
  ];

  const [categories, setCategories] = useState(data);

  return (
    <AppContext.Provider value={{ categories, setCategories }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
