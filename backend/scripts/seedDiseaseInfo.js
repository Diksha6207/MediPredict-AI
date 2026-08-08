import dotenv from "dotenv";
import mongoose from "mongoose";
import DiseaseInfo from "../models/DiseaseInfo.js";

dotenv.config();

const diseaseData = [

  {
    disease: "acute bronchitis",
    description:
      "Acute bronchitis is a temporary inflammation of the airways, usually caused by an infection. It can cause cough, fever, tiredness and discomfort.",
    symptoms: [
      "Fever",
      "Headache",
      "Cough",
      "Fatigue",
      "Breathing discomfort"
    ],
    medications: [
      "Do not take antibiotics unless prescribed by a doctor.",
      "Use medicines recommended by a qualified doctor for fever or cough."
    ],
    precautions: [
      "Consult a qualified doctor if symptoms become severe.",
      "Stay hydrated.",
      "Take adequate rest.",
      "Avoid smoking and second-hand smoke."
    ],
    diets: [
      "Drink plenty of water and warm fluids.",
      "Eat fruits and vegetables.",
      "Prefer light and nutritious meals.",
      "Avoid smoking and excessive alcohol."
    ],
    workouts: [
      "Take adequate rest during fever.",
      "Light walking may be considered after symptoms improve.",
      "Avoid strenuous exercise while unwell."
    ],
    specialist: "General Physician",
    severity: "Medium"
  },

  {
    disease: "strep throat",
    description:
      "Strep throat is a bacterial infection of the throat that may cause fever, headache, sore throat and difficulty swallowing.",
    symptoms: [
      "Fever",
      "Headache",
      "Sore throat",
      "Difficulty swallowing"
    ],
    medications: [
      "Consult a doctor for appropriate treatment.",
      "Antibiotics should only be taken when prescribed by a qualified doctor."
    ],
    precautions: [
      "Consult a qualified doctor.",
      "Stay hydrated.",
      "Avoid sharing utensils and personal items.",
      "Take adequate rest."
    ],
    diets: [
      "Drink warm fluids.",
      "Eat soft foods that are easy to swallow.",
      "Include fruits and vegetables.",
      "Drink enough water."
    ],
    workouts: [
      "Take adequate rest.",
      "Avoid strenuous exercise while fever or throat symptoms are present.",
      "Resume light activity after recovery."
    ],
    specialist: "General Physician",
    severity: "Medium"
  },

  {
    disease: "nose disorder",
    description:
      "Nose disorders can involve congestion, irritation, inflammation or other nasal symptoms. The underlying cause should be evaluated by a healthcare professional.",
    symptoms: [
      "Fever",
      "Headache",
      "Nasal congestion",
      "Nasal discomfort"
    ],
    medications: [
      "Consult a doctor before taking medication.",
      "Use only medicines recommended by a qualified healthcare professional."
    ],
    precautions: [
      "Consult a qualified doctor if symptoms persist.",
      "Stay hydrated.",
      "Avoid known allergens and irritants.",
      "Take adequate rest."
    ],
    diets: [
      "Drink enough water.",
      "Eat fresh fruits and vegetables.",
      "Maintain a balanced diet.",
      "Prefer warm fluids if they provide comfort."
    ],
    workouts: [
      "Take adequate rest during fever.",
      "Light activity can be resumed when symptoms improve.",
      "Avoid strenuous exercise while unwell."
    ],
    specialist: "ENT Specialist",
    severity: "Low"
  },

  {
    disease: "infectious gastroenteritis",
    description:
      "Infectious gastroenteritis is an infection affecting the stomach and intestines. It may cause fever, headache, vomiting, diarrhea and abdominal discomfort.",
    symptoms: [
      "Fever",
      "Headache",
      "Diarrhea",
      "Vomiting",
      "Abdominal discomfort"
    ],
    medications: [
      "Consult a doctor before taking medication.",
      "Oral rehydration solutions may be recommended by a healthcare professional."
    ],
    precautions: [
      "Stay well hydrated.",
      "Wash hands frequently.",
      "Avoid contaminated food and water.",
      "Consult a doctor if symptoms become severe."
    ],
    diets: [
      "Drink water and oral rehydration fluids.",
      "Eat light and easily digestible foods.",
      "Eat small meals.",
      "Avoid very oily and spicy foods."
    ],
    workouts: [
      "Take adequate rest.",
      "Avoid strenuous exercise.",
      "Resume physical activity gradually after recovery."
    ],
    specialist: "Gastroenterologist",
    severity: "Medium"
  },

  {
    disease: "noninfectious gastroenteritis",
    description:
      "Noninfectious gastroenteritis involves inflammation or irritation of the stomach and intestines that is not caused by an infection.",
    symptoms: [
      "Fever",
      "Headache",
      "Abdominal discomfort",
      "Diarrhea",
      "Nausea"
    ],
    medications: [
      "Consult a qualified doctor before taking medication.",
      "Treatment depends on the underlying cause."
    ],
    precautions: [
      "Stay hydrated.",
      "Avoid foods that trigger your symptoms.",
      "Take adequate rest.",
      "Consult a doctor if symptoms persist."
    ],
    diets: [
      "Eat light and balanced meals.",
      "Drink enough water.",
      "Prefer easily digestible foods.",
      "Avoid excessive spicy and oily foods."
    ],
    workouts: [
      "Take adequate rest.",
      "Avoid strenuous exercise during active symptoms.",
      "Resume light activity gradually."
    ],
    specialist: "Gastroenterologist",
    severity: "Medium"
  },

  {
    disease: "common cold",
    description:
      "The common cold is a viral infection of the upper respiratory tract. Common symptoms include cough, runny nose, congestion, headache and sometimes fever.",
    symptoms: [
      "Fever",
      "Headache",
      "Cough",
      "Nasal congestion",
      "Sore throat"
    ],
    medications: [
      "Consult a qualified doctor before taking medication.",
      "Use only medicines recommended by a healthcare professional."
    ],
    precautions: [
      "Get adequate rest.",
      "Stay hydrated.",
      "Wash your hands regularly.",
      "Avoid close contact with people when symptoms are active."
    ],
    diets: [
      "Drink plenty of warm fluids.",
      "Eat fruits and vegetables.",
      "Maintain a balanced diet.",
      "Drink enough water."
    ],
    workouts: [
      "Take adequate rest.",
      "Light activity may be resumed when you feel better.",
      "Avoid strenuous exercise during fever."
    ],
    specialist: "General Physician",
    severity: "Low"
  }

];

const seedDatabase = async () => {

  try {

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");

    console.log("================================");

    for (const data of diseaseData) {

      await DiseaseInfo.findOneAndUpdate(

        {
          disease: data.disease
        },

        data,

        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true
        }

      );

      console.log(`✅ ${data.disease}`);

    }

    console.log("================================");

    console.log(
      `✅ Disease Information Imported: ${diseaseData.length}`
    );

    console.log("================================");

    process.exit(0);

  }

  catch (error) {

    console.error(
      "❌ Seed Error:",
      error.message
    );

    process.exit(1);

  }

};

seedDatabase();