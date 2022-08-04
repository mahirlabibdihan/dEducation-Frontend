import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";
class TutorsApi extends Api {
  getTutorsList = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/tutors/list`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log("GOT TUTORS: ", res.data);
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
  getFilteredTutorsList = async (query, token) => {
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tutors/filtered_list`,
        {
          filter: query,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log("GOT TUTORS: ", res.data);
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
  getEducation = async (tutor_id, token) => {
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tutors/education`,
        {
          tutor_id: tutor_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log("GOT EDUCATIONS: ", res.data);
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
  getEducationsList = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/tutors/education_list`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log("GOT EDUCATIONS: ", res.data);
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
  getFilteredEducationsList = async (query, token) => {
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tutors/filtered_education_list`,
        {
          filter: query,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log("GOT EDUCATIONS: ", res.data);
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
  getMyTutorsList = async (token) => {
    try {
      let res = await axios.get(`${API_BASE_URL}/tutors/my_list`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log("GOT TUTORS: ", res.data);
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
  getApplicantsList = async (post_id, token) => {
    console.log("OFFER TUTION");
    try {
      let res = await axios.post(
        `${API_BASE_URL}/tutors/applicants_list`,
        {
          post_id: post_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
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
}

export default TutorsApi;
