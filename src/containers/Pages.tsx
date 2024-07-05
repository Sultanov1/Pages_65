import {useEffect, useState} from 'react';
import axiosApi from '../axiosApi';
import {useParams} from 'react-router-dom';

interface Props {
  pageName?: string;
}

const Pages = () => {
  // @ts-ignore
  const {pageName} = useParams<Props>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axiosApi.get(`/pages/${({pageName}.pageName)}.json`);

        if (response.data) {
          setTitle(response.data.title);
          setContent(response.data.content);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPage();
  }, [{pageName}.pageName]);

  return (
    <div className="m-3">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default Pages;