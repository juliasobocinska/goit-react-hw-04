import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar.jsx';
import ImageGallery from './ImageGallery.jsx';
import Loader from './Loader.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import LoadMoreBtn from './LoadMoreBtn.jsx'; 
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import ImageModal from './ImageModal.jsx';
import styles from './app.module.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1); 
  const [topic, setTopic] = useState(''); 

  const openModal = (imageUrl) => {
    if (!modalIsOpen) {
      setIsOpen(true); 
      setSelectedImage(imageUrl); 
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const fetchPhotosWithTopic = async (topic, page) => {
    const apiKey = "iZlnbKR1C8nTheR-r-HoB58ZxIKLeqFYKmth1na6j4o";
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(topic)}&page=${page}&client_id=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }

      const data = await response.json();
      return data.results;
    } catch (fetchError) {
      toast.error(`Error: ${fetchError.message}`);
      throw fetchError;
    }
  };

  const handleSearch = async (newTopic) => {
    if (!newTopic.trim() || newTopic.length < 3) {
      toast.error("Please enter a valid search term (at least 3 characters).");
      return;
    }

    try {
      setPhotos([]); 
      setPage(1); 
      setError(false);
      setLoading(true);
      setTopic(newTopic); 

      const data = await fetchPhotosWithTopic(newTopic, 1);
      if (data.length === 0) {
        toast.error("No results found for your search.");
      } else {
        setPhotos(data);
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchPhotosWithTopic(topic, nextPage);

      if (data.length === 0) {
        toast.error("No more images to load.");
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]); 
        setPage(nextPage); 
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleImageClick = (imageUrl) => {
    openModal(imageUrl); 
  };

  useEffect(() => {
    console.log("Application loaded. Waiting for user input.");
  }, []);

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery photos={photos} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {photos.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {error && <ErrorMessage message={errorMessage} />}
      <ImageModal
        isOpen={modalIsOpen}
        image={selectedImage}
        onClose={closeModal} 
      />
    </div>
  );
}

export default App;
