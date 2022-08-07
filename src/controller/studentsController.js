import Cookies from "universal-cookie";
import StudentsApi from "../api/studentsApi";
import Controller from "./base";

class StudentsController extends Controller {
  studentsApi = new StudentsApi();
  getMyStudentsList = async () => {
    const res = await this.studentsApi.getMyStudentsList();
    return res;
  };
  getPendingStudentsList = async () => {
    const res = await this.studentsApi.getPendingStudentsList();
    return res;
  };
  getEnrolledStudentsList = async (data) => {
    const res = await this.studentsApi.getEnrolledStudentsList(data);
    return res;
  };
  getMembersList = async (coaching_id) => {
    const res = await this.studentsApi.getMembersList(coaching_id);
    return res;
  };
}
export default StudentsController;
