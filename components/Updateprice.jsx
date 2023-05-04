import { updateDoc, doc, getDocs, collection } from "firebase/firestore";
import db from "../config";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Updateprice() {
  console.log('Updateprice component render')
  const [cost8_11, setCost8_11] = useState(0);
  const [cost12_15, setCost12_15] = useState(0);
  const [cost16_19, setCost16_19] = useState(0);

  useEffect(() => {
    const fetchElectricityPrices = async () => {
      try {
        const today = new Date();

        const formattedDate = `${today.getFullYear()}/${
          (today.getMonth() + 1).toString().padStart(2, "0")
        }-${today.getDate().toString().padStart(2, "0")}`;

        const response = await axios.get(
          `https://www.elprisetjustnu.se/api/v1/prices/${formattedDate}_SE3.json`
        );

        setCost8_11(
          (
            (response.data[9].SEK_per_kWh +
              response.data[10].SEK_per_kWh +
              response.data[11].SEK_per_kWh) *
            3
          ).toFixed(1)
        );

        setCost12_15(
          (
            (response.data[13].SEK_per_kWh +
              response.data[14].SEK_per_kWh +
              response.data[15].SEK_per_kWh) *
            3
          ).toFixed(1)
        );

        setCost16_19(
          (
            (response.data[17].SEK_per_kWh +
              response.data[18].SEK_per_kWh +
              response.data[19].SEK_per_kWh) *
            3
          ).toFixed(1)
        );
      } catch (error) {
        console.error("Error fetching electricity prices: ", error);
      }
    };
    fetchElectricityPrices();
  }, []);

  const updatePrices = async () => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in the format "YYYY-MM-DD"
    const querySnapshot = await getDocs(collection(db, "time"));
  
    querySnapshot.forEach(async (doc) => {
      const time = doc.data();
      if (time.date === today) {
        let updatedPrice = 0;
        if (time.startTime === "08:00") {
          updatedPrice = Number(cost8_11);
        } else if (time.startTime === "12:00") {
          updatedPrice = Number(cost12_15);
        } else if (time.startTime === "16:00") {
          updatedPrice = Number(cost16_19);
        }
        await updateDoc(doc.ref, { price: updatedPrice });
      }
    });
  };

  useEffect(() => {
    updatePrices();
  }, [cost8_11, cost12_15, cost16_19]);

  return null;
}
