import CardList from "../card/CardList";
import cardData from "../../data/cardData.json";
import type CardType from "../../types/Card";

function Favorites(
    { 
        favorites, 
        onUpdateFavorites 
    } 
    : { 
        favorites: string[], 
        onUpdateFavorites: (title: string) => void 
    } 
) {
    const favoriteCards = cardData.filter((card: CardType) => 
        card.title && favorites.includes(card.title)
    );

    return (
        <main className="max-w-[1100px] mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 font-[Oxygen]">My Favorites</h2>
            
            {favorites.length === 0 ? (
                <p className="text-gray-500 mt-4">You have no favorites.</p>
            ) : (
                <CardList 
                    cards={favoriteCards} 
                    favorites={favorites} 
                    onUpdateFavorites={onUpdateFavorites} 
                />
            )}
        </main>
    );
}

export default Favorites;