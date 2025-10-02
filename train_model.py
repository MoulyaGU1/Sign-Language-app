# test_model.py
import joblib, pickle, os, cv2, numpy as np, sys
MODEL_PATH = "model/model.pkl"  # adjust if needed

if not os.path.exists(MODEL_PATH):
    print("Model not found at", MODEL_PATH)
    sys.exit(1)

try:
    model = joblib.load(MODEL_PATH)
    print("Loaded model via joblib")
except Exception:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    print("Loaded model via pickle")

print("Has classes_?", hasattr(model, "classes_"))
if hasattr(model, "classes_"):
    print("Classes:", model.classes_)

def preprocess(img_path, sz=(64,64)):
    im = cv2.imread(img_path)
    im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    im = cv2.resize(im, sz)
    v = im.flatten().astype("float32") / 255.0
    return v.reshape(1, -1)

IMAGES_DIR = "uploads_debug"
for fn in os.listdir(IMAGES_DIR)[:10]:
    path = os.path.join(IMAGES_DIR, fn)
    v = preprocess(path)
    try:
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(v)[0]
            idx = probs.argmax()
            label = model.classes_[idx] if hasattr(model, "classes_") else idx
            print(fn, "->", label, probs[idx], "top3:",
                  sorted(zip(getattr(model, "classes_", list(range(len(probs)))), probs), key=lambda x: x[1], reverse=True)[:3])
        else:
            label = model.predict(v)[0]
            print(fn, "->", label)
    except Exception as e:
        print("Predict failed for", fn, e)
