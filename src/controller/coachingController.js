import Cookies from "universal-cookie";
import StudentsApi from "../api/studentsApi";
import Controller from "./base";
import CoachingApi from "../api/coachingApi";
import { showToast } from "../App";
class CoachingController extends Controller {
  coachingApi = new CoachingApi();
  create = async (data) => {
    const result = await this.coachingApi.create(data);
    this.showMessage("New coaching created", result);
    return result;
  };
  getList = async () => {
    const result = await this.coachingApi.getList();
    return result;
  };
  getJoinList = async () => {
    const result = await this.coachingApi.getJoinList();
    return result;
  };
  getMyList = async () => {
    const result = await this.coachingApi.getMyList();
    return result;
  };
  getInfo = async (coaching_id) => {
    const result = await this.coachingApi.getInfo(coaching_id);
    return result;
  };
  joinCoaching = async (coaching_id) => {
    const result = await this.coachingApi.joinCoaching(coaching_id);
    this.showMessage("New coaching joined", result);
    return result;
  };
  getMyCourseList = async (coaching_id) => {
    const result = await this.coachingApi.getMyCourseList(coaching_id);
    return result;
  };
  updateInfo = async (data, coaching_id) => {
    data["coaching_id"] = coaching_id;
    const result = await this.coachingApi.updateInfo(data);
    this.showMessage("Coaching details updated", result);
    return result;
  };
  uploadImage = async (formData) => {
    const result = await this.coachingApi.uploadImage(formData);
    this.showMessage("Image changed", result);
    return result;
  };
}
export default CoachingController;
