import Cookies from "universal-cookie";
import StudentsApi from "../api/studentsApi";
import Controller from "./base";
import CourseApi from "../api/courseApi";
import { showToast } from "../App";
class CourseController extends Controller {
  courseApi = new CourseApi();
  addBatch = async (course_id, batch) => {
    const res = await this.courseApi.addBatch(course_id, batch);
    this.showMessage("New batch added", res);
    return res;
  };
  enroll = async (batch_id) => {
    const res = await this.courseApi.enroll(batch_id);
    this.showSuccess("Enrolled in course", res);
    return res;
  };
  create = async (data) => {
    const res = await this.courseApi.create(data);
    this.showMessage("New course created", res);
    return res;
  };
  getMyList = async () => {
    const res = await this.courseApi.getMyList();
    return res;
  };
  getMyListAdmin = async () => {
    const res = await this.courseApi.getMyListAdmin();
    return res;
  };
  getClassOptions = async (coaching_id) => {
    const res = await this.courseApi.getClassOptions(coaching_id);
    return res;
  };
  getSubjectOptions = async (coaching_id, class_name) => {
    const res = await this.courseApi.getSubjectOptions(coaching_id, class_name);
    return res;
  };
  getBatchOptions = async (coaching_id, class_name, subject) => {
    const res = await this.courseApi.getBatchOptions(
      coaching_id,
      class_name,
      subject
    );
    return res;
  };
  getBatches = async (course_id) => {
    const res = await this.courseApi.getBatches(course_id);
    return res;
  };
}
export default CourseController;
