import { ILocation, OpeningHours, IPart, ITag } from "@/components/interfaces";
import { PayloadAction, combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

interface IModalState {
  partEditModalOpen: boolean;
  partDeleteModalOpen: boolean;
  partData: IPart;
  locationEditModalOpen: boolean;
  locationData: ILocation;
  locationDeleteModalOpen: boolean;
  locationOpenHoursEditModalOpen: boolean;
  tagEditModalOpen: boolean;
  tagData: ITag;
  tagDeleteModalOpen: boolean;
  photoData: string | null;
  photoUploadModalOpen: boolean
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const initialOpeningHours: OpeningHours[] = daysOfWeek.map(day => ({
  day,
  open: '',
  close: '',
}));

const initialState: IModalState = {
  partEditModalOpen: false,
  partDeleteModalOpen: false,
  partData: {
    _id: '',
    name: '',
    price: 0.00,
    manufacturer: '',
    tags: []
  },
  locationEditModalOpen: false,
  locationData: {
    _id: '',
    zip: '',
    street: '',
    city: '',
    country: '',
    openingHours: initialOpeningHours,
    phoneNumber: '',
    email: '',
  },
  locationDeleteModalOpen: false,
  locationOpenHoursEditModalOpen: false,
  tagEditModalOpen: false,
  tagData: {
    _id: '',
    name: ''
  },
  tagDeleteModalOpen: false,
  photoData: '',
  photoUploadModalOpen: false
};


const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setPartEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.partEditModalOpen = action.payload;
      if (!action.payload) {
        // Dispatch resetPartDataDeep when partEditModalOpen is set to false
        state.partData = initialState.partData;
      }
    },
    setPartDeleteModalOpen: (state, action: PayloadAction<{ partDeleteModalOpen: boolean, partData?: IPart }>) => {
      state.partDeleteModalOpen = action.payload.partDeleteModalOpen;
      state.partData = action.payload.partData ? action.payload.partData : state.partData = initialState.partData
    },
    setPartData(state, action: PayloadAction<IPart>) {
      state.partData = action.payload;
    },
    resetPartDataDeep(state) {
      state.partData = initialState.partData;
    },
    setLocationEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.locationEditModalOpen = action.payload;
      if (!action.payload) {
        state.locationData = initialState.locationData;
      }
    },
    setLocationData(state, action: PayloadAction<ILocation>) {
      state.locationData = action.payload;
    },
    resetLocationDataDeep(state) {
      state.locationData = initialState.locationData;
    },
    setLocationDeleteModalOpen: (state, action: PayloadAction<{ locationDeleteModalOpen: boolean, locationData?: ILocation }>) => {
      state.locationDeleteModalOpen = action.payload.locationDeleteModalOpen;
      state.locationData = action.payload.locationData ? action.payload.locationData : state.locationData = initialState.locationData;
    },
    setLocationOpenHoursEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.locationOpenHoursEditModalOpen = action.payload;
      if (!action.payload) {
        state.locationData = initialState.locationData;
      }
    },
    setTagEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.tagEditModalOpen = action.payload;
      if (!action.payload) {
        // Dispatch resetPartDataDeep when partEditModalOpen is set to false
        state.tagData = initialState.tagData;
      }
    },
    setTagData(state, action: PayloadAction<ITag>) {
      state.tagData = action.payload;
    },
    setTagDeleteModalOpen: (state, action: PayloadAction<{ tagDeleteModalOpen: boolean, tagData?: ITag }>) => {
      state.tagDeleteModalOpen = action.payload.tagDeleteModalOpen;
      state.tagData = action.payload.tagData ? action.payload.tagData : state.tagData = initialState.tagData;
    },
    setPhotoData(state, action: PayloadAction<string>) {
      state.photoData = action.payload;
    },
    setPhotoUploadModalOpen: (state, action: PayloadAction<boolean>) => {
      state.photoUploadModalOpen = action.payload;
      if (!action.payload) {
        state.photoData = initialState.photoData;
      }
    },
  },
});

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const { setPartEditModalOpen, setPartDeleteModalOpen, setPartData, setLocationEditModalOpen, setLocationData, setLocationDeleteModalOpen, setLocationOpenHoursEditModalOpen, setTagEditModalOpen, setTagData, setTagDeleteModalOpen, setPhotoData, setPhotoUploadModalOpen } = modalSlice.actions;
export type RootState = ReturnType<typeof store.getState>