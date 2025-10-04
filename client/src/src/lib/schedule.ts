// schedule.ts
import rtdbApp from "@/lib/firebase";
import { getDatabase, ref, push, remove, update, onValue, off } from "firebase/database";

const rtdb = getDatabase(rtdbApp);
const SCHEDULES_REF = ref(rtdb, "schedules");

// Tambah jadwal
export const addSchedule = async (schedule: { time: string; amount: number }) => {
  await push(SCHEDULES_REF, schedule);
};

// Hapus jadwal
export const deleteSchedule = async (id: string) => {
  await remove(ref(rtdb, `schedules/${id}`));
};

// Update jadwal
export const updateSchedule = async (
  id: string,
  schedule: { time: string; amount: number }
) => {
  await update(ref(rtdb, `schedules/${id}`), schedule);
};

// Listener realtime (otomatis update UI)
export const listenSchedules = (
  callback: (schedules: { id: string; time: string; amount: number }[]) => void
) => {
  onValue(SCHEDULES_REF, (snapshot) => {
    const data = snapshot.val();
    const result = data
      ? Object.entries(data).map(([id, value]: any) => ({
          id,
          ...(value as { time: string; amount: number }),
        }))
      : [];
    callback(result);
  });

  return () => off(SCHEDULES_REF); // untuk unsubscribe
};
