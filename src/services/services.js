import {useHttp} from '../hooks/http.hook';
const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const getAllCharacters = async (offset = process.env.REACT_APP_OFFSET) => {
        const res = await request(`${process.env.REACT_APP_API_CHARACTER_URL}?limit=9&offset=${offset}&${process.env.REACT_APP_API_KEY}`);
        return res.data.results.map(_transformCharactersForAllChar);
    }
    const getCharacter = async (id) => {
        const res = await request(`${process.env.REACT_APP_API_CHARACTER_URL}/${id}?${process.env.REACT_APP_API_KEY}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = process.env.REACT_APP_OFFSET) => {
        const res = await request(`${process.env.REACT_APP_API_COMICS_URL}?limit=8&offset=${offset}&${process.env.REACT_APP_API_KEY}`);
        return res.data.results.map(_transformComicsForAllChar);
    }
    const _transformCharacter = (res) => {
        return{
            name: res.name,
            description: res.description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }
    const _transformCharactersForAllChar = (res) => {
        return{
            id: res.id,
            name: res.name,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension
        }
    }
    const _transformComicsForAllChar = (res) => {
        return{
            id: res.id,
            title: res.title,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension
        }
    }
    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics};
}

export default useMarvelService;
