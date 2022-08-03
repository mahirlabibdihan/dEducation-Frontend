import Cookies from "universal-cookie";
import TutionApi from "../api/tutionApi";
import Controller from "./base";

class TutionController extends Controller {
  tutionApi = new TutionApi();
  cookies = new Cookies();
  post = async (data) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.post(data, token);
    return result;
  };
  getMyList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getMyList(token);
    return result;
  };
  getList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getList(token);
    return result;
  };
  offer = async (data, tutor_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.offer(data, tutor_id, token);
    return result;
  };
  acceptOffer = async (student_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.acceptOffer(student_id, token);
    return result;
  };
  rejectOffer = async (student_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.rejectOffer(student_id, token);
    return result;
  };
  cancelOffer = async (tutor_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.cancelOffer(tutor_id, token);
    return result;
  };
  getOfferFromStudent = async (student_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getOfferFromStudent(student_id, token);
    return result;
  };
  getOfferFromTutor = async (tutor_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getOfferFromTutor(tutor_id, token);
    return result;
  };
  apply = async (post_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.apply(post_id, token);
    return result;
  };
  cancelApplication = async (post_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.cancelApplication(post_id, token);
    return result;
  };
  getApplyList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getApplyList(token);
    return result;
  };
  getOfferFromPost = async (post_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getOfferFromPost(post_id, token);
    return result;
  };
  getTutionDetails = async (user_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getTutionDetails(user_id, token);
    return result.data;
  };
  getApplicantsTutionDetails = async (post_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getApplicantsTutionDetails(
      post_id,
      token
    );
    return result;
  };
  getTutionsList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getTutionsList(token);
    return result;
  };
  getMyTutionsList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getMyTutionsList(token);
    return result;
  };
  getPendingTutionsList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getPendingTutionsList(token);
    return result;
  };
}
export default TutionController;
