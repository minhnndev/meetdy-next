import { RootState } from "@/redux/store";
import { Dispatch } from "@reduxjs/toolkit";

export interface StoreApi {
    dispatch: Dispatch;
    getState: () => RootState;
}
