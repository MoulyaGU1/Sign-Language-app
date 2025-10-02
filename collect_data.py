import cv2
import os

SIGN = input("Enter sign label (A-Z, 0-9): ").upper()
SAVE_DIR = f"static/signs/{SIGN}"
os.makedirs(SAVE_DIR, exist_ok=True)

cap = cv2.VideoCapture(0)
count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow("Capture - Press Space to Save", frame)
    key = cv2.waitKey(1)
    if key & 0xFF == 32:  # Space key
        cv2.imwrite(f"{SAVE_DIR}/{SIGN}_{count}.png", frame)
        count += 1
        print(f"Saved {count} images")
    elif key & 0xFF == 27:  # ESC key
        break

cap.release()
cv2.destroyAllWindows()
