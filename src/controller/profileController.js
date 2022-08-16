import Cookies from "universal-cookie";
import ProfileApi from "../api/profileApi";
import Controller from "./base";
import AuthController from "./authController";
import { showToast } from "../App";
const authController = new AuthController();

class ProfileController extends Controller {
  profileApi = new ProfileApi();
  getProfile = async () => {
    const res = await this.profileApi.getProfile();
    if (!res.success) authController.logout();
    return res;
  };
  getEducation = async () => {
    const res = await this.profileApi.getEducation();
    return res;
  };
  getNotifications = async () => {
    const res = await this.profileApi.getNotifications();
    return res;
  };
  isNotificationAvailable = async () => {
    const res = await this.profileApi.isNotificationAvailable();
    return res;
  };
  seenNotifications = async () => {
    const res = await this.profileApi.seenNotifications();
    return res;
  };
  setEducation = async (list) => {
    const res = await this.profileApi.setEducation(list);
    this.showMessage("Education updated", res);
    return res;
  };
  setProfile = async (data) => {
    const res = await this.profileApi.setProfile(data);
    this.showMessage("Profile updated", res);
    return res;
  };
  getProfilePicture = async () => {
    const res = await this.profileApi.getProfilePicture();
    return {
      success: true,
      image: res.data.IMAGE,
    };
  };
  uploadImage = async (formData) => {
    const res = await this.profileApi.uploadImage(formData);
    this.showMessage("Image changed", res);
    return res;
  };
}
export default ProfileController;
