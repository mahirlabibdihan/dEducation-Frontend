import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";
class CourseApi extends Api {
  getMyList = async (token) => {
    try {
      let result = await axios.get(`${API_BASE_URL}/courses/my_list`, {
        headers: { authorization: "Bearer " + token },
      });
      if (result.status === 200) {
        return {
          success: true,
          data: result.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  getClassOptions = async (coaching_id, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/courses/class_options`,
        {
          coaching_id: coaching_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (result.status === 200) {
        return {
          success: true,
          data: result.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  getSubjectOptions = async (coaching_id, class_name, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/courses/subject_options`,
        {
          coaching_id: coaching_id,
          class: class_name,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (result.status === 200) {
        return {
          success: true,
          data: result.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  getBatches = async (course_id, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/courses/batches`,
        {
          course_id: course_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (result.status === 200) {
        return {
          success: true,
          data: result.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  getBatchOptions = async (coaching_id, class_name, subject, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/courses/batch_options`,
        {
          coaching_id: coaching_id,
          class: class_name,
          subject: subject,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (result.status === 200) {
        return {
          success: true,
          data: result.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  getMyListAdmin = async (token) => {
    try {
      let result = await axios.get(`${API_BASE_URL}/courses/my_list_admin`, {
        headers: { authorization: "Bearer " + token },
      });
      if (result.status === 200) {
        return {
          success: true,
          data: result.data,
        };
      }
    } catch (err) {
      return {
        success: false,
      };
    }
  };
  create = async (data, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/courses/create`,
        {
          coaching_id: data.coaching,
          class: data.class,
          subject: data.subject,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      // console.log("GOT STUDENT: ", result.data);
      if (result.status === 200) {
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
  addBatch = async (course_id, batch, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/courses/add_batch`,
        {
          course_id: course_id,
          batch: batch,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      // console.log("GOT STUDENT: ", result.data);
      if (result.status === 200) {
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
  enroll = async (batch_id, token) => {
    try {
      let result = await axios.post(
        `${API_BASE_URL}/courses/enroll`,
        {
          batch_id: batch_id,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      // console.log("GOT STUDENT: ", result.data);
      if (result.status === 200) {
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
}

export default CourseApi;
