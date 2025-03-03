import {userProfileApi} from "@/apis/endpoints";
import useSWR from "swr";


const fetcher = (url: string) => fetch(url).then((res) => res.json());


export const useUserApiData = () => useSWR(userProfileApi, fetcher);