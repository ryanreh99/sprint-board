import React from "react";
import ReactDOM from "react-dom";

import App from "./App.jsx";
import Feed from "./components/Feed/Feed.jsx";

ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(<Feed />, document.getElementById("left-feed"));
