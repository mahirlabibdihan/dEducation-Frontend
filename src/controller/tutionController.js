import Cookies from "universal-cookie";
import TutionApi from "../api/tutionApi";
import Controller from "./base";
import { showToast } from "../App";
class TutionController extends Controller {
  tutionApi = new TutionApi();
  post = async (data) => {
    const result = await this.tutionApi.post_tution(data);
    this.showSuccess("New tutor requested", result);
    return result;
  };
  getMyList = async () => {
    const result = await this.tutionApi.getMyList();
    return result;
  };
  getList = async () => {
    const result = await this.tutionApi.getList();
    return result;
  };
  getFilteredList = async (query) => {
    const result = await this.tutionApi.getFilteredList(query);
    return result;
  };
  offer = async (data, tutor_id) => {
    const result = await this.tutionApi.offer(data, tutor_id);
    this.showSuccess("Tution offered", result);
    return result;
  };
  acceptOffer = async (student_id) => {
    const result = await this.tutionApi.acceptOffer(student_id);
    this.showMessage("Accepted tution offer", result);
    return result;
  };
  rejectOffer = async (student_id) => {
    const result = await this.tutionApi.rejectOffer(student_id);
    this.showMessage("Rejected tution offer", result);
    return result;
  };
  cancelOffer = async (tutor_id) => {
    const result = await this.tutionApi.cancelOffer(tutor_id);
    this.showMessage("Tution offer cancelled", result);
    return result;
  };
  getOfferFromStudent = async (student_id) => {
    const result = await this.tutionApi.getOfferFromStudent(student_id);
    return result;
  };
  getOfferFromTutor = async (tutor_id) => {
    const result = await this.tutionApi.getOfferFromTutor(tutor_id);
    return result;
  };
  apply = async (post_id) => {
    const result = await this.tutionApi.apply(post_id);
    this.showMessage("Applied to tution post", result);
    return result;
  };
  cancelApplication = async (post_id) => {
    const result = await this.tutionApi.cancelApplication(post_id);
    this.showMessage("Application cancelled", result);
    return result;
  };
  getApplyList = async () => {
    const result = await this.tutionApi.getApplyList();
    return result;
  };
  getFilteredApplyList = async (query) => {
    const result = await this.tutionApi.getFilteredApplyList(query);
    return result;
  };
  getOfferFromPost = async (post_id) => {
    const result = await this.tutionApi.getOfferFromPost(post_id);
    return result;
  };
  getTutionDetails = async (user_id) => {
    const result = await this.tutionApi.getTutionDetails(user_id);
    return result.data;
  };
  getApplicantsTutionDetails = async (post_id) => {
    const result = await this.tutionApi.getApplicantsTutionDetails(post_id);
    return result;
  };
  getTutionsList = async () => {
    const result = await this.tutionApi.getTutionsList();
    return result;
  };
  getFilteredTutionsList = async (query) => {
    const result = await this.tutionApi.getFilteredTutionsList(query);
    return result;
  };
  getMyTutionsList = async () => {
    const result = await this.tutionApi.getMyTutionsList();
    return result;
  };
  getPendingTutionsList = async () => {
    const result = await this.tutionApi.getPendingTutionsList();
    return result;
  };
}
export default TutionController;
