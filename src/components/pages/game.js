function Game({ players }) {
  console.log(players)
  const dummyPlayers = [
    {
      id: 0,
      name: "Player 1",
      component: null,
    },
    {
      id: 1,
      name: "Player 2",
      component: null,
    },
    {
      id: 2,
      name: "Player 3",
      component: null,
    },
  ];

  const cards = [
    {
      miseryIndex: 0,
      title: "0",
      description: "0",
    },
    {
      miseryIndex: 1,
      title: "1",
      description: "1",
    },
    {
      miseryIndex: 2,
      title: "2",
      description: "2",
    },
    {
      miseryIndex: 3,
      title: "3",
      description: "3",
    },
    {
      miseryIndex: 4,
      title: "4",
      description: "4",
    },
    {
      miseryIndex: 5,
      title: "5",
      description: "5",
    },
  ];
  return (
    <div>
      {dummyPlayers.map((player) => (
        <div key={player.id}>
          <p>ID: {player.id}</p>
          <p>Name: {player.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Game;
