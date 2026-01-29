// creation des types
export type LoginDTO = { email: string; password: string };
export type LoginResponse = { token: string; user?: { id: number; email: string } };

// import { body } from "motion/react-client";
//fetchDatas est exporté depuis ./fetchDatas
// import { RegisterBody } from "../types/auth";
import { fetchDatas } from "../utils/fetchDatas";

export const login = async (payload: LoginDTO) => {
  return fetchDatas<LoginResponse, LoginDTO>("https://api.react.nos-apps.com/api/groupe-9/auth/login ", {
    method: "POST",
    body: payload,
  });
};

// export const signup = async (payload:) => {
//   return fetchDatas<RegisterBody> ("https://api.react.nos-apps.com/api/groupe-9/auth/register"), {
//     method: "POST",
//     body: payload,
//   }
// }