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

// ✅ Dedicated image pools
const terrainImages: string[] = [
  "https://images.unsplash.com/photo-1594220862488-117b78382514?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
];

const houseImages: string[] = [
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154200-7f5f1d8a9f8f?auto=format&fit=crop&w=800&q=80",
];

const apartmentImages: string[] = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154200-7f5f1d8a9f8f?auto=format&fit=crop&w=800&q=80",
];

// Helper to pick random images from the correct pool
function getRandomImages(source: string[], count: number): string[] {
  const shuffled = [...source].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const getRandomAddress = () => `${Math.floor(Math.random() * 1000)} Main St`;

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
    const bathrooms =
      type === "terrain" ? 0 : Math.floor(Math.random() * 3) + 1;

    // Pick images based on type
    const images =
      type === "terrain"
        ? getRandomImages(terrainImages, 3)
        : type === "house"
          ? getRandomImages(houseImages, 3)
          : getRandomImages(apartmentImages, 3);

    return {
      id: String(i + 1),
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} in ${city}`,
      city,
      district,
      price,
      rooms,
      bathrooms,
      type,
      carSpaces,
      petsAllowed,
      nearMetro,
      address: getRandomAddress(),
      rentOrBuy: Math.random() > 0.5 ? "rent" : "buy",
      images, // ✅ correct pool per type
    };
  },
);
