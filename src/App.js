import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import Routing from "./routes/Routing";
import theme from "./theme";
import Logger from "./error/Logger";

function App() {
  return (
    <Logger>
      <ThemeProvider theme={theme}>
        <Routing />
      </ThemeProvider>
    </Logger>
  );
}

export default App;
