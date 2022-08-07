import { showToast } from "../App";
export default class Controller {
  showSuccess(message, result) {
    if (result.success) showToast(message, "success");
    else showToast(result.error, "error");
  }
  showMessage(message, result) {
    if (result.success) showToast(message);
    else showToast(result.error, "error");
  }
}
