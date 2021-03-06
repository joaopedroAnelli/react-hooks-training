import React, { useRef, useState } from 'react';
import { Form } from '@unform/web';
import Activity from '../../Molecules/Activity';
import Input from '../../Atoms/Input';

function TodoList({ activities = [], onAdd = () => {}, onCheck = () => {} }) {
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

  const changeSort = () => {
    const sortTypes = Object.keys(sortModes);
    const actualSortType = sortTypes.indexOf(sortBy);
    const newSortMode = sortTypes[(actualSortType + 1) % sortTypes.length];
    setSortBy(newSortMode);
  };

  const orderedList = activities.sort(sortModes[sortBy]);

  let content = (
    <article className='message'>
      <div className='message-body'>
        <p>Nada a fazer...</p>
      </div>
    </article>
  );

  if (orderedList.length) {
    content = (
      <div>
        {orderedList.map((activity) => (
          <Activity key={activity.id} data={activity} onCheck={onCheck} />
        ))}
      </div>
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

// export default forwardRef(TodoList);
export default TodoList;
