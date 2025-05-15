// Import các chức năng cần dùng
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDawp7XDQqPjhowIlF14Emcco4M8WcXqmo",
  projectId: "nguyenhuutinh-daf0b",
  storageBucket: "nguyenhuutinh-daf0b.firebasestorage.app",
  databaseURL: "https://nguyenhuutinh-daf0b-default-rtdb.asia-southeast1.firebasedatabase.app",
  messagingSenderId: "381456532401",
  appId: "1:381456532401:android:76c486692e437673187390"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth, Database và Storage
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
