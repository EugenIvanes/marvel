import 'singleChar.scss';
import x_men from '../../resources/img/x-men.png'
const SingleChar = () =>{
    return(
        <div className="single-comics">
                <img src={x_men} alt=""/>
                <div className="single-comics__info">
                    <div className="single-comics__name">X-Men: Days of Future Past</div>
                    <div className="single-comics__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</div>
                    <div className="single-comics__descr">144 pages</div>
                    <div className="single-comics__descr">Language: en-us</div>
                    <div className="single-comics__price">9.99$</div>
                </div>
                <div className="single-comics__back">
                    <a href="#">Back to all</a>
                </div>
            </div>
    )
}
export default SingleChar;