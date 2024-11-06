const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            favorites: [],
            characters: [],
            planets: [],
            vehicles: [],
        },
        actions: {
            // Use getActions to call a function within a function
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            loadSomeData: () => {
                /**
                    fetch().then().then(data => setStore({ "foo": data.bar }))
                */
            },
            // Fetch characters data
            fetchCharacters: async (query = "") => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/people?search=${query}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ characters: data.results });
                    } else {
                        console.error("Error fetching characters:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching characters:", error);
                }
            },
            // Fetch planets data
            fetchPlanets: async (query = "") => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/planets?search=${query}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ planets: data.results });
                    } else {
                        console.error("Error fetching planets:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching planets:", error);
                }
            },
            // Fetch vehicles data
            fetchVehicles: async (query = "") => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/vehicles?search=${query}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ vehicles: data.results });
                    } else {
                        console.error("Error fetching vehicles:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching vehicles:", error);
                }
            },
            toggleFavorite: (item) => {
                // Validate item structure
                if (!item || !item.uid || !item.name || !item.type) {
                    console.error("Invalid item passed to toggleFavorite", item);
                    return;
                }

                const store = getStore();
                const favorites = store.favorites;

                // Log the current favorites and the item to toggle
                console.log("Current Favorites:", favorites);
                console.log("Item to Toggle:", item);

                // Check if the item with both uid and type already exists in favorites
                const exists = favorites.some(fav => fav.uid === item.uid && fav.type === item.type);

                // If it exists, remove it; otherwise, add it
                const newFavorites = exists
                    ? favorites.filter(fav => !(fav.uid === item.uid && fav.type === item.type))
                    : [...favorites, { uid: item.uid, name: item.name, type: item.type }];

                // Log the updated favorites
                console.log("Updated Favorites:", newFavorites);

                // Update the store with the new favorites array
                setStore({ favorites: newFavorites });
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                // Reset the global store
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
