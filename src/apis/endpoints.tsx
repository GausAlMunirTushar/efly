const BASE_URL = 'http://localhost:3000';


// user module
export const userProfileApi = `${BASE_URL}/user/profile`;
// end user module


// shop module
export const shopApi = (ship_id: number) => `${BASE_URL}/shops/${ship_id}`;
