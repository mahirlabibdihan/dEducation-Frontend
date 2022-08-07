import Cookies from "universal-cookie";
import StudentsApi from "../api/studentsApi";
import Controller from "./base";
import CourseApi from "../api/courseApi";
import { showToast } from "../App";
class CourseController extends Controller {
  courseApi = new CourseApi();
  addBatch = async (course_id, batch) => {
    const result = await this.courseApi.addBatch(course_id, batch);
    this.showMessage("New batch added", result);
    return result;
  };
  enroll = async (batch_id) => {
    const result = await this.courseApi.enroll(batch_id);
    this.showSuccess("Enrolled in course", result);
    return result;
  };
  create = async (data) => {
    const result = await this.courseApi.create(data);
    this.showMessage("New course created", result);
    return result;
  };
  getMyList = async () => {
    const result = await this.courseApi.getMyList();
    return result;
  };
  getMyListAdmin = async () => {
    const result = await this.courseApi.getMyListAdmin();
    return result;
  };
  getClassOptions = async (coaching_id) => {
    const result = await this.courseApi.getClassOptions(coaching_id);
    return result;
  };
  getSubjectOptions = async (coaching_id, class_name) => {
    const result = await this.courseApi.getSubjectOptions(
      coaching_id,
      class_name
    );
    return result;
  };
  getBatchOptions = async (coaching_id, class_name, subject) => {
    const result = await this.courseApi.getBatchOptions(
      coaching_id,
      class_name,
      subject
    );
    return result;
  };
  getBatches = async (course_id) => {
    const result = await this.courseApi.getBatches(course_id);
    return result;
  };
}
export default CourseController;
