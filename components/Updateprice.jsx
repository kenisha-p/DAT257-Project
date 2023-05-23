import { updateDoc, doc, getDocs, collection, getDoc, setDoc } from "firebase/firestore";
import db from "../config";
import axios from "axios";
import {useState, useEffect} from "react";

export default function Updateprice() {

  useEffect(() => {
    const getData = async () => {
      updatePrices();
      console.log("OK");
    };

    const updatePrices = async () => {
      const today = new Date().toISOString().slice(0, 10); // Get today's date in the format "YYYY-MM-DD"
      const querySnapshot = await getDocs(collection(db, "time"));

      const today2 = new Date();
      const formattedDate = `${today2.getFullYear()}/${
        (today2.getMonth() + 1).toString().padStart(2, "0")
      }-${today2.getDate().toString().padStart(2, "0")}`;
      const response = await axios.get(
          `https://www.elprisetjustnu.se/api/v1/prices/${formattedDate}_SE3.json`
      );

      const docRef = doc(db, 'Settings', 'settings');
      const docSnap = await getDoc(docRef);
      

      querySnapshot.forEach(async (doc) => {
        const time = doc.data();
        if (time.date === today) {
          if (time.startTime === "00:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[0].SEK_per_kWh + response.data[1].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});
            
          } else if (time.startTime === "02:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[2].SEK_per_kWh + response.data[3].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});

          } else if (time.startTime === "04:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[4].SEK_per_kWh + response.data[5].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});

          } else if (time.startTime === "06:00") {
            console.log("är här");
            updateDoc(doc.ref, {
              price: Number(((response.data[6].SEK_per_kWh + response.data[7].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});

          } else if (time.startTime === "08:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[8].SEK_per_kWh + response.data[9].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});

          } else if (time.startTime === "10:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[10].SEK_per_kWh + response.data[11].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});

          } else if (time.startTime === "12:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[12].SEK_per_kWh + response.data[13].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});


          } else if (time.startTime === "14:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[14].SEK_per_kWh + response.data[15].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});

          } else if (time.startTime === "16:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[16].SEK_per_kWh + response.data[17].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});

          } else if (time.startTime === "18:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[18].SEK_per_kWh + response.data[19].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});

          } else if (time.startTime === "20:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[20].SEK_per_kWh + response.data[21].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});

          } else if (time.startTime === "22:00") {
            updateDoc(doc.ref, {
              price: Number(((response.data[22].SEK_per_kWh + response.data[23].SEK_per_kWh) / 2 *
                  docSnap.data().Electricity *
                  docSnap.data().Wash).toFixed(1))});
          }
        }
      });
    };

    getData();
  }, []);

}