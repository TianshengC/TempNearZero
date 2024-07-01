// Colour is set in the tailwind config file
export const colors = {
  primary: "#3B82F6", // blue-500
  secondary: "#86efac", // green-300
  textPrimary: "#000000", // black
  textSecondary: "#FFFFFF", // white
  error: "#EF4444", // red-500
  success: "#10B981", // emerald-500
};

export const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const appConfig = {
  colors: colors,
  backendUrl: backendUrl,
};
