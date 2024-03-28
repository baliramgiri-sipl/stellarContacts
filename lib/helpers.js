import axios from "axios"
import moment from "moment";
import { toast } from "react-toastify";

export const baseURL = "http://localhost:8000"

export const myAxios = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
})


myAxios.interceptors.response.use((response) => {
  if (response?.data?.token) {
    setCookie("access_token", response.data?.token); //58 minutes
    // delete response.data["aaccess_token"]
  }
  return response

}, function (error) {
  if (error.response?.data?.error === "Unauthorized Access") {
    window.location.href = "/unauthorized"
  }
  return Promise.reject(error.response?.data?.error || error.response?.data?.message || error.message, { type: "error" });
})




export function setCookie(name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}
// Function to get the value of a cookie by name
export function getCookie(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function setValues(setValue, values) {
  for (const key in values) {
    // console.log(values[key]);
    setValue(key, values[key]);
  }
}



//remove blank values
export async function removeEmptyValues(values) {
  if (Array.isArray(values)) {
    try {
      values?.map((ele) => {
        for (const key in ele) {
          if (ele[key] === "" || ele[key] === null || ele[key] === undefined) {
            delete ele[key];
          }
        }
      });
    } catch (error) {
      console.log(error)
    }
  } else {
    for (const key in values) {
      if (values[key] === "" || values[key] === null) {
        delete values[key];
      }
    }
  }
}


export function statusHandler() {
  try {
    return {
      onSuccess({ message }) {
        toast(message, { type: "success" })
      },
      onError(message) {
        // console.log(data)
        toast(message, { type: "error" })
      }
    }
  } catch (error) {
    console.log(error)
  }
}



export const momentTime = (createdAt) => {
  // Get the current date
  const currentDate = moment();
  // Get the date of the provided timestamp
  const createdAtDate = moment(createdAt);

  // Calculate the difference in days
  const daysDifference = currentDate.diff(createdAtDate, 'days');

  // Define the format string based on the age of the date
  let formatString = '';

  if (daysDifference === 0) {
    // Today
    formatString = 'h:mm A';
  } else if (daysDifference === 1) {
    // Yesterday
    formatString = '[Yesterday at] h:mm A';
  } else {
    // More than 1 day ago
    formatString = 'MMM D [at] h:mm A';
  }
  const formattedTime = createdAtDate.format(formatString);
  return formattedTime
}


export  function getSelectedTitle(title, query) {
  switch (title) {
    case "Trash":
      query += `&isSoftDeleted=true`
      break
    case "Junk":
      query += `&isJunk=true`
      break
    case "Archive":
      query += `&isArchive=true`
      break
    default:
      break
  }
  return query
}