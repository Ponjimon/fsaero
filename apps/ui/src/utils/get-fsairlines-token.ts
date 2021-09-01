import fetch from 'node-fetch';

export type FSAirlinesAPIResponseStatus =
  | 'SUCCESS'
  | 'NOT FOUND'
  | 'INVALID API KEY'
  | 'INVALID'
  | 'VA IS INACTIVE';

export interface FSAirlinesAPIResponse<T> {
  status: FSAirlinesAPIResponseStatus;
  data: T | null;
}

export const getFsAirlinesToken = async (
  username: string,
  password: string,
  vaId: string
) => {
  const url = `https://www.fsairlines.net/va_interface2.php?format=json&function=pilotLogin&${new URLSearchParams(
    { va_id: vaId, apikey: process.env.FSAIRLINES_API_KEY }
  ).toString()}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      user: username,
      password,
    }),
  });

  const res = (await response.json()) as FSAirlinesAPIResponse<{
    token: string;
  }>;
  console.warn(
    url,
    new URLSearchParams({
      user: username,
      password,
    }).toString(),
    res
  );

  if (res.status !== 'SUCCESS') {
    return null;
  }

  return res.data.token;
};
