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
}
export default StudentsController;
