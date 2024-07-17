export async function Flight({ flightNumber }: any) {
  const data = await fetch(`https://api.example.com/flight/${flightNumber}`);

  return (
    <div>
      <div>{flightNumber}</div>
      <div>{data.status}</div>
      <div>{data.source}</div>
      <div>{data.destination}</div>
    </div>
  );
}