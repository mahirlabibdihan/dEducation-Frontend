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
  getMyOffers = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getMyOffers(token);
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
  getApplicants = async (post_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getApplicants(post_id, token);
    return result;
  };
  getOfferFromPost = async (post_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutionApi.getOfferFromPost(post_id, token);
    return result;
  };
}
export default TutionController;
