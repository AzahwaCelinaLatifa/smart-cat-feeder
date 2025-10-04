import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const scheduleRef = collection(db, "feedingSchedules");

// Tambah jadwal
export const addSchedule = async (data: { time: string; amount: number }) => {
  return await addDoc(scheduleRef, data);
};

// Ambil semua jadwal
export const getSchedules = async () => {
  const snapshot = await getDocs(scheduleRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update jadwal
export const updateSchedule = async (id: string, data: any) => {
  const ref = doc(db, "feedingSchedules", id);
  return await updateDoc(ref, data);
};

// Hapus jadwal
export const deleteSchedule = async (id: string) => {
  const ref = doc(db, "feedingSchedules", id);
  return await deleteDoc(ref);
};