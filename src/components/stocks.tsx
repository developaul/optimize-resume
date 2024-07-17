export async function Stock({ symbol, numOfMonths }: any) {
  // const data = await fetch(
  //   `https://api.example.com/stock/${symbol}/${numOfMonths}`,
  // );
  const data = {
    timeline: [
      {
        date: '2024-05-01',
        value: 1000
      },
      {
        date: '2023-05-01',
        value: 2000
      },
      {
        date: '2022-05-01',
        value: 500
      }
    ]
  }

  return (
    <div>
      <div>{symbol}</div>

      <div>
        {data.timeline.map((data, index) => (
          <div key={index}>
            <div>{data.date}</div>
            <div>{data.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}