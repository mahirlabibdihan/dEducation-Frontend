import Cookies from "universal-cookie";
import StudentsApi from "../api/studentsApi";
import Controller from "./base";
import CoachingApi from "../api/coachingApi";
import { showToast } from "../App";
class CoachingController extends Controller {
  coachingApi = new CoachingApi();
  create = async (data) => {
    const res = await this.coachingApi.create(data);
    this.showMessage("New coaching created", res);
    return res;
  };

  postNotice = async (data) => {
    const res = await this.coachingApi.postNotice(data);
    this.showMessage("New notice posted", res);
    return res;
  };
  getList = async () => {
    const res = await this.coachingApi.getList();
    return res;
  };
  getJoinList = async () => {
    const res = await this.coachingApi.getJoinList();
    return res;
  };
  getMyList = async () => {
    const res = await this.coachingApi.getMyList();
    return res;
  };
  getMyNotices = async () => {
    const res = await this.coachingApi.getMyNotices();
    return res;
  };
  getInfo = async (coaching_id) => {
    const res = await this.coachingApi.getInfo(coaching_id);
    return res;
  };
  joinCoaching = async (coaching_id) => {
    const res = await this.coachingApi.joinCoaching(coaching_id);
    this.showMessage("You have successfully requested to join", res);
    return res;
  };
  approveJoinRequest = async (coaching_id, student_id) => {
    const res = await this.coachingApi.approveJoinRequest(
      coaching_id,
      student_id
    );
    this.showMessage("Join request approved", res);
    return res;
  };
  declineJoinRequest = async (coaching_id, student_id) => {
    const res = await this.coachingApi.declineJoinRequest(
      coaching_id,
      student_id
    );
    this.showMessage("Join request declined", res);
    return res;
  };
  cancelJoinRequest = async (coaching_id) => {
    const res = await this.coachingApi.cancelJoinRequest(coaching_id);
    this.showMessage("Join request canceled", res);
    return res;
  };
  getCourseList = async (coaching_id) => {
    const res = await this.coachingApi.getCourseList(coaching_id);
    return res;
  };
  updateInfo = async (data, coaching_id) => {
    data["coaching_id"] = coaching_id;
    const res = await this.coachingApi.updateInfo(data);
    this.showMessage("Coaching details updated", res);
    return res;
  };
  uploadImage = async (formData) => {
    const res = await this.coachingApi.uploadImage(formData);
    this.showMessage("Image changed", res);
    return res;
  };
}
export default CoachingController;
