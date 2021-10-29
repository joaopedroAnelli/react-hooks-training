import React, {
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { Form } from '@unform/web';
import Activity from '../../Molecules/Activity';
import Input from '../../Atoms/Input';

const renderActivity = (activity, check) => {
  return <Activity key={activity.id} data={activity} onCheck={check} />;
};
function TodoList(
  { activities = [], onAdd = () => {}, onCheck = () => {} },
  ref
) {
  console.log('renderizou a lista', activities);
  const formRef = useRef();
  const [sortBy, setSortBy] = useState('byId');
  const sortByIdDesc = (activityA, activityB) => {
    if (activityA.id < activityB.id) return +1;
    if (activityA.id > activityB.id) return -1;
    return 0;
  };
  const sortByTitle = (activityA, activityB) => {
    if (activityA.title > activityB.title) return +1;
    if (activityA.title < activityB.title) return -1;
    return 0;
  };
  const sortById = (activityA, activityB) => {
    if (activityA.id > activityB.id) return +1;
    if (activityA.id < activityB.id) return -1;
    return 0;
  };

  const sortModes = {
    byIdDesc: sortByIdDesc,
    byTitle: sortByTitle,
    byId: sortById,
  };

  useImperativeHandle(ref, () => ({
    changeSort: () => {
      const sortTypes = Object.keys(sortModes);
      const actualSortType = sortTypes.indexOf(sortBy);
      const newSortMode = sortTypes[(actualSortType + 1) % sortTypes.length];
      setSortBy(newSortMode);
    },
  }));

  const orderedList = activities.sort(sortModes[sortBy]);

  let content = (
    <div>
      {orderedList.map((activity) => renderActivity(activity, onCheck))}
    </div>
  );
  if (!orderedList.length) {
    content = (
      <article className='message'>
        <div className='message-body'>
          <p>Nada a fazer...</p>
        </div>
      </article>
    );
  }

  return (
    <div className='section'>
      {content}
      <Form
        ref={formRef}
        className='mt-5'
        onSubmit={(data, { reset }) => {
          if (!data.title) return true;
          onAdd({ id: orderedList.length + 1, ...data, checked: false });
          reset();
        }}
      >
        <div className='field has-addons'>
          <p className='control'>
            <Input name='title' type='text' placeholder='Nova tarefa' />
          </p>
          <p className='control'>
            <button className='button is-success' type='submit'>
              Adicionar
            </button>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default forwardRef(TodoList);
