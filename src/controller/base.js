import { showToast } from "../App";
export default class Controller {
  showSuccess(message, res) {
    if (res === undefined) showToast("Couldn't connect to server", "error");
    else if (res.success) showToast(message, "success");
    else showToast(res.error, "error");
  }
  showMessage(message, res) {
    if (res === undefined) showToast("Couldn't connect to server", "error");
    else if (res.success) showToast(message);
    else showToast(res.error, "error");
  }
}
