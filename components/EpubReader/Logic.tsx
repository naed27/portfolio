import { useState, useEffect, useRef, useContext } from "react";
import { LayoutContext } from "../Layout/Context/LayoutContext";
import { GlobalContextType } from "./Types/GlobalTypes";

export default function Logic() {
  
  const { setAbsoluteNavBar } = useContext(LayoutContext)

  const globalValues:GlobalContextType = {}

  useEffect(()=> setAbsoluteNavBar(false), [ setAbsoluteNavBar ])

  useEffect(() => {
    console.log('Epub Reader on Standby.');
  },[])

  return {globalValues}
}