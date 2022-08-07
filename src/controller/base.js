import { showToast } from "../App";
export default class Controller {
  showSuccess(message, res) {
    if (res.success) showToast(message, "success");
    else showToast(res.error, "error");
  }
  showMessage(message, res) {
    if (res.success) showToast(message);
    else showToast(res.error, "error");
  }
}
