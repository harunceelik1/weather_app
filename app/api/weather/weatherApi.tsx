import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const fetchWeather = async (
  city: string,
  lat: number | null,
  lon: number | null
) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEYS}`;
  const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEYS}`;
  return axios
    .get(url2, { params: { q: city, lat: lat, lon: lon } })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        toast.error("City is not found");
      }
    });
};
export default fetchWeather;
