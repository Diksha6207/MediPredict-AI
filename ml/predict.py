import joblib
import pandas as pd


# ======================================
# LOAD MODEL
# ======================================

model = joblib.load(
    "model/disease_model.pkl"
)

encoder = joblib.load(
    "model/label_encoder.pkl"
)


# ======================================
# LOAD SYMPTOM COLUMNS
# ======================================

symptom_columns = joblib.load(
    "model/symptom_columns.pkl"
)

print(
    "Total symptom columns:",
    len(symptom_columns)
)


# ======================================
# LOAD RICH SYMPTOM DATASET
# ======================================

RICH_DATASET_PATH = (
    "../backend/datasets/"
    "Diseases_and_Symptoms_dataset.csv"
)

rich_df = pd.read_csv(
    RICH_DATASET_PATH,
    low_memory=False
)

rich_df.columns = (
    rich_df.columns
    .astype(str)
    .str.strip()
    .str.lower()
)


# ======================================
# PREPARE RICH DATASET
# ======================================

def convert_value(value):

    if pd.isna(value):
        return 0

    value = (
        str(value)
        .strip()
        .lower()
    )

    if value in [
        "yes",
        "1",
        "true",
        "present"
    ]:
        return 1

    return 0


rich_symptom_columns = [
    column
    for column in rich_df.columns
    if column != "diseases"
]


for column in rich_symptom_columns:

    rich_df[column] = rich_df[column].map(
        convert_value
    )


rich_df["diseases"] = (
    rich_df["diseases"]
    .astype(str)
    .str.strip()
)


# ======================================
# LOAD DESCRIPTION DATA
# ======================================

description_df = pd.read_csv(
    "dataset/symptom_Description.csv"
)

description_df["Disease"] = (
    description_df["Disease"]
    .astype(str)
    .str.strip()
)


# ======================================
# LOAD PRECAUTION DATA
# ======================================

precaution_df = pd.read_csv(
    "dataset/symptom_precaution.csv"
)

precaution_df["Disease"] = (
    precaution_df["Disease"]
    .astype(str)
    .str.strip()
)


# ======================================
# DESCRIPTION
# ======================================

def get_description(disease):

    row = description_df[
        description_df["Disease"].str.lower()
        == str(disease).lower()
    ]

    if row.empty:
        return "Description not available."

    return str(
        row.iloc[0]["Description"]
    )


# ======================================
# PRECAUTIONS
# ======================================

def get_precautions(disease):

    row = precaution_df[
        precaution_df["Disease"].str.lower()
        == str(disease).lower()
    ]

    if row.empty:
        return []

    precautions = []

    for i in range(1, 5):

        column_name = (
            f"Precaution_{i}"
        )

        if column_name not in row.columns:
            continue

        value = row.iloc[0][column_name]

        if pd.notna(value):

            value = str(value).strip()

            if value:
                precautions.append(
                    value
                )

    return precautions


# ======================================
# SPECIALIST
# ======================================

SPECIALIST_MAP = {

    "Fungal infection":
        "Dermatologist",

    "Allergy":
        "Dermatologist",

    "Drug Reaction":
        "Dermatologist",

    "Psoriasis":
        "Dermatologist",

    "Acne":
        "Dermatologist",

    "Impetigo":
        "Dermatologist",

    "Common Cold":
        "General Physician",

    "Gastroenteritis":
        "General Physician",

    "Typhoid":
        "General Physician",

    "Dengue":
        "General Physician",

    "Malaria":
        "General Physician",

    "Heart attack":
        "Cardiologist",

    "Hypertension":
        "Cardiologist",

    "Migraine":
        "Neurologist",

    "(vertigo) Paroymsal  Positional Vertigo":
        "Neurologist",

    "Paralysis (brain hemorrhage)":
        "Neurologist",

    "Arthritis":
        "Orthopedic",

    "Osteoarthristis":
        "Orthopedic",

    "Cervical spondylosis":
        "Orthopedic",

    "Bronchial Asthma":
        "Pulmonologist",

    "Pneumonia":
        "Pulmonologist",

    "Tuberculosis":
        "Pulmonologist",

    "Hepatitis A":
        "Hepatologist",

    "Hepatitis B":
        "Hepatologist",

    "Hepatitis C":
        "Hepatologist",

    "Hepatitis D":
        "Hepatologist",

    "Hepatitis E":
        "Hepatologist",

    "Alcoholic hepatitis":
        "Hepatologist",

    "Jaundice":
        "Hepatologist",

    "GERD":
        "Gastroenterologist",

    "Peptic ulcer diseae":
        "Gastroenterologist",

    "Chronic cholestasis":
        "Gastroenterologist",

    "Diabetes":
        "Endocrinologist",

    "Hypoglycemia":
        "Endocrinologist",

    "Hypothyroidism":
        "Endocrinologist",

    "Hyperthyroidism":
        "Endocrinologist",

    "Urinary tract infection":
        "Urologist",

    "AIDS":
        "Infectious Disease Specialist",

    "Varicose veins":
        "Vascular Surgeon"
}


def get_specialist(disease):

    disease = str(disease).strip()

    for key, value in SPECIALIST_MAP.items():

        if key.lower() == disease.lower():
            return value

    return "General Physician"


# ======================================
# SEVERITY
# ======================================

HIGH_SEVERITY = {

    "Heart attack",
    "Tuberculosis",
    "Pneumonia",
    "Malaria",
    "Dengue",
    "Typhoid",
    "AIDS",
    "Hepatitis A",
    "Hepatitis B",
    "Hepatitis C",
    "Hepatitis D",
    "Hepatitis E"
}


MEDIUM_SEVERITY = {

    "Diabetes",
    "GERD",
    "Migraine",
    "Hypertension",
    "Bronchial Asthma",
    "Hypothyroidism",
    "Hyperthyroidism",
    "Psoriasis",
    "Arthritis",
    "Osteoarthristis",
    "Cervical spondylosis"
}


def get_severity(disease):

    disease = str(disease).strip()

    if disease in HIGH_SEVERITY:
        return "High"

    if disease in MEDIUM_SEVERITY:
        return "Medium"

    return "Low"


# ======================================
# NORMALIZE SYMPTOM
# ======================================

def normalize_symptom(symptom):

    return (
        str(symptom)
        .strip()
        .lower()
        .replace("-", " ")
        .replace("_", " ")
    )


# ======================================
# CREATE ML INPUT
# ======================================

def create_input_dataframe(
    selected_symptoms
):

    input_data = {
        column: 0
        for column in symptom_columns
    }

    normalized_selected = {

        normalize_symptom(symptom)

        for symptom in selected_symptoms
    }

    matched_symptoms = []

    for column in symptom_columns:

        normalized_column = (
            normalize_symptom(column)
        )

        if (
            normalized_column
            in normalized_selected
        ):

            input_data[column] = 1

            matched_symptoms.append(
                column
            )

    input_df = pd.DataFrame(
        [input_data],
        columns=symptom_columns
    )

    return (
        input_df,
        matched_symptoms
    )


# ======================================
# DATASET PATTERN MATCHING
# ======================================

def get_dataset_predictions(
    selected_symptoms
):

    normalized_selected = {

        normalize_symptom(symptom)

        for symptom in selected_symptoms
    }

    matched_columns = []

    for column in rich_symptom_columns:

        normalized_column = (
            normalize_symptom(column)
        )

        if (
            normalized_column
            in normalized_selected
        ):

            matched_columns.append(
                column
            )

    if not matched_columns:
        return []


    # ----------------------------------
    # Count how many selected symptoms
    # each record contains
    # ----------------------------------

    symptom_score = (
        rich_df[matched_columns]
        .sum(axis=1)
    )


    # Keep records having at least
    # one selected symptom
    matching_df = rich_df[
        symptom_score > 0
    ].copy()


    if matching_df.empty:
        return []


    matching_df["_match_score"] = (
        symptom_score[
            matching_df.index
        ]
    )


    # ----------------------------------
    # Disease ranking
    # ----------------------------------

    disease_scores = (
        matching_df
        .groupby("diseases")[
            "_match_score"
        ]
        .agg(
            [
                "mean",
                "max",
                "count"
            ]
        )
    )


    # ----------------------------------
    # Weighted score
    # ----------------------------------

    total_selected = len(
        matched_columns
    )

    disease_scores[
        "score"
    ] = (

        (
            disease_scores["mean"]
            / total_selected
        )
        * 0.60

        +

        (
            disease_scores["max"]
            / total_selected
        )
        * 0.25

        +

        (
            disease_scores["count"]
            / len(matching_df)
        )
        * 0.15

    )


    disease_scores = (
        disease_scores
        .sort_values(
            "score",
            ascending=False
        )
        .head(3)
    )


    # ----------------------------------
    # Convert scores to percentages
    # ----------------------------------

    total_score = (
        disease_scores["score"]
        .sum()
    )

    predictions = []

    for disease, row in (
        disease_scores.iterrows()
    ):

        if total_score > 0:

            confidence = (
                row["score"]
                / total_score
            ) * 100

        else:

            confidence = 0


        predictions.append({

            "disease": disease,

            "confidence": round(
                float(confidence),
                2
            )

        })


    return predictions


# ======================================
# MAIN PREDICTION
# ======================================

def predict_disease(
    selected_symptoms
):

    if not selected_symptoms:

        return {

            "disease":
                "Insufficient Symptoms",

            "confidence": 0,

            "severity": "Low",

            "specialist":
                "General Physician",

            "description":
                "Please select at least one symptom.",

            "precautions": [
                "Select at least one symptom.",
                "Consult a qualified doctor."
            ],

            "top_predictions": [],

            "medicines": [],

            "diet": [],

            "exercises": []
        }


    # ==================================
    # DATASET PATTERN PREDICTION
    # ==================================

    dataset_predictions = (
        get_dataset_predictions(
            selected_symptoms
        )
    )


    # ==================================
    # ML PREDICTION
    # ==================================

    input_df, matched_symptoms = (
        create_input_dataframe(
            selected_symptoms
        )
    )


    ml_predictions = []

    if matched_symptoms:

        probabilities = (
            model.predict_proba(
                input_df
            )[0]
        )

        indices = (
            probabilities
            .argsort()[-5:][::-1]
        )

        for index in indices:

            ml_predictions.append({

                "disease":
                    encoder.inverse_transform(
                        [index]
                    )[0],

                "confidence":
                    float(
                        probabilities[index]
                    ) * 100

            })


    # ==================================
    # USE DATASET PATTERN AS PRIMARY
    # ==================================

    if dataset_predictions:

        top_prediction = (
            dataset_predictions[0]
        )

        disease = (
            top_prediction["disease"]
        )

        confidence = (
            top_prediction["confidence"]
        )

        top_predictions = (
            dataset_predictions
        )

    elif ml_predictions:

        top_prediction = (
            ml_predictions[0]
        )

        disease = (
            top_prediction["disease"]
        )

        confidence = round(
            top_prediction["confidence"],
            2
        )

        top_predictions = [

            {
                "disease":
                    item["disease"],

                "confidence":
                    round(
                        item["confidence"],
                        2
                    )
            }

            for item in ml_predictions[:3]
        ]

    else:

        return {

            "disease":
                "Insufficient Symptoms",

            "confidence": 0,

            "severity": "Low",

            "specialist":
                "General Physician",

            "description":
                "The selected symptoms could not be matched with the available dataset.",

            "precautions": [
                "Please select valid symptoms.",
                "Consult a qualified doctor."
            ],

            "top_predictions": [],

            "medicines": [],

            "diet": [],

            "exercises": []
        }


    # ==================================
    # INFORMATION
    # ==================================

    description = (
        get_description(
            disease
        )
    )

    precautions = (
        get_precautions(
            disease
        )
    )

    specialist = (
        get_specialist(
            disease
        )
    )

    severity = (
        get_severity(
            disease
        )
    )


    # ==================================
    # DEFAULT PRECAUTIONS
    # ==================================

    if not precautions:

        precautions = [

            "Consult a qualified doctor.",

            "Monitor your symptoms.",

            "Stay hydrated.",

            "Take proper rest."
        ]


    # ==================================
    # RETURN RESULT
    # ==================================

    return {

        "disease": disease,

        "confidence": round(
            float(confidence),
            2
        ),

        "severity": severity,

        "specialist": specialist,

        "description": description,

        "precautions": precautions,

        "top_predictions":
            top_predictions,

        "medicines": [],

        "diet": [],

        "exercises": []
    }