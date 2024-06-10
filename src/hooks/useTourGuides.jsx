import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "./useAxiosCommon";

const useTourGuides = () => {
    const { data: tourGuides = [], isLoading } = useQuery({
        queryKey: ['tourGuides'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/tourGuides')
            return data;
        }
    })

    return { tourGuides, isLoading };
};

export default useTourGuides;