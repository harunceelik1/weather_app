"use client";
import React, { useState, createContext } from "react";

export const LocationContext = createContext();

export default function LocationProvider({ children }) {
  //sidebar state
  const { weather } = weatherStat;
  return (
    <LocationContext.Provider value={{ weather }}>
      {children}
    </LocationContext.Provider>
  );
}
