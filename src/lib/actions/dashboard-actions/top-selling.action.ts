'use server'
import getMyToken from "@/lib/utilits/get-my-token";

const BASE_URL = "https://flower.elevateegy.com/api/v1";

export default async function GetAllProductStatistics(){
    const token = await getMyToken();
      if (!token) {
        throw new Error('User is not authenticated');
      }
    
   const res = await fetch(`${BASE_URL}/statistics/products`,{
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },   
        cache: 'no-store',
    })
    const payload = await res.json();
    return payload;
}