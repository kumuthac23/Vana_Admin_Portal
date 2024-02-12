import { IUser } from "../interface/type";
import {
  httpWithoutCredentials,
  } from "../services/http";

export const getLoginCridential = async (data: IUser) => {
    try {
        const response = await httpWithoutCredentials.post<IUser[]>("user/login", data);
        console.log(response);

        return response;
    } catch (error) { throw error }
};