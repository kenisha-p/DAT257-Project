import { updateDoc, doc, getDocs, collection, getDoc } from "firebase/firestore";
import db from "../config";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Updateprice() {
  //console.log('Updateprice component render')
  const [cost00_2, setCost00_2] = useState(0);
  const [cost2_4, setCost2_4] = useState(0);
  const [cost4_6, setCost4_6] = useState(0);
  const [cost6_8, setCost6_8] = useState(0);
  const [cost8_10, setCost8_10] = useState(0);
  const [cost10_12, setCost10_12] = useState(0);
  const [cost12_14, setCost12_14] = useState(0);
  const [cost14_16, setCost14_16] = useState(0);
  const [cost16_18, setCost16_18] = useState(0);
  const [cost18_20, setCost18_20] = useState(0);
  const [cost20_22, setCost20_22] = useState(0);
  const [cost22_00, setCost22_00] = useState(0);
  const [electricityConsumtion, getElectricityConsumtion] = useState("");
  const [washCykles, getWashCykles] = useState("");

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'Settings', 'settings');
      const docSnap = await getDoc(docRef);
      getElectricityConsumtion(docSnap.data().Electricity);
      getWashCykles(docSnap.data().Wash);
      console.log("Collect settings");
    };
    getData();
  }, []);  

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

        setCost00_2(
          (
            (response.data[0].SEK_per_kWh +
              response.data[1].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost2_4(
          (
            (response.data[2].SEK_per_kWh +
              response.data[3].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost4_6(
          (
            (response.data[4].SEK_per_kWh +
              response.data[5].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost6_8(
          (
            (response.data[6].SEK_per_kWh +
              response.data[7].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost8_10(
          (
            (response.data[8].SEK_per_kWh +
              response.data[9].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost10_12(
          (
            (response.data[10].SEK_per_kWh +
              response.data[11].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost12_14(
          (
            (response.data[12].SEK_per_kWh +
              response.data[13].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost14_16(
          (
            (response.data[14].SEK_per_kWh +
              response.data[15].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost16_18(
          (
            (response.data[16].SEK_per_kWh +
              response.data[17].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost18_20(
          (
            (response.data[18].SEK_per_kWh +
              response.data[19].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost20_22(
          (
            (response.data[20].SEK_per_kWh +
              response.data[21].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
          ).toFixed(1)
        );

        setCost22_00(
          (
            (response.data[22].SEK_per_kWh +
              response.data[23].SEK_per_kWh) /2 *
            electricityConsumtion * washCykles
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
      console.log('Updateprice component render')
      if (time.date === today) {
        let updatedPrice = 0;
        if (time.startTime === "00:00") {
          updatedPrice = Number(cost00_2);
        } else if (time.startTime === "02:00") {
          updatedPrice = Number(cost2_4);
        } else if (time.startTime === "04:00") {
          updatedPrice = Number(cost4_6);
        } else if (time.startTime === "06:00") {
          updatedPrice = Number(cost6_8);
        } else if (time.startTime === "08:00") {
          updatedPrice = Number(cost8_10);
        } else if (time.startTime === "10:00") {
          updatedPrice = Number(cost10_12);
        } else if (time.startTime === "12:00") {
          updatedPrice = Number(cost12_14);
        } else if (time.startTime === "14:00") {
          updatedPrice = Number(cost14_16);
        } else if (time.startTime === "16:00") {
          updatedPrice = Number(cost16_18);
        } else if (time.startTime === "18:00") {
          updatedPrice = Number(cost18_20);
        } else if (time.startTime === "20:00") {
          updatedPrice = Number(cost20_22);
        } else if (time.startTime === "22:00") {
          updatedPrice = Number(cost22_00);
        }
        await updateDoc(doc.ref, { price: updatedPrice });
      }
    });
  };

  useEffect(() => {
    updatePrices();
  }, [cost00_2, cost2_4, cost4_6, cost6_8, cost8_10, cost10_12, cost12_14, cost14_16, cost16_18, cost18_20, cost20_22, cost22_00]);

  return null;
}
