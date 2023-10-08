import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const { sendRequest, isLoading, error } = useHttp();

  const applyData = (taskText, data) => {
    const generatedId = data.name;
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendRequest(
      {
        url: 'https://belajar-rest.firebaseio.com/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText },
      },
      applyData.bind(null, taskText)
      // pre-configure function, bind(params...), di parameter pertama itu akan bisa dipanggil pakai this dan param kedua itu akan jadi param pertama pada fn aslinya
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
