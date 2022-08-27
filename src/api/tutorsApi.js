import Api from "./base";
class TutorsApi extends Api {
  getTutorsList = async () => {
    return await this.get(`/tutors/list`);
  };
  getFilteredTutorsList = async (query) => {
    return await this.post(`/tutors/filtered_list`, { filter: query });
  };
  getEducation = async (tutor_id) => {
    return await this.post(`/tutors/education`, { tutor_id: tutor_id });
  };
  getEducationsList = async () => {
    return await this.get(`/tutors/education_list`);
  };
  getFilteredEducationsList = async (query) => {
    return await this.post(`/tutors/filtered_education_list`, {
      filter: query,
    });
  };
  getMyTutorsList = async () => {
    return await this.get(`/tutors/my_list`);
  };
  getApplicantsList = async (post_id) => {
    return await this.post(`/tutors/applicants_list`, {
      post_id: post_id,
    });
  };
  getAllMaterials = async () => {
    return await this.get(`/tutors/all_materials`);
  };
  getMyMaterials = async () => {
    return await this.get(`/tutors/my_materials`);
  };
  uploadLecture = async (description, link) => {
    return await this.post(`/tutors/upload`, {
      description: description,
      link: link,
    });
  };
}

export default TutorsApi;
