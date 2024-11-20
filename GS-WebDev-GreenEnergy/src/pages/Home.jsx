import CardsHome from "../componentes/CardsHome";
import FirstSection from "../componentes/FirstSectionHome";
import dadosCards from "../dados/cardshome.json"
function Home() {
    return ( 
        <section>
            <FirstSection/>
            <CardsHome dadosCards={dadosCards}/>

        </section>


     );
}

export default Home;