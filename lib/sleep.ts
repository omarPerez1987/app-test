export default function sleep(time: number) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ message: "Sent success" }), time)
  );
}
