import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi';

const Admin = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.get('/pages.json');

        if (response.data) {
          setPages(Object.keys(response.data));
        }
      } catch (e) {
        console.error('Something goes bad', e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axiosApi.get(`/pages/${selectedPage}.json`);

        if (response.data) {
          setTitle(response.data.title);
          setContent(response.data.content);
        }
      } catch (e) {
        console.error('Something goes bad', e);
      }
    };
    fetchPage();
  }, [selectedPage]);

  const handleSave = async () => {
    if (selectedPage) {
      try {
        await axiosApi.put(`/pages/${selectedPage}.json`, selectedPage);
        navigate(`/pages/${selectedPage}.json`);
      } catch (e) {
        console.error('Something goes bad', e);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin page</h1>
      <div className="form-group">
        <label>Select Page</label>
        <select
          onChange={(e) => setSelectedPage(e.target.value)} value={selectedPage}
          className="form-control"
        >
          <option>Select Page</option>
          {pages.map((page) => (
            <option key={page} value={page}>{page}</option>
          ))}
        </select>
      </div>
        <div className="form-group row m-3">
          <div className="col-mt-12 mb-3">
            <input
              type="text"
              value={title}
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Change your title"
              required
            />
          </div>
          <div className="col-mt-12 mb-3">
             <textarea
               className="form-control"
               value={content}
               onChange={(e) => setContent(e.target.value)}
               placeholder="Change your content"
               required/>
          </div>
          <div className="col-12">
            <button className="btn btn-success" onClick={handleSave}>Save</button>
          </div>
        </div>
    </div>
  );
};

export default Admin;