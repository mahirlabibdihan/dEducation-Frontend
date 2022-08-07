import Cookies from "universal-cookie";
import TutorsApi from "../api/tutorsApi";
import Controller from "./base";

class TutorsController extends Controller {
  tutorsApi = new TutorsApi();
  getTutorsList = async () => {
    const result = await this.tutorsApi.getTutorsList();
    return result;
  };
  getEducation = async (tutor_id) => {
    const result = await this.tutorsApi.getEducation(tutor_id);
    return result;
  };
  getEducationsList = async () => {
    const result = await this.tutorsApi.getEducationsList();
    return result;
  };
  getFilteredTutorsList = async (query) => {
    const result = await this.tutorsApi.getFilteredTutorsList(query);
    return result;
  };
  getFilteredEducationsList = async (query) => {
    const result = await this.tutorsApi.getFilteredEducationsList(query);
    return result;
  };
  getMyTutorsList = async () => {
    const result = await this.tutorsApi.getMyTutorsList();
    return result;
  };
  getApplicantsList = async (post_id) => {
    const result = await this.tutorsApi.getApplicantsList(post_id);
    return result;
  };
}
export default TutorsController;
