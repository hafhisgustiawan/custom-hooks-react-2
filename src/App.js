import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const { sendRequest, isLoading, error } = useHttp();

  useEffect(() => {
    const applyData = (data) => {
      const loadedData = [];
      for (const key in data) {
        loadedData.push({ id: key, text: data[key].text });
      }
      setTasks(loadedData);
    };

    sendRequest(
      { url: 'https://belajar-rest.firebaseio.com/tasks.json' },
      applyData
    );
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
