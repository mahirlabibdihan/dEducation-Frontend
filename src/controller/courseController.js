import Cookies from "universal-cookie";
import StudentsApi from "../api/studentsApi";
import Controller from "./base";
import CourseApi from "../api/courseApi";
class CourseController extends Controller {
  courseApi = new CourseApi();
  cookies = new Cookies();
  create = async (data) => {
    const token = this.cookies.get("token");
    const result = await this.courseApi.create(data, token);
    return result;
  };
  getMyList = async () => {
    const token = this.cookies.get("token");
    const result = await this.courseApi.getMyList(token);
    return result;
  };
}
export default CourseController;
