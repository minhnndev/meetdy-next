import { IWebInfo } from "@/api/infoWebApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const KEY = "HOME";

interface HomeState {
    developers: any[];
    infoApp: Record<string, any>;
    isLoading: boolean;
    features: any[];
    infoWebApps: Record<string, any>;
}

const initialState: HomeState = {
    developers: [],
    infoApp: {},
    isLoading: false,
    features: [],
    infoWebApps: {},
};

const homeSlice = createSlice({
    name: KEY,
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setInfoWebs: (state, action: PayloadAction<IWebInfo[]>) => {
            const data = action.payload;
            const infoWeb = data.find((ele) => ele.name === "infoweb")?.value;
            const developers = data.find((ele) => ele.name === "developers")?.value;
            const infoApp = data.find((ele) => ele.name === "infoapp")?.value;
            const features = data.find((ele) => ele.name === "features")?.value;
            state.infoWebApps = (infoWeb && typeof infoWeb === "object" ? infoWeb : {}) as Record<
                string,
                any
            >;
            state.developers = Array.isArray(developers) ? developers : [];
            state.infoApp = (infoApp && typeof infoApp === "object" ? infoApp : {}) as Record<
                string,
                any
            >;
            state.features = Array.isArray(features) ? features : [];
        },
    },
});

const { reducer, actions } = homeSlice;
export const { setLoading, setInfoWebs } = actions;

export default reducer;
