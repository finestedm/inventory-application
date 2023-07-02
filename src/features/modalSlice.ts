import { ILocation, OpeningHours, IPart, ITag, IInventory } from "@/components/interfaces";
import { PayloadAction, combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

interface IModalState {
  partEditModalOpen: boolean;
  partDeleteModalOpen: boolean;
  partData: IPart;
  inventoryEditModalOpen: boolean;
  inventoryData: IInventory[];
  locationEditModalOpen: boolean;
  locationData: ILocation;
  locationDeleteModalOpen: boolean;
  locationOpenHoursEditModalOpen: boolean;
  tagEditModalOpen: boolean;
  tagData: ITag;
  tagDeleteModalOpen: boolean;
  photoData: File | null;
  photoUploadModalOpen: boolean
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const initialOpeningHours: OpeningHours[] = daysOfWeek.map(day => ({
  day,
  open: '',
  close: '',
}));

const initialModalState: IModalState = {
  partEditModalOpen: false,
  partDeleteModalOpen: false,
  partData: {
    _id: '',
    name: '',
    price: 0.00,
    manufacturer: '',
    tags: [],
    photo: undefined
  },
  inventoryEditModalOpen: false,
  inventoryData: [{}],
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
  photoData: null,
  photoUploadModalOpen: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    setPartEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.partEditModalOpen = action.payload;
      if (!action.payload) {
        // Dispatch resetPartDataDeep when partEditModalOpen is set to false
        state.partData = initialModalState.partData;
      }
    },
    setPartDeleteModalOpen: (state, action: PayloadAction<{ partDeleteModalOpen: boolean, partData?: IPart }>) => {
      state.partDeleteModalOpen = action.payload.partDeleteModalOpen;
      state.partData = action.payload.partData ? action.payload.partData : state.partData = initialModalState.partData
    },

    setPartData(state, action: PayloadAction<IPart>) {
      state.partData = action.payload;
    },
    resetPartDataDeep(state) {
      state.partData = initialModalState.partData;
    },
    setInventoryEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.inventoryEditModalOpen = action.payload;
    },
    setInventoryData(state, action: PayloadAction<IInventory[]>) {
      state.inventoryData = action.payload;
    },
    setLocationEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.locationEditModalOpen = action.payload;
      if (!action.payload) {
        state.locationData = initialModalState.locationData;
      }
    },
    setLocationData(state, action: PayloadAction<ILocation>) {
      state.locationData = action.payload;
    },
    resetLocationDataDeep(state) {
      state.locationData = initialModalState.locationData;
    },
    setLocationDeleteModalOpen: (state, action: PayloadAction<{ locationDeleteModalOpen: boolean, locationData?: ILocation }>) => {
      state.locationDeleteModalOpen = action.payload.locationDeleteModalOpen;
      state.locationData = action.payload.locationData ? action.payload.locationData : state.locationData = initialModalState.locationData;
    },
    setLocationOpenHoursEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.locationOpenHoursEditModalOpen = action.payload;
      if (!action.payload) {
        state.locationData = initialModalState.locationData;
      }
    },
    setTagEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.tagEditModalOpen = action.payload;
      if (!action.payload) {
        // Dispatch resetPartDataDeep when partEditModalOpen is set to false
        state.tagData = initialModalState.tagData;
      }
    },
    setTagData(state, action: PayloadAction<ITag>) {
      state.tagData = action.payload;
    },
    setTagDeleteModalOpen: (state, action: PayloadAction<{ tagDeleteModalOpen: boolean, tagData?: ITag }>) => {
      state.tagDeleteModalOpen = action.payload.tagDeleteModalOpen;
      state.tagData = action.payload.tagData ? action.payload.tagData : state.tagData = initialModalState.tagData;
    },
    setPhotoData(state, action: PayloadAction<File>) {
      state.photoData = action.payload;
    },
    setPhotoUploadModalOpen: (state, action: PayloadAction<boolean>) => {
      state.photoUploadModalOpen = action.payload;
      if (!action.payload) {
        state.photoData = initialModalState.photoData;
      }
    },
  },
});


export const { setPartEditModalOpen, setPartDeleteModalOpen, setPartData, setInventoryEditModalOpen, setInventoryData, setLocationEditModalOpen, setLocationData, setLocationDeleteModalOpen, setLocationOpenHoursEditModalOpen, setTagEditModalOpen, setTagData, setTagDeleteModalOpen, setPhotoData, setPhotoUploadModalOpen } = modalSlice.actions;
export const modalReducer = modalSlice.reducer