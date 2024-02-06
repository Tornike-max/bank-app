export async function convertCurrency(amount: number, to: string) {
  try {
    if (to === "USD") return;

    const host = "api.frankfurter.app";
    const response = await fetch(
      `https://${host}/latest?amount=${amount}&from=USD&to=${to}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function convertAllCurrency(
  value: number,
  from: string,
  to: string
) {
  try {
    if (to === "USD") return;

    const host = "api.frankfurter.app";
    const response = await fetch(
      `https://${host}/latest?amount=${value}&from=${from}&to=${to}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCurrency(currency: string) {
  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=${currency}`
    );

    if (!response) throw Error("Error while getting currency rates");

    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function changeCurrencyApi(currency: string) {
  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=${currency}`
    );

    if (!response) throw Error("Error while getting currency rates");

    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
