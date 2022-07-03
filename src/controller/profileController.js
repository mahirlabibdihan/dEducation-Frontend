import Cookies from "universal-cookie";
import ProfileApi from "../api/profileApi";
import Controller from "./base";

class ProfileController extends Controller {
  profileApi = new ProfileApi();
  cookies = new Cookies();
  getProfile = async () => {
    const token = this.cookies.get("token");
    const result = await this.profileApi.getProfile(token);
    // console.log(data);
    return result.data;
  };
  setProfile = async (data) => {
    const token = this.cookies.get("token");
    await this.profileApi.setProfile(data, token);
  };
  getProfilePicture = async () => {
    const token = this.cookies.get("token");
    const data = await this.profileApi.getProfilePicture(token);
    console.log(data);
    if (data.success === true) {
      //   setType(data.type);
      //   console.log(type);
      return data;
    } else {
    }
  };
  uploadImage = async (formData) => {
    const token = this.cookies.get("token");
    console.log(token);
    const result = await this.profileApi.uploadImage(formData, token);
    return result;
  };
}
export default ProfileController;
