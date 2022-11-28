class MarvelService{
    _url = "https://gateway.marvel.com:443/v1/public/characters";
    _apikey = "apikey=1fdfb79ae5e68db075ac64fd115201b1";
    _offset = 0;

    getResurce = async(url)=>{
        let res = await fetch(url);
        if(!res.ok){
            throw new Error('error fetching');
        }
        return await res.json();
    };
    getAllCharacters = async (offset = this._offset) => {
        const res = await this.getResurce(`${this._url}?limit=9&offset=${offset}&${this._apikey}`);
        return res.data.results.map(this._transformCharactersForAllChar);
    }
    getCharacter = async (id) => {
        const res = await this.getResurce(`${this._url}/${id}?${this._apikey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (res) => {
        return{
            name: res.name,
            description: res.description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }
    _transformCharactersForAllChar = (res) => {
        return{
            id: res.id,
            name: res.name,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension
        }
    }
    _
}
export default MarvelService;
