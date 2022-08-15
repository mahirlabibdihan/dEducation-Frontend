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
    this.showSuccess("You have successfully requested to enroll", res);
    return res;
  };
  approveEnrollment = async (batch_id, student_id) => {
    const res = await this.courseApi.approveEnrollment(batch_id, student_id);
    this.showSuccess("Enrollment request approved", res);
    return res;
  };
  declineEnrollment = async (batch_id, student_id) => {
    const res = await this.courseApi.declineEnrollment(batch_id, student_id);
    this.showSuccess("Enrollment request declined", res);
    return res;
  };
  cancelEnrollment = async (batch_id) => {
    const res = await this.courseApi.cancelEnrollment(batch_id);
    this.showSuccess("Enrollment request canceled", res);
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
