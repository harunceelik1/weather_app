import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
export default function SplashScreen({ finishLoading }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Bileşen yüklendikten sonra setIsMounted(true) ile isMounted değerini true yapalım
    setIsMounted(true);

    // Loader'in 3 saniye sonra kaybolması için bir zamanlayıcı oluşturalım
    const loaderTimer = setTimeout(() => {
      finishLoading(); // finishLoading fonksiyonuyla bileşenin yüklenme işleminin tamamlandığını ana bileşene bildirelim
    }, 3000);

    // useEffect kancasından dönen temizleyici fonksiyon ile zamanlayıcıyı temizleyelim
    return () => clearTimeout(loaderTimer);
  }, [finishLoading]); // useEffect'in ikinci argümanı boş dizi, bu sayede sadece bir kere çalışmasını sağlarız

  return (
    // <div
    //   className={`flex h-screen items-center justify-center ${
    //     isMounted ? "show" : ""
    //   }`}
    // >
    //   <Image id="logo" src={img} width={80} height={80}></Image>
    // </div>
    <div className={styles.custom_loader}></div>
  );
}
