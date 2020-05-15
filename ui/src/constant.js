const State = {
  PLANTED: 1,
  INSTOCK: 2,
  INSTORE: 3,
};

Object.freeze(State);

const plants_init = [
  {
    id: 0,
    name: "Bonsai 3",
    level: 2,
    simoola: 30,
    state: State.INSTORE,
  },
  {
    id: 1,
    name: "Bonsai 1",
    level: 2,
    simoola: 56,
    state: State.PLANTED,
  },
  { id: 2, name: "Bonsai 2", level: 3, simoola: 40, state: State.INSTOCK },
  {
    id: 3,
    name: "Bonsai 3",
    level: 2,
    simoola: 30,
    state: State.INSTOCK,
  },
  {
    id: 4,
    name: "Bonsai 3",
    level: 2,
    simoola: 30,
    state: State.INSTORE,
  },
  {
    id: 5,
    name: "Bonsai 3",
    level: 2,
    simoola: 30,
    state: State.INSTORE,
  },
  {
    id: 6,
    name: "Bonsai 3",
    level: 2,
    simoola: 30,
    state: State.INSTOCK,
  },
  {
    id: 7,
    name: "Bonsai 3",
    level: 2,
    simoola: 30,
    state: State.INSTOCK,
  },
  {
    id: 8,
    name: "Bonsai 1",
    level: 2,
    simoola: 56,
    state: State.PLANTED,
  },
  { id: 9, name: "Bonsai 2", level: 3, simoola: 40, state: State.INSTOCK },
  {
    id: 10,
    name: "Bonsai 3",
    level: 2,
    simoola: 30,
    state: State.PLANTED,
  },
  {
    id: 11,
    name: "Bonsai 3",
    level: 2,
    simoola: 30,
    state: State.PLANTED,
  },
];

export { plants_init, State };
