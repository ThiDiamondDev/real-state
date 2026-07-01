export interface Property {
  id: string;
  title: string;
  city: string;
  district: string;
  address: string;
  price: number;
  rooms: number;
  bathrooms: number;
  type: "apartment" | "house" | "terrain";
  rentOrBuy: "rent" | "buy";
  carSpaces: number;
  petsAllowed: boolean;
  nearMetro: boolean;
  images: string[]; // ✅ multiple images
}

const cities = ["São Paulo", "Rio de Janeiro", "Brasília"];
const districts = ["Centro", "Pinheiros", "Barra", "Lago Sul"];
const types: Property["type"][] = ["apartment", "house", "terrain"];
const images = [
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1594220862488-117b78382514?auto=format&fit=crop&w=800&q=80",
];
const getRandomAddress = () => `${Math.floor(Math.random() * 1000)} Main St`;
// Helper to pick random images
function getRandomImages(count: number): string[] {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const mockProperties: Property[] = Array.from({ length: 20 }).map(
  (_, i) => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const district = districts[Math.floor(Math.random() * districts.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const rooms = type === "terrain" ? 0 : Math.floor(Math.random() * 5) + 1;
    const carSpaces = Math.floor(Math.random() * 3);
    const petsAllowed = Math.random() > 0.5;
    const nearMetro = Math.random() > 0.5;
    const price = Math.floor(Math.random() * 5000) + 1000;
    const bathrooms = Math.floor(Math.random() * 3) + 1;

    return {
      id: String(i + 1),
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} in ${city}`,
      city,
      district,
      price,
      rooms,
      type,
      carSpaces,
      petsAllowed,
      nearMetro,
      bathrooms,
      address: getRandomAddress(),
      rentOrBuy: Math.random() > 0.5 ? "rent" : "buy",
      images: getRandomImages(3), // ✅ each property gets 3 random images
    };
  },
);
