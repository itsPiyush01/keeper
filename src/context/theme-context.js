import React from "react";

const themeContext = React.createContext({ theme: "light", toggle: () => {} });

export default themeContext;
