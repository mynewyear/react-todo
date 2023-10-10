import React from 'react';

let todoList = [
  {
    id: 1,
    title: "Wake up"
  },
  {
    id: 2,
    title: "Take a shower"
  },
  {
    id: 3,
    title: "Take a coffee"
  },
  {
    id: 4,
    title: "Learn React"
  }
];

function App() {

  return(
    <>
      <h1>ToDo List</h1>
      <ul>
        {todoList.map( (item) =>
          <li key={item.id}>{item.title}</li>
        )}
      </ul>
    </>
  )

};

export default App;
