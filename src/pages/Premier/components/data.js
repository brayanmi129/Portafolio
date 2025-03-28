export const nodes = [
  {
    id: "0",
    name: "Operating System",
    deadline: "2020-02-15T05:00:00.000Z",
    type: "SETUP",
    isComplete: true,
    nodes: null,
  },
  {
    id: "1",
    name: "VSCode",
    deadline: "2020-02-17T05:00:00.000Z",
    type: "SETUP",
    isComplete: true,
    nodes: [],
  },
  {
    id: "2",
    name: "JavaScript",
    deadline: "2020-03-28T05:00:00.000Z",
    type: "LEARN",
    isComplete: true,
    nodes: [
      {
        id: "22",
        name: "Data Types",
        deadline: "2020-03-20T05:00:00.000Z",
        type: "LEARN",
        isComplete: true,
        nodes: [
          {
            id: "221",
            name: "Strings",
            deadline: "2020-03-18T05:00:00.000Z",
            type: "LEARN",
            isComplete: true,
            nodes: null,
          },
          {
            id: "222",
            name: "Numbers",
            deadline: "2020-03-19T05:00:00.000Z",
            type: "LEARN",
            isComplete: true,
            nodes: null,
          },
        ],
      },
      {
        id: "23",
        name: "Objects",
        deadline: "2020-03-22T05:00:00.000Z",
        type: "LEARN",
        isComplete: true,
        nodes: [
          {
            id: "231",
            name: "Object Methods",
            deadline: "2020-03-20T05:00:00.000Z",
            type: "LEARN",
            isComplete: true,
            nodes: null,
          },
          {
            id: "232",
            name: "Garbage Collection",
            deadline: "2020-03-21T05:00:00.000Z",
            type: "LEARN",
            isComplete: true,
            nodes: null,
          },
        ],
      },
      {
        id: "24",
        name: "Code Style",
        deadline: "2020-03-23T05:00:00.000Z",
        type: "LEARN",
        isComplete: true,
        nodes: [],
      },
    ],
  },
  {
    id: "3",
    name: "React",
    deadline: "2020-04-08T05:00:00.000Z",
    type: "LEARN",
    isComplete: false,
    nodes: [
      {
        id: "31",
        name: "Create React App",
        deadline: "2020-04-01T05:00:00.000Z",
        type: "SETUP",
        isComplete: true,
        nodes: null,
      },
      {
        id: "32",
        name: "JSX",
        deadline: "2020-04-01T05:00:00.000Z",
        type: "LEARN",
        isComplete: true,
        nodes: null,
      },
      {
        id: "33",
        name: "Components",
        deadline: "2020-05-01T05:00:00.000Z",
        type: "LEARN",
        isComplete: false,
        nodes: [],
      },
      {
        id: "34",
        name: "Props",
        deadline: "2020-06-01T05:00:00.000Z",
        type: "LEARN",
        isComplete: false,
        nodes: null,
      },
      {
        id: "35",
        name: "State",
        deadline: "2020-07-01T05:00:00.000Z",
        type: "LEARN",
        isComplete: false,
        nodes: [
          {
            id: "351",
            name: "Remote State",
            deadline: "2020-08-01T05:00:00.000Z",
            type: "LEARN",
            isComplete: true,
            nodes: [],
          },
          {
            id: "352",
            name: "Local State",
            deadline: "2020-08-01T05:00:00.000Z",
            type: "LEARN",
            isComplete: false,
            nodes: [],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Git",
    deadline: "2020-05-28T05:00:00.000Z",
    type: "SETUP",
    isComplete: false,
    nodes: [],
  },
  {
    id: "5",
    name: "Node",
    deadline: "2020-06-18T05:00:00.000Z",
    type: "LEARN",
    isComplete: true,
    nodes: [
      {
        id: "51",
        name: "Express",
        deadline: "2020-06-10T05:00:00.000Z",
        type: "LEARN",
        isComplete: false,
        nodes: null,
      },
    ],
  },
  {
    id: "6",
    name: "GraphQL",
    deadline: "2020-07-30T05:00:00.000Z",
    type: "LEARN",
    isComplete: false,
    nodes: [
      {
        id: "61",
        name: "Queries and Mutations",
        deadline: "2020-07-28T05:00:00.000Z",
        type: "LEARN",
        isComplete: false,
        nodes: [
          {
            id: "611",
            name: "Fields",
            deadline: "2020-07-20T05:00:00.000Z",
            type: "LEARN",
            isComplete: false,
            nodes: null,
          },
          {
            id: "612",
            name: "Arguments",
            deadline: "2020-07-21T05:00:00.000Z",
            type: "LEARN",
            isComplete: false,
            nodes: null,
          },
          {
            id: "613",
            name: "Aliases",
            deadline: "2020-07-22T05:00:00.000Z",
            type: "LEARN",
            isComplete: false,
            nodes: null,
          },
          {
            id: "614",
            name: "Fragments",
            deadline: "2020-07-23T05:00:00.000Z",
            type: "LEARN",
            isComplete: false,
            nodes: [
              {
                id: "6141",
                name: "Inline Fragments",
                deadline: "2020-07-23T05:00:00.000Z",
                type: "LEARN",
                isComplete: false,
                nodes: null,
              },
            ],
          },
          {
            id: "615",
            name: "Variables",
            deadline: "2020-07-24T05:00:00.000Z",
            type: "LEARN",
            isComplete: false,
            nodes: null,
          },
          {
            id: "616",
            name: "Directives",
            deadline: "2020-07-25T05:00:00.000Z",
            type: "LEARN",
            isComplete: false,
            nodes: null,
          },
        ],
      },
    ],
  },
];
