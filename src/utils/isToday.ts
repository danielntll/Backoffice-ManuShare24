export function isToday(date: number): boolean {
  const today = new Date();
  const notificationDate = new Date(date);
  return (
    notificationDate.getDate() === today.getDate() &&
    notificationDate.getMonth() === today.getMonth() &&
    notificationDate.getFullYear() === today.getFullYear()
  );
}
