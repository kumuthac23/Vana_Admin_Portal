import { IUser } from "../interface/type";
import { userhttp } from "./http";

export const getLoginCridential = async (data: IUser) => {
    try {
        const response = await userhttp.post<IUser[]>("user/login", data);
        console.log(response);

        return response;
    } catch (error) { throw error }
};