"use client";

import { configureStore } from "@reduxjs/toolkit";

import reducer from "./userActions";
export const store = configureStore({
  reducer,
});
