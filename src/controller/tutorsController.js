import Cookies from "universal-cookie";
import TutorsApi from "../api/tutorsApi";
import Controller from "./base";

class TutorsController extends Controller {
  tutorsApi = new TutorsApi();
  cookies = new Cookies();
  getTutorsList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutorsApi.getTutorsList(token);
    return result;
  };
  getEducation = async (tutor_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutorsApi.getEducation(tutor_id, token);
    return result;
  };
  getEducationsList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutorsApi.getEducationsList(token);
    return result;
  };
  getFilteredTutorsList = async (query) => {
    const token = this.cookies.get("token");
    const result = await this.tutorsApi.getFilteredTutorsList(query, token);
    return result;
  };
  getFilteredEducationsList = async (query) => {
    const token = this.cookies.get("token");
    const result = await this.tutorsApi.getFilteredEducationsList(query, token);
    return result;
  };
  getMyTutorsList = async () => {
    const token = this.cookies.get("token");
    const result = await this.tutorsApi.getMyTutorsList(token);
    return result;
  };
  getApplicantsList = async (post_id) => {
    const token = this.cookies.get("token");
    const result = await this.tutorsApi.getApplicantsList(post_id, token);
    return result;
  };
}
export default TutorsController;
