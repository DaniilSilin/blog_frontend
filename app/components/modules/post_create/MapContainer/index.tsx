import React, { ChangeEvent } from "react";
import { Map } from "@/app/components/modules/form";

import styles from "./map_container.module.css";

export interface Props {
  map: string;
  mapError: string;
  setMap: (value: string) => void;
  mapType: string;
  setMapType: (value: string) => void;
}

export default function MapContainer({
  setMap,
  map,
  mapError,
  mapType,
  setMapType,
}: Props) {
  React.useEffect(() => {
    if (
      map.includes(
        "source=constructor" &&
          "https://yandex.ru/map-widget/v1/?um=constructor",
      ) &&
      mapError === "" &&
      map
    ) {
      setMapType("interactive");
    } else if (
      map.includes(
        "source=constructorStatic" &&
          "https://api-maps.yandex.ru/services/constructor/1.0/static" &&
          "https://yandex.ru/maps/?um=constructor",
      ) &&
      mapError === "" &&
      map
    ) {
      setMapType("static");
    } else {
      setMapType("");
    }
    if (
      map.includes(
        "source=constructorStatic" &&
          "https://api-maps.yandex.ru/services/constructor/1.0/static" &&
          "https://yandex.ru/maps/?um=constructor",
      ) &&
      mapError === "" &&
      map
    ) {
      setMapType("static");
    }
  }, [map]);

  return (
    <>
      <div className={styles.mapTypeSelectorContainer}>
        <div style={{ display: "flex" }}>
          <input
            style={{ marginRight: "10px" }}
            type={"radio"}
            checked={mapType === "static"}
            readOnly
          />
          <div style={{ fontSize: "18px" }}>Статическая карта</div>
        </div>
        <div style={{ display: "flex" }}>
          <input
            style={{ marginRight: "10px" }}
            type={"radio"}
            checked={mapType === "interactive"}
            readOnly
          />
          <div style={{ fontSize: "18px" }}>Интерактивная карта</div>
        </div>
      </div>
      <Map
        width={400}
        height={120}
        onChange={setMap}
        label={"Вставьте ссылку на карту"}
        error={mapError}
        defaultValue={map}
        value={map}
      />
      <div>
        <a href={`https://yandex.ru/map-constructor/`} target={"_blank"}>
          Вставьте карту через сервис Яндекса
        </a>
      </div>
    </>
  );
}
