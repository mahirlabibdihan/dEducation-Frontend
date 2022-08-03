import Cookies from "universal-cookie";
import StudentsApi from "../api/studentsApi";
import Controller from "./base";

class StudentsController extends Controller {
  studentsApi = new StudentsApi();
  cookies = new Cookies();
  getMyStudentsList = async () => {
    const token = this.cookies.get("token");
    const result = await this.studentsApi.getMyStudentsList(token);
    return result;
  };
  getPendingStudentsList = async () => {
    const token = this.cookies.get("token");
    const result = await this.studentsApi.getPendingStudentsList(token);
    return result;
  };
  getEnrolledStudentsList = async (data) => {
    const token = this.cookies.get("token");
    const result = await this.studentsApi.getEnrolledStudentsList(data, token);
    console.log("--->" + result.data);
    return result;
  };
  getMembersList = async (coaching_id) => {
    const token = this.cookies.get("token");
    const result = await this.studentsApi.getMembersList(coaching_id, token);
    return result;
  };
}
export default StudentsController;
