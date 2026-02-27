import csv
import pandas as pd
import cv2
import numpy as np
import os
from datetime import datetime
import face_recognition
import sqlite3
import dlib
from imutils.face_utils import shape_to_np

# =======================
# PATH CONFIGURATION
# =======================
path = r'D:\\Kashif\\Smartpick-ML - Copy - Copy\\assets\\img\\Parent'
dataPath = r'.\\assets\\data\\'
db_path = 'db\\db1.sqlite'

# Database connection
connection = sqlite3.connect(db_path)

# =======================
# LOAD REFERENCE IMAGES
# =======================
images = []
classNames = []
myList = os.listdir(path)
print("Reference Images List:", myList)

for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
print("Class Names:", classNames)

# =======================
# ENCODING FUNCTION
# =======================
def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encodes = face_recognition.face_encodings(img)
        if len(encodes) > 0:
            encodeList.append(encodes[0])
        else:
            print("⚠️ Warning: Face encoding failed for one of the reference images.")
    return encodeList

# =======================
# LINK FACES FUNCTION
# =======================
def linkFaces(Parents_Name, Child_Name):
    if Parents_Name != "unknown" and Child_Name != "UNKNOWN":
        try:
            cursor = connection.cursor()
            
            query_check = """
            SELECT status FROM records 
            WHERE parent_name = ? AND child_name = ?;
            """
            cursor.execute(query_check, (Parents_Name, Child_Name))
            result = cursor.fetchone()

            if result:
                # Update status in database
                query_update = """
                UPDATE records
                SET status = 0
                WHERE parent_name = ? AND child_name = ?;
                """
                cursor.execute(query_update, (Parents_Name, Child_Name))
                connection.commit()
                print(f"✅ Status updated for parent '{Parents_Name}' and child '{Child_Name}'.")

                # Save to Detected.csv (overwrite)
                file_path = "assets\\data\\Detected.csv"
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                new_data = [Parents_Name, Child_Name, timestamp, 1]

                with open(file_path, mode="w", newline="", encoding="utf-8") as csv_file:
                    csv_writer = csv.writer(csv_file)
                    csv_writer.writerow(["Parent_Name", "Child_Name", "Timestamp", "Status"])
                    csv_writer.writerow(new_data)
                print(f"📝 Latest relationship stored in '{file_path}'.")

                # Append to detectedData.csv if unique
                append_file_path = "assets\\data\\detectedData.csv"
                unique_data = True
                try:
                    with open(append_file_path, mode="r", newline="", encoding="utf-8") as read_csv_file:
                        csv_reader = csv.reader(read_csv_file)
                        next(csv_reader, None)
                        for row in csv_reader:
                            if row[:2] == [Parents_Name, Child_Name]:
                                unique_data = False
                                break
                except FileNotFoundError:
                    pass

                if unique_data:
                    with open(append_file_path, mode="a", newline="", encoding="utf-8") as append_csv_file:
                        csv_writer = csv.writer(append_csv_file)
                        if append_csv_file.tell() == 0:
                            csv_writer.writerow(["Parent_Name", "Child_Name", "Timestamp", "Status"])
                        csv_writer.writerow(new_data)
                    print(f"✅ Appended unique relationship to '{append_file_path}'.")
                else:
                    print(f"ℹ️ Relationship already exists in '{append_file_path}'. Skipping append.")
            else:
                print(f"❌ No relationship found between parent '{Parents_Name}' and child '{Child_Name}'.")
        except Exception as e:
            print(f"⚠️ Error in linking faces: {e}")
    else:
        print("⚠️ Invalid parent or child name. Operation skipped.")

# =======================
# DATABASE CHILD LOOKUP
# =======================
def find_parent(name):
    try:
        query = f"SELECT child_name FROM records WHERE parent_name = '{name}';"
        result = pd.read_sql_query(query, connection)
        if not result.empty:
            return result.iloc[0]['child_name']
        return "UNKNOWN"
    except Exception as e:
        print(f"⚠️ Error fetching parent from database: {e}")
        return "UNKNOWN"

# =======================
# EYE BLINK DETECTION HELPERS
# =======================
def eye_aspect_ratio(eye):
    A = np.linalg.norm(eye[1] - eye[5])
    B = np.linalg.norm(eye[2] - eye[4])
    C = np.linalg.norm(eye[0] - eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

# Initialize dlib’s face detector and landmark predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# Eye landmark indices
(lStart, lEnd) = (42, 48)
(rStart, rEnd) = (36, 42)

# Constants for blink detection
EYE_AR_THRESH = 0.2
CONSEC_FRAMES = 3

# =======================
# ENCODE KNOWN FACES
# =======================
encodeListKnown = findEncodings(images)
print('✅ Encoding Complete.')

# =======================
# START SYSTEM CAMERA FEED
# =======================
cap = cv2.VideoCapture(0)  # Use system camera

if not cap.isOpened():
    print("❌ Error: Could not open system camera.")
    exit()

print("🎥 Starting webcam... Press 'q' to quit.")

# =======================
# MAIN LOOP
# =======================
while True:
    try:
        success, img = cap.read()
        if not success:
            print("⚠️ Failed to grab frame from camera.")
            break

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        rects = detector(gray, 0)
        blink_detected = False

        for rect in rects:
            shape = predictor(gray, rect)
            shape = shape_to_np(shape)

            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]

            leftEAR = eye_aspect_ratio(leftEye)
            rightEAR = eye_aspect_ratio(rightEye)
            ear = (leftEAR + rightEAR) / 2.0

            if ear < EYE_AR_THRESH:
                blink_detected = True

            imgS = cv2.resize(img, (0, 0), None, 0.5, 0.5)
            imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

            if blink_detected:
                facesCurFrame = face_recognition.face_locations(imgS)
                encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

                for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
                    matches = face_recognition.compare_faces(encodeListKnown, encodeFace, tolerance=0.55)
                    faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
                    matchIndex = np.argmin(faceDis) if len(faceDis) > 0 else -1

                    if matchIndex != -1 and matches[matchIndex]:
                        name = classNames[matchIndex]
                        print("✅ Detected Face:", name)
                    else:
                        name = "unknown"

                    linked_name = find_parent(name)

                    y1, x2, y2, x1 = faceLoc
                    y1, x2, y2, x1 = y1 * 2, x2 * 2, y2 * 2, x1 * 2
                    cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
                    cv2.putText(img, f'{name} -> {linked_name}', (x1 + 6, y2 - 6),
                                cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

                    linkFaces(name, linked_name)

        cv2.imshow('Webcam', img)

        if cv2.waitKey(5) & 0xFF == ord('q'):
            break

    except Exception as e:
        print(f"⚠️ Error processing video feed: {e}")

# =======================
# CLEANUP
# =======================
cap.release()
cv2.destroyAllWindows()
