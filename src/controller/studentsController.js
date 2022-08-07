import Cookies from "universal-cookie";
import StudentsApi from "../api/studentsApi";
import Controller from "./base";

class StudentsController extends Controller {
  studentsApi = new StudentsApi();
  getMyStudentsList = async () => {
    const result = await this.studentsApi.getMyStudentsList();
    return result;
  };
  getPendingStudentsList = async () => {
    const result = await this.studentsApi.getPendingStudentsList();
    return result;
  };
  getEnrolledStudentsList = async (data) => {
    const result = await this.studentsApi.getEnrolledStudentsList(data);
    return result;
  };
  getMembersList = async (coaching_id) => {
    const result = await this.studentsApi.getMembersList(coaching_id);
    return result;
  };
}
export default StudentsController;
