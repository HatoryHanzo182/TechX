export const PullOutOfSession = async () => {
  if (localStorage.getItem("token") == null) return false;

  const CheckSignature = await fetch(
    "http://localhost:3001/CheckToken", // <<----- Проверяем подпись токена,
    {
      // для того что бы его не подменили.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const { success } = await CheckSignature.json();

  if (success) {
    // <<---- Подпись токена была подтверждена.
    console.log("TOKEN IS TRUE");

    const PullData = await fetch("http://localhost:3001/PullOutOfSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const { user_data } = await PullData.json();

    console.log(user_data);

    if (user_data != null) return user_data;
  } // <<---- Подпись токена не подтверждена.
  else localStorage.clear("token");

  return false;
};
