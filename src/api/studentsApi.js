import Api from "./base";
class StudentsApi extends Api {
  getMyStudentsList = async () => {
    return await this.get(`/students/my_list`);
  };
  getPendingStudentsList = async () => {
    return await this.get(`/students/pending_list`);
  };
  getEnrolledStudentsList = async (data) => {
    return await this.post(`/students/enrolled_list`, { course: data });
  };
  getMembersList = async (coaching_id) => {
    return await this.post(`/students/members_list`, {
      coaching_id: coaching_id,
    });
  };
}

export default StudentsApi;
