import './style.css';
import TodoList from '../../Organisms/TodoList';
export default function HandsOn() {
  console.log('renderizou');
  let name = 'Coisas a fazer hoje';
  let userName = 'John';
  let userSurname = 'Mayer';
  let activities = [];

  const fullName = `Mr. ${userName} ${userSurname}`;

  const addActivity = (activity) => {
    activities.push(activity);
  };

  const check = (activity) => {
    const activityToUpdateIndex = activities.findIndex(
      (a) => a.id === activity.id
    );
    activities[activityToUpdateIndex].checked = true;
    setTimeout(clearList, 500);
  };

  const clearList = () => {
    const filteredActivities = activities.filter((a) => !a.checked);
    activities = filteredActivities;
  };

  return (
    <div className='is-flex'>
      <div>
        <div className='card mb-5'>
          <div className='card-header'>
            <h1 className='card-header-title'>{name}</h1>
            <button className='card-header-icon has-text-info'>Editar</button>
          </div>

          <div className='card-content'>
            <TodoList
              activities={activities}
              onAdd={addActivity}
              onCheck={check}
            />
          </div>
          <div className='card-footer'>
            <p className='is-size-7 is-italic card-footer-item'>
              by {fullName}
            </p>
            <button className='button is-info is-inverted card-footer-item'>
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
                  className='input'
                  placeholder='Edite o nome da lista'
                  value={name}
                  onChange={(e) => {
                    name = e.target.value;
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
                    userName = e.target.value;
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
                    userSurname = e.target.value;
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
