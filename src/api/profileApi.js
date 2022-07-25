import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";
class ProfileApi extends Api {
  getProfile = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  getProfileByID = async (id, token) => {
    console.log(id);
    try {
      let res = await axios.post(
        `${API_BASE_URL}/profile/by_id`,
        {
          profile_id: id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log(res);
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  setProfile = async (data, token) => {
    try {
      let res = await axios.post(
        `${API_BASE_URL}/profile`,
        {
          user: data,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (res.status === 200) {
        return {
          success: true,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  getProfilePicture = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.status === 200) {
        return {
          success: true,
          image: res.data.IMAGE,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };

  uploadImage = async (data, token) => {
    try {
      console.log(token);
      let res = await axios.post(`${API_BASE_URL}/profile/upload`, data, {
        headers: { authorization: "Bearer " + token },
      });
      if (res.status === 200) {
        return {
          success: true,
          image: res.data.image,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
}

export default ProfileApi;
