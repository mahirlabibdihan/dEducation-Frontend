import { data } from "autoprefixer";
import Api from "./base";
class TutionApi extends Api {
  post_tution = async (data) => {
    return await this.post(`/tution/post`, { tution: data });
  };

  apply = async (post_id) => {
    return await this.post(`/tution/apply`, { post_id: post_id });
  };
  cancelApplication = async (post_id) => {
    return await this.post(`/tution/apply/cancel`, {
      post_id: post_id,
    });
  };

  offer = async (data, tutor_id) => {
    return await this.post(`/tution/offer`, {
      tution: data,
      tutor_id: tutor_id,
    });
  };

  acceptOffer = async (student_id) => {
    return await this.post(`/tution/offer/accept`, {
      student_id: student_id,
    });
  };

  rejectOffer = async (student_id) => {
    return await this.post(`/tution/offer/reject`, {
      student_id: student_id,
    });
  };

  cancelOffer = async (tutor_id) => {
    return await this.post(`/tution/offer/cancel`, { tutor_id: tutor_id });
  };
  getOfferFromStudent = async (student_id) => {
    return await this.post(`/tution/get_offer_student`, {
      student_id: student_id,
    });
  };
  getOfferFromTutor = async (tutor_id) => {
    return await this.post(`/tution/get_offer_tutor`, {
      tutor_id: tutor_id,
    });
  };
  getMyList = async () => {
    return await this.get(`/tution/my_list`);
  };
  getOfferFromPost = async (post_id) => {
    return await this.post(`/tution/by_post`, { post_id: post_id });
  };
  getList = async () => {
    return await this.get(`/tution/list`);
  };
  getFilteredList = async (filter) => {
    return await this.post(`/tution/filtered_list`, { filter: filter });
  };
  getTutionDetails = async (user_id) => {
    return await this.post(`/tution/get_details`, { id: user_id });
  };
  getApplicantsTutionDetails = async (post_id) => {
    return await this.post(`/tution/get_applicants_tution_details`, {
      post_id: post_id,
    });
  };
  getTutionsList = async () => {
    return await this.get(`/tution/get_all_details`);
  };
  getFilteredTutionsList = async (query) => {
    return await this.post(`/tution/get_filtered_details`, {
      filter: query,
    });
  };
  getMyTutionsList = async () => {
    return await this.get(`/tution/get_my_details`);
  };
  getPendingTutionsList = async () => {
    return await this.get(`/tution/get_pending_details`);
  };
  getApplyList = async () => {
    return await this.get(`/tution/get_apply_list`);
  };
  getFilteredApplyList = async (query) => {
    return await this.post(`/tution/get_filtered_apply_list`, {
      filter: query,
    });
  };
  rate = async (tutor_id, rating) => {
    return await this.post(`/tution/rate`, {
      tutor_id: tutor_id,
      rating: rating,
    });
  };
}

export default TutionApi;
