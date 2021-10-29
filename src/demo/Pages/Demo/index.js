import './style.css';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import TodoList from '../../Organisms/TodoList';
export default function UseState() {
  console.log('renderizou');
  const [name, setName] = useState('Coisas a fazer hoje');
  const [userName, setUsername] = useState('John');
  const [userSurname, setUserSurname] = useState('Mayer');
  const [activities, setActivities] = useState([]);
  const todoListRef = useRef();
  const nameInputRef = useRef();

  console.log({ todoListRef });

  useEffect(() => {
    document.title = `Você tem ${activities.length} ${
      activities.length > 1 ? 'atividades' : 'atividade'
    } na lista`;
  });
  const fullName = useMemo(() => {
    console.log('calculou nome');
    return `Mr. ${userName} ${userSurname}`;
  }, [userName, userSurname]);

  const addActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const check = (activity) => {
    const newActivities = [...activities];
    const activityToUpdateIndex = newActivities.findIndex(
      (a) => a.id === activity.id
    );
    newActivities[activityToUpdateIndex].checked = true;
    setActivities(newActivities);
    setTimeout(clearList, 500);
  };

  const clearList = () => {
    const filteredActivities = activities.filter((a) => !a.checked);
    setActivities([...filteredActivities]);
  };
  return (
    <div className='is-flex'>
      <div>
        <div className='card mb-5'>
          <div className='card-header'>
            <h1 className='card-header-title'>{name}</h1>
            <button
              className='card-header-icon has-text-info'
              onClick={() => {
                nameInputRef.current.focus();
              }}
            >
              Editar
            </button>
          </div>

          <div className='card-content'>
            <TodoList
              ref={todoListRef}
              activities={activities}
              onAdd={addActivity}
              onCheck={check}
            />
          </div>
          <div className='card-footer'>
            <p className='is-size-7 is-italic card-footer-item'>
              by {fullName}
            </p>
            <button
              className='button is-info is-inverted card-footer-item'
              onClick={() => {
                todoListRef.current.changeSort();
              }}
            >
              Ordernar
            </button>
          </div>
        </div>
        <div className='card mt-5'>
          <div className='card-header'>
            <h3 className='card-header-title'>Configurações</h3>
          </div>
          <form className='card-content'>
            <div className='field'>
              <label className='label'>Nome da lista</label>
              <div className='control'>
                <input
                  id='name'
                  ref={nameInputRef}
                  className='input'
                  placeholder='Edite o nome da lista'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Nome</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Edite o nome do usuário'
                  value={userName}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Sobrenome</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Edite o sobrenome do usuário'
                  value={userSurname}
                  onChange={(e) => {
                    setUserSurname(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='ml-3 p-5'>
        <pre
          className='box'
          style={{ backgroundColor: '#282c34', color: '#FFF' }}
        >
          {JSON.stringify(
            {
              listName: name,
              list: activities,
              userName,
              userSurname,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
