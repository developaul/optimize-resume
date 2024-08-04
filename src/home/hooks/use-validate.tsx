export const useValidate = () => {
  const validate = async (data: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OPTIMIZE_RESUME_API}/api/validator`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    return result;
  };

  return {
    validate,
  };
};
