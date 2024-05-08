import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./reducers/filtersReducer";
import showModalReducer from "./reducers/showModalReducer";
import UserReducer from "./reducers/UserReducer";
import searchReducer from "./reducers/searchReducer";
const store = configureStore({
  reducer: {
    filters: filtersReducer,
    showModal: showModalReducer,
    UserReducer: UserReducer,
    search: searchReducer,
  },
});

export default store;
