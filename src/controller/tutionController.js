import Cookies from "universal-cookie";
import TutionApi from "../api/tutionApi";
import Controller from "./base";
import { showToast } from "../App";
class TutionController extends Controller {
  tutionApi = new TutionApi();
  post = async (data) => {
    const res = await this.tutionApi.post_tution(data);
    this.showSuccess("New tutor requested", res);
    return res;
  };
  getMyList = async () => {
    const res = await this.tutionApi.getMyList();
    return res;
  };
  getList = async () => {
    const res = await this.tutionApi.getList();
    return res;
  };
  getFilteredList = async (query) => {
    const res = await this.tutionApi.getFilteredList(query);
    return res;
  };
  offer = async (data, tutor_id) => {
    const res = await this.tutionApi.offer(data, tutor_id);
    this.showSuccess("Tution offered", res);
    return res;
  };
  acceptOffer = async (student_id) => {
    const res = await this.tutionApi.acceptOffer(student_id);
    this.showMessage("Accepted tution offer", res);
    return res;
  };
  rejectOffer = async (student_id) => {
    const res = await this.tutionApi.rejectOffer(student_id);
    this.showMessage("Rejected tution offer", res);
    return res;
  };
  cancelOffer = async (tutor_id) => {
    const res = await this.tutionApi.cancelOffer(tutor_id);
    this.showMessage("Tution offer cancelled", res);
    return res;
  };
  getOfferFromStudent = async (student_id) => {
    const res = await this.tutionApi.getOfferFromStudent(student_id);
    return res;
  };
  getOfferFromTutor = async (tutor_id) => {
    const res = await this.tutionApi.getOfferFromTutor(tutor_id);
    return res;
  };
  apply = async (post_id) => {
    const res = await this.tutionApi.apply(post_id);
    this.showMessage("Applied to tution post", res);
    return res;
  };
  cancelApplication = async (post_id) => {
    const res = await this.tutionApi.cancelApplication(post_id);
    this.showMessage("Application cancelled", res);
    return res;
  };
  getApplyList = async () => {
    const res = await this.tutionApi.getApplyList();
    return res;
  };
  getFilteredApplyList = async (query) => {
    const res = await this.tutionApi.getFilteredApplyList(query);
    return res;
  };
  getOfferFromPost = async (post_id) => {
    const res = await this.tutionApi.getOfferFromPost(post_id);
    return res;
  };
  getTutionDetails = async (user_id) => {
    const res = await this.tutionApi.getTutionDetails(user_id);
    return res.data;
  };
  getApplicantsTutionDetails = async (post_id) => {
    const res = await this.tutionApi.getApplicantsTutionDetails(post_id);
    return res;
  };
  getTutionsList = async () => {
    const res = await this.tutionApi.getTutionsList();
    return res;
  };
  getFilteredTutionsList = async (query) => {
    const res = await this.tutionApi.getFilteredTutionsList(query);
    return res;
  };
  getMyTutionsList = async () => {
    const res = await this.tutionApi.getMyTutionsList();
    return res;
  };
  getPendingTutionsList = async () => {
    const res = await this.tutionApi.getPendingTutionsList();
    return res;
  };
  rate = async (tutor_id, rating, review) => {
    const res = await this.tutionApi.rate(tutor_id, rating, review);
    this.showMessage("Feedback submitted", res);
    return res;
  };
  getFeedbacks = async (tutor_id) => {
    const res = await this.tutionApi.getFeedbacks(tutor_id);
    return res;
  };
}
export default TutionController;
