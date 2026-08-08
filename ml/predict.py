import os
from functools import lru_cache

import joblib
import pandas as pd


# ======================================
# BASE DIRECTORY
# ======================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)


# ======================================
# FILE PATHS
# ======================================

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "disease_model.pkl"
)

ENCODER_PATH = os.path.join(
    BASE_DIR,
    "model",
    "label_encoder.pkl"
)

SYMPTOM_COLUMNS_PATH = os.path.join(
    BASE_DIR,
    "model",
    "symptom_columns.pkl"
)

RICH_DATASET_PATH = os.path.join(
    BASE_DIR,
    "..",
    "backend",
    "datasets",
    "Diseases_and_Symptoms_dataset.csv"
)

DESCRIPTION_PATH = os.path.join(
    BASE_DIR,
    "dataset",
    "symptom_Description.csv"
)

PRECAUTION_PATH = os.path.join(
    BASE_DIR,
    "dataset",
    "symptom_precaution.csv"
)


# ======================================
# LAZY LOAD ML MODEL
# ======================================

_model = None
_encoder = None
_symptom_columns = None


def load_ml_resources():

    global _model
    global _encoder
    global _symptom_columns

    if _model is None:

        _model = joblib.load(
            MODEL_PATH
        )

    if _encoder is None:

        _encoder = joblib.load(
            ENCODER_PATH
        )

    if _symptom_columns is None:

        _symptom_columns = joblib.load(
            SYMPTOM_COLUMNS_PATH
        )

        print(
            "Total symptom columns:",
            len(_symptom_columns)
        )

    return (
        _model,
        _encoder,
        _symptom_columns
    )


# ======================================
# LOAD SMALL INFORMATION DATASETS
# ======================================

description_df = pd.read_csv(
    DESCRIPTION_PATH
)

description_df["Disease"] = (
    description_df["Disease"]
    .astype(str)
    .str.strip()
)


precaution_df = pd.read_csv(
    PRECAUTION_PATH
)

precaution_df["Disease"] = (
    precaution_df["Disease"]
    .astype(str)
    .str.strip()
)


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
# RICH DATASET COLUMN CACHE
# ======================================

_rich_columns = None


def get_rich_dataset_columns():

    global _rich_columns

    if _rich_columns is not None:
        return _rich_columns

    # Only read CSV header.
    # This does NOT load the complete dataset into RAM.
    header_df = pd.read_csv(
        RICH_DATASET_PATH,
        nrows=0
    )

    original_columns = (
        header_df.columns
        .astype(str)
        .tolist()
    )

    normalized_map = {}

    for column in original_columns:

        normalized_map[
            normalize_symptom(column)
        ] = column

    _rich_columns = {
        "original": original_columns,
        "normalized": normalized_map
    }

    return _rich_columns


# ======================================
# DESCRIPTION
# ======================================

def get_description(disease):

    row = description_df[
        description_df["Disease"].str.lower()
        == str(disease).lower()
    ]

    if row.empty:

        return (
            "Description not available."
        )

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

        value = row.iloc[0][
            column_name
        ]

        if pd.notna(value):

            value = str(
                value
            ).strip()

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

    disease = str(
        disease
    ).strip()

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

    disease = str(
        disease
    ).strip()

    if disease in HIGH_SEVERITY:
        return "High"

    if disease in MEDIUM_SEVERITY:
        return "Medium"

    return "Low"


# ======================================
# CREATE ML INPUT
# ======================================

def create_input_dataframe(
    selected_symptoms
):

    (
        model,
        encoder,
        symptom_columns
    ) = load_ml_resources()

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
# MEMORY OPTIMIZED
# ======================================

def get_dataset_predictions(
    selected_symptoms
):

    normalized_selected = {

        normalize_symptom(symptom)

        for symptom in selected_symptoms
    }

    dataset_columns = (
        get_rich_dataset_columns()
    )

    normalized_map = (
        dataset_columns["normalized"]
    )

    # Find actual CSV column names
    matched_columns = []

    for normalized_symptom in (
        normalized_selected
    ):

        if normalized_symptom in normalized_map:

            matched_columns.append(
                normalized_map[
                    normalized_symptom
                ]
            )

    if not matched_columns:
        return []


    # ==================================
    # READ ONLY REQUIRED COLUMNS
    # ==================================

    use_columns = [
        "diseases"
    ]

    for column in matched_columns:

        if column not in use_columns:

            use_columns.append(
                column
            )


    # ==================================
    # AGGREGATE WITHOUT LOADING
    # COMPLETE CSV INTO RAM
    # ==================================

    disease_sum = {}
    disease_max = {}
    disease_count = {}

    total_matching_rows = 0


    # Small chunks keep RAM usage low.
    for chunk in pd.read_csv(
        RICH_DATASET_PATH,
        usecols=use_columns,
        chunksize=1000,
        low_memory=False
    ):

        # Convert symptom columns to 0/1
        score_series = pd.Series(
            0,
            index=chunk.index,
            dtype="int64"
        )

        for column in matched_columns:

            values = (
                chunk[column]
                .astype(str)
                .str.strip()
                .str.lower()
            )

            score_series = (
                score_series
                + values.isin(
                    [
                        "yes",
                        "1",
                        "true",
                        "present"
                    ]
                ).astype("int64")
            )


        # Keep rows having at least
        # one selected symptom.
        matching_mask = (
            score_series > 0
        )

        if not matching_mask.any():
            continue


        matching_chunk = (
            chunk.loc[
                matching_mask,
                ["diseases"]
            ].copy()
        )

        matching_scores = (
            score_series[
                matching_mask
            ]
        )


        matching_chunk[
            "_match_score"
        ] = matching_scores.values


        total_matching_rows += (
            len(matching_chunk)
        )


        # ==================================
        # AGGREGATE DISEASE SCORES
        # ==================================

        for disease, group in (
            matching_chunk
            .groupby("diseases")
        ):

            disease = str(
                disease
            ).strip()

            scores = (
                group["_match_score"]
            )

            current_sum = (
                disease_sum.get(
                    disease,
                    0
                )
            )

            current_max = (
                disease_max.get(
                    disease,
                    0
                )
            )

            current_count = (
                disease_count.get(
                    disease,
                    0
                )
            )

            disease_sum[disease] = (
                current_sum
                + float(scores.sum())
            )

            disease_max[disease] = max(
                current_max,
                float(scores.max())
            )

            disease_count[disease] = (
                current_count
                + int(scores.count())
            )


    if not disease_sum:
        return []


    # ==================================
    # DISEASE RANKING
    # ==================================

    total_selected = len(
        matched_columns
    )

    disease_scores = []


    for disease in disease_sum:

        total_sum = (
            disease_sum[disease]
        )

        count = (
            disease_count[disease]
        )

        maximum = (
            disease_max[disease]
        )

        mean_value = (
            total_sum / count
        )


        # Same weighting as old version
        score = (

            (
                mean_value
                / total_selected
            )
            * 0.60

            +

            (
                maximum
                / total_selected
            )
            * 0.25

            +

            (
                count
                / total_matching_rows
            )
            * 0.15

        )


        disease_scores.append({

            "disease": disease,

            "score": score

        })


    # Highest score first
    disease_scores.sort(
        key=lambda item:
            item["score"],
        reverse=True
    )


    # Keep top 3
    disease_scores = (
        disease_scores[:3]
    )


    # ==================================
    # CONVERT TO CONFIDENCE %
    # ==================================

    total_score = sum(
        item["score"]
        for item in disease_scores
    )


    predictions = []


    for item in disease_scores:

        if total_score > 0:

            confidence = (
                item["score"]
                / total_score
            ) * 100

        else:

            confidence = 0


        predictions.append({

            "disease":
                item["disease"],

            "confidence":
                round(
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

    (
        model,
        encoder,
        symptom_columns
    ) = load_ml_resources()


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

            for item
            in ml_predictions[:3]

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

        "disease":
            disease,

        "confidence":
            round(
                float(confidence),
                2
            ),

        "severity":
            severity,

        "specialist":
            specialist,

        "description":
            description,

        "precautions":
            precautions,

        "top_predictions":
            top_predictions,

        "medicines": [],

        "diet": [],

        "exercises": []

    }