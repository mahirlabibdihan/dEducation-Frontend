import Api from "./base";
class CoachingApi extends Api {
  getList = async () => {
    return await this.get(`/coaching/list`);
  };
  getJoinList = async () => {
    return await this.get(`/coaching/join_list`);
  };
  getMyList = async () => {
    return await this.get(`/coaching/my_list`);
  };
  getMyNotices = async () => {
    return await this.get(`/coaching/notices`);
  };
  create = async (data) => {
    return await this.post(`/coaching/create`, { coaching: data });
  };
  postNotice = async (data) => {
    return await this.post(`/coaching/notices`, { data: data });
  };
  getInfo = async (coaching_id) => {
    return await this.post(`/coaching/get_info`, { coaching_id: coaching_id });
  };
  getCourseList = async (coaching_id) => {
    return await this.post(`/coaching/course_list`, {
      coaching_id: coaching_id,
    });
  };
  joinCoaching = async (coaching_id) => {
    return await this.post(`/coaching/join`, {
      coaching_id: coaching_id,
    });
  };
  updateInfo = async (data) => {
    return await this.post(`/coaching/update_info`, { coaching: data });
  };
  uploadImage = async (data) => {
    return await this.post(`/coaching/upload`, data);
  };
}

export default CoachingApi;
