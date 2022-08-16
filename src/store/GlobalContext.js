import { createContext } from "react";
const GlobalContext = createContext({
  pendingUpdate: false,
  setPendingUpdate: () => {},
  newNotificationFlag: false,
  setNewNotificationFlag: () => {},
  notificationUpdate: false,
  setNotificationUpdate: () => {},
});
export default GlobalContext;
