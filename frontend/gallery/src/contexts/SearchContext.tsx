// // SearchContext.js
// import React, { createContext, useContext, useState } from "react";

// const SearchContext = createContext(null);

// export function SearchProvider({ children }) {
//   const [searchValue, setSearchValue] = useState(null);

//   const handleSearch = async (searchValue) => {
//     try {
//       const url = `http://127.0.0.1:8000/poi/?search=${searchValue}`;
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`Request failed with status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <SearchContext.Provider value={{ handleSearch }}>
//       {children}
//     </SearchContext.Provider>
//   );
// }

// export function useSearch() {
//   return useContext(SearchContext);
// }
