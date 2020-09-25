import mockData from "./mockData";

export type Person = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  description: string;
};

export interface Response {
  data?: Person[];
  error?: Error;
}

interface Error {
  error: Error;
  person: [];
}

export const mockPersonEndPoint = (sleep: number): Promise<Response> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const randomValue = Math.random() * 10 < 2;

      if (randomValue) {
        return rej({
          data: [],
          error: "Something went wrong, please try again later",
        });
      } else {
        return res({ data: mockData });
      }
    }, sleep);
  });
};
