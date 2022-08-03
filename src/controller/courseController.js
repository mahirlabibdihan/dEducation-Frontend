import Cookies from "universal-cookie";
import StudentsApi from "../api/studentsApi";
import Controller from "./base";
import CourseApi from "../api/courseApi";
class CourseController extends Controller {
  courseApi = new CourseApi();
  cookies = new Cookies();
  addBatch = async (course_id, batch) => {
    const token = this.cookies.get("token");
    const result = await this.courseApi.addBatch(course_id, batch, token);
    return result;
  };
  enroll = async (batch_id) => {
    const token = this.cookies.get("token");
    const result = await this.courseApi.enroll(batch_id, token);
    return result;
  };
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
  getMyListAdmin = async () => {
    const token = this.cookies.get("token");
    const result = await this.courseApi.getMyListAdmin(token);
    return result;
  };
  getClassOptions = async (coaching_id) => {
    console.log("Coach", coaching_id);
    const token = this.cookies.get("token");
    const result = await this.courseApi.getClassOptions(coaching_id, token);
    return result;
  };
  getSubjectOptions = async (coaching_id, class_name) => {
    const token = this.cookies.get("token");
    const result = await this.courseApi.getSubjectOptions(
      coaching_id,
      class_name,
      token
    );
    return result;
  };
  getBatchOptions = async (coaching_id, class_name, subject) => {
    const token = this.cookies.get("token");
    const result = await this.courseApi.getBatchOptions(
      coaching_id,
      class_name,
      subject,
      token
    );
    return result;
  };
  getBatches = async (course_id) => {
    const token = this.cookies.get("token");
    const result = await this.courseApi.getBatches(course_id, token);
    return result;
  };
  // getCourseId = async (coaching_id, class_name, subject) => {
  //   const token = this.cookies.get("token");
  //   const result = await this.courseApi.getCourseId(
  //     coaching_id,
  //     class_name,
  //     subject,
  //     token
  //   );
  //   return result;
  // };
}
export default CourseController;
