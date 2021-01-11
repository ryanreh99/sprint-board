import "./setup.js";

// Unused here but required for server side template.
import { Tooltip, Toast, Popover } from "bootstrap";

import "./start-client.js";
import "./main.js";

// During hot reload, the component will unmount and the constructor
// will have to re-run when the component gets mounted again.
// Thus state data is lost.
// TODO: Use react-hot-loader
if (module.hot) {
    module.hot.accept();
}
