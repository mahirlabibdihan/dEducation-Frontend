import Api from "./base";
class CourseApi extends Api {
  getMyList = async () => {
    return await this.get(`/courses/my_list`);
  };
  getClassOptions = async (coaching_id) => {
    return await this.post(`/courses/class_options`, {
      coaching_id: coaching_id,
    });
  };
  getSubjectOptions = async (coaching_id, class_name) => {
    return await this.post(`/courses/subject_options`, {
      coaching_id: coaching_id,
      class: class_name,
    });
  };
  getBatches = async (course_id) => {
    return await this.post(`/courses/batches`, { course_id: course_id });
  };
  getBatchOptions = async (coaching_id, class_name, subject) => {
    return await this.post(`/courses/batch_options`, {
      coaching_id: coaching_id,
      class: class_name,
      subject: subject,
    });
  };
  getMyListAdmin = async () => {
    return await this.get(`/courses/my_list_admin`);
  };
  create = async (data) => {
    return await this.post(`/courses/create`, {
      coaching_id: data.coaching,
      class: data.class,
      subject: data.subject,
    });
  };
  addBatch = async (course_id, batch) => {
    return await this.post(`/courses/add_batch`, {
      course_id: course_id,
      batch: batch,
    });
  };
  enroll = async (batch_id) => {
    return await this.post(`/courses/enroll`, { batch_id: batch_id });
  };
}

export default CourseApi;
