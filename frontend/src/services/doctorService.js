import API from "./api";

/*
===========================================
GET DOCTOR RECOMMENDATIONS
===========================================
*/

export const getDoctors = async (

  specialist,

  city

) => {

  try {

    const response = await API.get(

      "/doctor/recommend",

      {

        params: {

          specialist,

          city

        }

      }

    );

    return response.data;

  }

  catch (error) {

    console.error(

      "Doctor Service Error:",

      error.response?.data ||

      error.message

    );

    return {

      success: false,

      doctors: [],

      message:

        error.response?.data?.message ||

        "Unable to fetch nearby doctors."

    };

  }

};

/*
===========================================
GET SINGLE DOCTOR
===========================================
*/

export const getDoctorById = async (

  id

) => {

  try {

    const response = await API.get(

      `/doctor/${id}`

    );

    return response.data;

  }

  catch (error) {

    return {

      success: false,

      message:

        error.response?.data?.message ||

        "Doctor not found."

    };

  }

};