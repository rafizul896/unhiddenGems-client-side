import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "./useAxiosCommon";

const usePackages = () => {
    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/packages')
            return data;
        }
    })

    return { packages, isLoading };
};

export default usePackages;