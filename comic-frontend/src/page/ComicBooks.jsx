import React, { useEffect, useState } from "react";
import { getAllComics, addComic, updateComic, deleteComic } from "../services/comicService";

const ComicBooks = () => {
  const [comics, setComics] = useState([]);
  const [comic, setComic] = useState({ title: "", author: "", pricePerDay: 0 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadComics();
  }, []);

  const loadComics = async () => {
    const data = await getAllComics();
    setComics(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateComic(editingId, comic);
      setEditingId(null);
    } else {
      await addComic(comic);
    }
    setComic({ title: "", author: "", pricePerDay: 0 });
    loadComics();
  };

  const handleEdit = (id, comic) => {
    setEditingId(id);
    setComic(comic);
  };

  const handleDelete = async (id) => {
    await deleteComic(id);
    loadComics();
  };

  return (
    <div>
      <h1>Comic Books</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={comic.title}
          onChange={(e) => setComic({ ...comic, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={comic.author}
          onChange={(e) => setComic({ ...comic, author: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price Per Day"
          value={comic.pricePerDay}
          onChange={(e) => setComic({ ...comic, pricePerDay: parseFloat(e.target.value) })}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price Per Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comics.map((comic) => (
            <tr key={comic.comicBookID}>
              <td>{comic.comicBookID}</td>
              <td>{comic.title}</td>
              <td>{comic.author}</td>
              <td>{comic.pricePerDay}</td>
              <td>
                <button onClick={() => handleEdit(comic.comicBookID, comic)}>Edit</button>
                <button onClick={() => handleDelete(comic.comicBookID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComicBooks;
