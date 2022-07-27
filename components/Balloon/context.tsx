import React, { useContext } from 'react';



export const ComponentContext = React.createContext({});

export const useBalloonContext = ():any => useContext(ComponentContext);
