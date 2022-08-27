import Cookies from "universal-cookie";
import TutorsApi from "../api/tutorsApi";
import Controller from "./base";

class TutorsController extends Controller {
  tutorsApi = new TutorsApi();
  getTutorsList = async () => {
    const res = await this.tutorsApi.getTutorsList();
    return res;
  };
  getEducation = async (tutor_id) => {
    const res = await this.tutorsApi.getEducation(tutor_id);
    return res;
  };
  getEducationsList = async () => {
    const res = await this.tutorsApi.getEducationsList();
    return res;
  };
  getFilteredTutorsList = async (query) => {
    const res = await this.tutorsApi.getFilteredTutorsList(query);
    return res;
  };
  getFilteredEducationsList = async (query) => {
    const res = await this.tutorsApi.getFilteredEducationsList(query);
    return res;
  };
  getMyTutorsList = async () => {
    const res = await this.tutorsApi.getMyTutorsList();
    return res;
  };
  getApplicantsList = async (post_id) => {
    const res = await this.tutorsApi.getApplicantsList(post_id);
    return res;
  };
  getAllMaterials = async () => {
    const res = await this.tutorsApi.getAllMaterials();
    return res;
  };
  getMyMaterials = async () => {
    const res = await this.tutorsApi.getMyMaterials();
    return res;
  };
  uploadLecture = async (values) => {
    const res = await this.tutorsApi.uploadLecture(
      values.description,
      values.link
    );
    return res;
  };
}
export default TutorsController;
