import { useMutation } from "@tanstack/react-query";
import { getLoginCridential } from "../services/Login"; // Assuming loginUser is the correct service function
import { IUser } from "../interface/type";
import { queryClient } from "../App";
import toast from "react-hot-toast";

export const useLogin = () => {
    const loginMutation = useMutation({
        mutationFn: (loginData: IUser) => getLoginCridential(loginData), // Adjust the service function accordingly
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userlist"] });
            toast.success("Login successful");
        },
        onError: (error: Error) => {
            console.error(error);
            toast.error("Invalid username or password"); // Adjust the error message accordingly
        },
    });

    return loginMutation;
};
