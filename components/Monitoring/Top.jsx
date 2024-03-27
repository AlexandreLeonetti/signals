import FearGreed from "./FearGreed";
import TopElement from "./TopElement";


const Top = ({fng, text, ranking}) => {
    return(
        <div  className="mx-auto max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 px-4 pt-4">  
            <FearGreed
                fng = {fng}
                text={text}
            />
            <TopElement key="1" what="averageOfTen" ranking = {ranking} />
            <TopElement key="2" what="averageOf20" ranking = {ranking}/>
        </div>
    )
}


export default Top; 