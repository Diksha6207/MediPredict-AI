import os
import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score


# ==========================================
# PATHS
# ==========================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

DATASET_PATH = os.path.join(
    BASE_DIR,
    "..",
    "backend",
    "datasets",
    "Diseases_and_Symptoms_dataset.csv"
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "model"
)

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)


# ==========================================
# LOAD DATASET
# ==========================================

print("=" * 60)
print("Loading Diseases & Symptoms Dataset...")
print("=" * 60)

df = pd.read_csv(
    DATASET_PATH,
    low_memory=False
)

print(
    "Original Records :",
    len(df)
)

print(
    "Original Columns :",
    len(df.columns)
)


# ==========================================
# CLEAN COLUMN NAMES
# ==========================================

df.columns = (
    df.columns
    .astype(str)
    .str.strip()
    .str.lower()
)


# ==========================================
# TARGET COLUMN
# ==========================================

TARGET_COLUMN = "diseases"

if TARGET_COLUMN not in df.columns:

    raise ValueError(
        "Target column 'diseases' not found."
    )


# ==========================================
# REMOVE EMPTY ROWS
# ==========================================

df = df.dropna(
    subset=[TARGET_COLUMN]
)

df[TARGET_COLUMN] = (
    df[TARGET_COLUMN]
    .astype(str)
    .str.strip()
)


# ==========================================
# REMOVE DUPLICATE ROWS
# ==========================================

df = df.drop_duplicates()

print(
    "Clean Records :",
    len(df)
)


# ==========================================
# FEATURES
# ==========================================

X = df.drop(
    TARGET_COLUMN,
    axis=1
)

y = df[TARGET_COLUMN]


# ==========================================
# NORMALIZE SYMPTOM VALUES
# ==========================================

print(
    "Converting symptoms..."
)


def convert_symptom(value):

    if pd.isna(value):
        return 0

    value = str(value).strip().lower()

    if value in [
        "yes",
        "1",
        "true",
        "present"
    ]:
        return 1

    if value in [
        "no",
        "0",
        "false",
        "absent",
        "",
        "nan"
    ]:
        return 0

    # Handle numeric values
    try:

        number = float(value)

        if number > 0:
            return 1

        return 0

    except:

        return 0


X = X.map(
    convert_symptom
)


# ==========================================
# REMOVE CONSTANT COLUMNS
# ==========================================

constant_columns = []

for column in X.columns:

    if X[column].nunique() <= 1:

        constant_columns.append(
            column
        )


if constant_columns:

    X = X.drop(
        columns=constant_columns
    )

    print(
        "Removed constant columns:",
        len(constant_columns)
    )


# ==========================================
# LABEL ENCODING
# ==========================================

encoder = LabelEncoder()

y_encoded = encoder.fit_transform(
    y
)


print(
    "Total Diseases :",
    len(
        encoder.classes_
    )
)

print(
    "Total Symptoms :",
    len(X.columns)
)


# ==========================================
# TRAIN TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(

    X,

    y_encoded,

    test_size=0.20,

    random_state=42,

    stratify=y_encoded

)


# ==========================================
# SAVE SYMPTOM COLUMNS
# ==========================================

symptom_columns = X.columns.tolist()

joblib.dump(

    symptom_columns,

    os.path.join(
        MODEL_DIR,
        "symptom_columns.pkl"
    )

)


# ==========================================
# RANDOM FOREST
# ==========================================

print("=" * 60)
print("Training Random Forest...")
print("=" * 60)

model = RandomForestClassifier(

    n_estimators=100,

    max_depth=20,

    min_samples_split=4,

    min_samples_leaf=1,

    max_features="sqrt",

    class_weight="balanced",

    random_state=42,

    n_jobs=-1

)


model.fit(

    X_train,

    y_train

)


# ==========================================
# TEST ACCURACY
# ==========================================

predictions = model.predict(
    X_test
)

accuracy = accuracy_score(

    y_test,

    predictions

)


print("=" * 60)

print(
    "Model Accuracy:",
    round(
        accuracy * 100,
        2
    ),
    "%"
)

print("=" * 60)


# ==========================================
# SAVE MODEL
# ==========================================

model_path = os.path.join(
    MODEL_DIR,
    "disease_model.pkl"
)

joblib.dump(

    model,

    model_path,

    compress=3

)


# ==========================================
# SAVE LABEL ENCODER
# ==========================================

encoder_path = os.path.join(
    MODEL_DIR,
    "label_encoder.pkl"
)

joblib.dump(

    encoder,

    encoder_path

)


# ==========================================
# FINAL OUTPUT
# ==========================================

print(
    "✅ Disease Model Saved"
)

print(
    "✅ Label Encoder Saved"
)

print(
    "✅ Symptom Columns Saved"
)

print("=" * 60)