import React, {useState, useEffect, useCallback} from 'react'
import axios from "axios";
import Header from "../Header"
import ImageList from "../ImageList"
import constants from "../../constants"
import NoDataPlaceholder from "../NoDataPlaceholder"
import { checkHttpStatus, debounce, throttle, scrollAreaAvailable } from '../../utils';
import Modal from '../Modal';
import "./Main.css"

const Main = () => {

    const cachedQueriesFromLocalStorage = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_KEY));
    const [imageList, setImageList ] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [popUpImage, setPopUpImage] = useState(null);
    const [cachedQueries, setCachedQueries]=useState(cachedQueriesFromLocalStorage ? cachedQueriesFromLocalStorage : [])

    const handleOnChange = (query) => { 
        window.scrollTo(0,0);
        let tempCachedQueries = [...cachedQueries];
        tempCachedQueries.push(query);
        setCachedQueries([...new Set(tempCachedQueries)])
        let url = `${constants.BASE_URL}&method=flickr.photos.search&page=1&text=${query}`;
        axios.get(url)
            .then(checkHttpStatus)
            .then(res=>{
                 setImageList(res.data.photos.photo)
             }).catch(err => {
                throw new Error(err);
            });
    };

    const debounceOnChange = useCallback(debounce(handleOnChange, 400), []);

    const updateLocalStorage = () => {
		localStorage.setItem(constants.LOCAL_STORAGE_KEY, JSON.stringify(cachedQueries));
	}

    const handlePhotoSearch = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText)
        const trimmedText = searchText.replace(/\s+$/, "");
        if (trimmedText.length) debounceOnChange(trimmedText);
    }

    const handleImageClick = (idx) => {
        setPopUpImage(imageList[idx])
    }

    const onPopUpHide = () => {
        setPopUpImage(null)
    }

    const handleScroll = () => {
        let url = `${constants.BASE_URL}&method=flickr.photos.${searchText ? "search": "getRecent"}&text=${searchText}&page=${(pageNumber + 1)}`;
        axios.get(url)
          .then(checkHttpStatus)
          .then(res=>{
            setPageNumber(pageNumber+1) 
            setImageList([...imageList, ...res.data.photos.photo])
           }).catch(err => {
            throw new Error(err);
           });
    }

    useEffect(() => {
        const throttledCount = throttle(() => {
			if (scrollAreaAvailable()) return;
			handleScroll();
		}, 1000);
        window.addEventListener('scroll', throttledCount);
        return () => window.removeEventListener('scroll', throttledCount);
      }, [searchText, pageNumber]);



    useEffect(() => {
        let url = `${constants.BASE_URL}&method=flickr.photos.getRecent&page=1`;
        axios.get(url)
            .then(checkHttpStatus)
			.then(res=>{
                setImageList(res.data.photos.photo)
            }).catch(err => {
				throw new Error(err);
			});
    },[])

    useEffect(() => {
        updateLocalStorage();
    },[cachedQueries])

    return (
        <div>
            <Header searchText={searchText} cachedQueries={cachedQueries} onPhotoSearch={handlePhotoSearch}/>
            {imageList.length ? <ImageList images={imageList} onImageClick={handleImageClick}/> : <NoDataPlaceholder text="No image available for the above search query"/>}
            {popUpImage && <Modal image={popUpImage} onHide={onPopUpHide} />}
        </div>
    )
}

export default Main
