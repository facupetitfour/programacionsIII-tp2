import React, { useReducer, useRef, useState } from 'react';

export const Comment = () => {
  const inputRef = useRef();
  const [editIndex, setEditIndex] = useState(null);

  const [comments, dispatch] = useReducer((state = [], action) => {
    switch (action.type) {
      case 'add-comment': {
        return [
          ...state,
          { id: state.length, title: action.title }
        ];
      }
      case 'remove-comment': {
        return state.filter((comment, index) => index !== action.index);
      }
      case 'edit-comment': {
        return state.map((comment, index) =>
          index === action.index ? { ...comment, title: action.title } : comment
        );
      }
      default:
        return state;
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      dispatch({
        type: 'edit-comment',
        index: editIndex,
        title: inputRef.current.value
      });
      setEditIndex(null);
    } else {
      dispatch({
        type: 'add-comment',
        title: inputRef.current.value
      });
    }
    inputRef.current.value = '';
  };
  const handleRemove = (index) => {
    dispatch({
      type: 'remove-comment',
      index
    });
  };

  const handleEdit = (index) => {
    inputRef.current.value = comments[index].title;
    setEditIndex(index);
  };

  return (
    <div>
      <h3>Comentario de la Bodega</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name='title' ref={inputRef} />
        <input type="submit" value={editIndex !== null ? 'editar' : 'Comentar'} />
      </form>
      <div>
        {comments && comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.title}</p>
            <button onClick={() => handleRemove(index)}>Borrar</button>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};
