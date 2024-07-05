import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import Spinner from '../../components /Spinner/Spinner';

const Admin = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosApi.get('/pages.json');

        if (response.data) {
          setPages(Object.keys(response.data));
        }
      } catch (e) {
        console.error('Something goes bad', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      const fetchPage = async () => {
        setLoading(true);
        try {
          const response = await axiosApi.get(`/pages/${selectedPage}.json`);

          if (response.data) {
            setTitle(response.data.title);
            setContent(response.data.content);
          }
        } catch (e) {
          console.error('Something goes bad', e);
        } finally {
          setLoading(false);
        }
      };
      fetchPage();
    }
  }, [selectedPage]);

  const handleSave = async () => {
    if (selectedPage) {
      setLoading(true);
      try {
        await axiosApi.put(`/pages/${selectedPage}.json`, {
          title,
          content,
        });
        navigate(`/pages/${selectedPage}`);
      } catch (e) {
        console.error('Something goes bad', e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <Spinner/>
      ) : (
        <>
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
                required
              />
            </div>
            <div className="col-12">
              <button className="btn btn-success" onClick={handleSave}>Save</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
