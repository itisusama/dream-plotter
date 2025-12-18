import type { IncomeSchema } from "@/lib/zod-schema";
import toast from "react-hot-toast";

// ADD INCOME
export const addIncome = async (values: IncomeSchema) => {
    try {
        console.log("Values from function:", values)
    } catch (error) {
        toast.error("Something went wrong");
        return false;
    }
}