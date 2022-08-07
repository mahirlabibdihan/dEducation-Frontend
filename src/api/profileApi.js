import Api from "./base";
class ProfileApi extends Api {
  getProfile = async () => {
    return await this.get(`/profile`);
  };
  getEducation = async () => {
    return await this.get(`/profile/education`);
  };
  setEducation = async (list) => {
    return await this.post(`/profile/education`, { list: list });
  };
  setProfile = async (data) => {
    return await this.post(`/profile`, { user: data });
  };
  getProfilePicture = async () => {
    return await this.get(`/profile`);
  };

  uploadImage = async (data) => {
    return await this.post(`/profile/upload`, data);
  };
}

export default ProfileApi;
