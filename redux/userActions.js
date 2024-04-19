import { createSlice, nanoid, current } from "@reduxjs/toolkit";

// const storedSession = localStorage.getItem("authUserSession") ? localStorage.getItem("authUserSession") : null;
// const parsedSession = storedSession ? JSON?.parse(storedSession) : {};

const initialState = {
  models: [],
  categories: [],
  subCategories: [],
  generations: [],
  llms: [],
};

const Slice = createSlice({
  name: "famoaiReduce",
  initialState,
  reducers: {
    modelsArray: (state, action) => {
      state.models = action.payload;
    },
    categoriesArray: (state, action) => {
      state.categories = action.payload;
    },
    subCategoriesArray: (state, action) => {
      state.subCategories = action.payload;
    },
    generationsArray: (state, action) => {
      state.generations = action.payload;
    },
    llmsArray: (state, action) => {
      state.llms = action.payload;
    },
  },
});

export const {
  modelsArray,
  categoriesArray,
  subCategoriesArray,
  generationsArray,
  llmsArray,
} = Slice.actions;

export default Slice.reducer;
