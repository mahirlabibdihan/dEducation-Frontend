import Cookies from "universal-cookie";
import ProfileApi from "../api/profileApi";
import Controller from "./base";
import AuthController from "./authController";
import { showToast } from "../App";
const authController = new AuthController();

class ProfileController extends Controller {
  profileApi = new ProfileApi();
  getProfile = async () => {
    const result = await this.profileApi.getProfile();
    if (!result.success) authController.logout();
    return result;
  };
  getEducation = async () => {
    const result = await this.profileApi.getEducation();
    return result;
  };
  setEducation = async (list) => {
    const result = await this.profileApi.setEducation(list);
    this.showMessage("Education updated", result);
    return result;
  };
  setProfile = async (data) => {
    const result = await this.profileApi.setProfile(data);
    this.showMessage("Profile updated", result);
    return result;
  };
  getProfilePicture = async () => {
    const result = await this.profileApi.getProfilePicture();
    return {
      success: true,
      image: result.data.IMAGE,
    };
  };
  uploadImage = async (formData) => {
    const result = await this.profileApi.uploadImage(formData);
    this.showMessage("Image changed", result);
    return result;
  };
}
export default ProfileController;
