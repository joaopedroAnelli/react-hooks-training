import React, { useState } from 'react';

export default function Activity({ data, onCheck }) {
  const [activity, setActivity] = useState(data);
  return (
    <div className='box is-flex is-justify-content-space-between'>
      <p style={{ textDecoration: activity.checked ? 'line-through' : 'none' }}>
        {activity.title}
      </p>
      <label className='checkbox'>
        <input
          type='checkbox'
          checked={activity.checked}
          onChange={() => {
            setActivity({ ...activity, checked: !activity.checked });
            if (!activity.checked) {
              onCheck(activity);
            }
          }}
        />
      </label>
    </div>
  );
}
