import axios from "axios";
import Hospital from "../models/hospital.js";


/*
=========================================
GET LATITUDE & LONGITUDE
=========================================
*/

const getCoordinates = async (city) => {

  try {

    const response = await axios.get(

      "https://nominatim.openstreetmap.org/search",

      {

        params: {

          q: `${city}, India`,

          format: "json",

          limit: 1

        },

        headers: {

          "User-Agent": "MediPredictAI"

        },

        timeout: 15000

      }

    );

    if (

      !response.data ||

      response.data.length === 0

    ) {

      throw new Error("City not found.");

    }

    return {

      lat: Number(response.data[0].lat),

      lon: Number(response.data[0].lon)

    };

  }

  catch (error) {

    throw new Error("Unable to locate city.");

  }

};

/*
=========================================
CREATE GOOGLE MAP LINK
=========================================
*/

const createGoogleMap = (

  lat,

  lon

) => {

  return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

};

/*
=========================================
REMOVE DUPLICATE HOSPITALS
=========================================
*/

const removeDuplicates = (list) => {

  const map = new Map();

  list.forEach((item) => {

    const key = `${item.name}-${item.address}`;

    if (!map.has(key)) {

      map.set(key, item);

    }

  });

  return [...map.values()];

};

/*
=========================================
RECOMMEND DOCTORS
=========================================
*/

export const recommendDoctors = async (

  req,

  res

) => {

  try {

    const {

      specialist,

      city

    } = req.query;

    const hospitals = await Hospital.find({

  $or: [

    {

      city: {

        $regex: city,

        $options: "i"

      }

    },

    {

      district: {

        $regex: city,

        $options: "i"

      }

    }

  ]

}).limit(20);

    if (!city || city.trim() === "") {

      return res.status(400).json({

        success: false,

        message: "City is required."

      });

    }

    const {

      lat,

      lon

    } = await getCoordinates(city);

    const overpassQuery = `
[out:json][timeout:25];

(
node["amenity"="hospital"](around:15000,${lat},${lon});
way["amenity"="hospital"](around:15000,${lat},${lon});
relation["amenity"="hospital"](around:15000,${lat},${lon});

node["healthcare"="doctor"](around:15000,${lat},${lon});
way["healthcare"="doctor"](around:15000,${lat},${lon});
relation["healthcare"="doctor"](around:15000,${lat},${lon});
);

out center tags;
`;

    const doctors = hospitals.map((hospital) => ({

  id: hospital._id,

  name: hospital.hospitalName,

  specialization: specialist || "General Physician",

  hospital: hospital.hospitalName,

  address: hospital.address,

  phone:
  hospital.phone &&
  hospital.phone !== "0"
    ? hospital.phone
    : hospital.mobile &&
      hospital.mobile !== "0"
    ? hospital.mobile
    : "",

website:
  hospital.website &&
  hospital.website !== "0"
    ? hospital.website
    : "",

  rating: 4.5,

  status: "Open",

  map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    hospital.hospitalName + " " + city
  )}`

}));

const uniqueDoctors = removeDuplicates(doctors);

return res.status(200).json({

  success: true,

  total: uniqueDoctors.length,

  doctors: uniqueDoctors

});

}

catch (error) {

  console.error(

    "Doctor API Error:",

    error.response?.data ||

    error.message

  );

  return res.status(500).json({

    success: false,

    doctors: [],

    message: "Unable to fetch nearby doctors."

  });

}

};

/*
=========================================
GET SINGLE DOCTOR
=========================================
*/

export const getDoctorById = async (

  req,

  res

) => {

  try {

    const {

      id

    } = req.params;

        return res.status(200).json({

      success: true,

      doctor: {

        id,

        name: "Doctor Details",

        specialization: "General Physician",

        hospital: "Hospital Information",

        address: "Address will be available in the next update.",

        phone: "Not Available",

        website: "",

        rating: "4.5",

        status: "Open",

        message:
          "Detailed doctor profile feature will be added in the next update."

      }

    });

  }

  catch (error) {

    console.error(

      "Doctor Details Error:",

      error.message

    );

    return res.status(500).json({

      success: false,

      message: "Unable to fetch doctor details."

    });

  }

}; 