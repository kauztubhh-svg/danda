import { WordEntry } from "@/lib/types";

export const CATEGORIES = [
  "ALL",
  "General",
  "Animals",
  "Food",
  "Countries",
  "Cities",
  "Sports",
  "Movies",
  "TV Shows",
  "Places",
  "Objects",
  "Professions",
  "Technology",
  "Games",
  "Nature",
  "Indian",
  "Bollywood",
  "Indian Celebrities",
  "Indian College Words",
  "Indian Food",
  "Indian Cities",
  "Indian Culture",
  "Indian Sports",
  "Cybersecurity",
  "Cyber Words"
] as const;

export const INITIAL_WORDS: Omit<WordEntry, "id">[] = [
  // ==================== CYBER WORDS & CYBERSECURITY ====================
  { word: "Firewall", category: "Cyber Words", hint: "Network perimeter shield", difficulty: "easy" },
  { word: "Phishing", category: "Cyber Words", hint: "Deceptive email scam", difficulty: "easy" },
  { word: "Encryption", category: "Cyber Words", hint: "Scrambled data protection", difficulty: "medium" },
  { word: "Malware", category: "Cyber Words", hint: "Harmful computer infection", difficulty: "easy" },
  { word: "Ransomware", category: "Cyber Words", hint: "Extortion file locking", difficulty: "medium" },
  { word: "VPN", category: "Cyber Words", hint: "Encrypted virtual tunnel", difficulty: "easy" },
  { word: "Keylogger", category: "Cyber Words", hint: "Keystroke recording spyware", difficulty: "medium" },
  { word: "Botnet", category: "Cyber Words", hint: "Zombie device army", difficulty: "medium" },
  { word: "Trojan", category: "Cyber Words", hint: "Disguised malicious payload", difficulty: "easy" },
  { word: "Spyware", category: "Cyber Words", hint: "Secret user surveillance", difficulty: "easy" },
  
  { word: "Zero Day", category: "Cybersecurity", hint: "Unpatched vulnerability", difficulty: "hard" },
  { word: "DDoS", category: "Cybersecurity", hint: "Traffic overload server crash", difficulty: "medium" },
  { word: "Social Engineering", category: "Cybersecurity", hint: "Psychological deception tactic", difficulty: "medium" },
  { word: "Penetration Testing", category: "Cybersecurity", hint: "Ethical hacking assessment", difficulty: "medium" },
  { word: "Two-Factor Auth", category: "Cybersecurity", hint: "Double step login verification", difficulty: "easy" },
  { word: "Man in the Middle", category: "Cybersecurity", hint: "Eavesdropping communication hijack", difficulty: "hard" },
  { word: "SQL Injection", category: "Cybersecurity", hint: "Database query exploit", difficulty: "hard" },
  { word: "Honeypot", category: "Cybersecurity", hint: "Decoy trap for attackers", difficulty: "medium" },
  { word: "Dark Web", category: "Cybersecurity", hint: "Hidden anonymous online marketplace", difficulty: "easy" },
  { word: "Biometrics", category: "Cybersecurity", hint: "Fingerprint or face scan", difficulty: "easy" },

  // ==================== BOLLYWOOD & INDIAN CELEBRITIES ====================
  { word: "3 Idiots", category: "Bollywood", hint: "Engineering campus comedy blockbuster", difficulty: "easy" },
  { word: "Sholay", category: "Bollywood", hint: "Classic Jai-Veeru and Gabbar blockbuster", difficulty: "easy" },
  { word: "Dangal", category: "Bollywood", hint: "Haryana wrestling biopic", difficulty: "easy" },
  { word: "Lagaan", category: "Bollywood", hint: "Colonial era cricket wager epic", difficulty: "easy" },
  { word: "PK", category: "Bollywood", hint: "Innocent extraterrestrial visitor comedy", difficulty: "easy" },
  { word: "Zindagi Na Milegi Dobara", category: "Bollywood", hint: "Spain road trip bachelor vacation", difficulty: "medium" },
  { word: "Dilwale Dulhania Le Jayenge", category: "Bollywood", hint: "Europe train journey romance saga", difficulty: "easy" },
  { word: "Kabir Singh", category: "Bollywood", hint: "Aggressive medical student heartbreak", difficulty: "easy" },
  { word: "Gangs of Wasseypur", category: "Bollywood", hint: "Coal mafia revenge epic", difficulty: "medium" },
  { word: "Stree", category: "Bollywood", hint: "Horror comedy with chanderi town legend", difficulty: "easy" },

  { word: "Virat Kohli", category: "Indian Celebrities", hint: "Record-breaking Indian cricket batsman", difficulty: "easy" },
  { word: "Shah Rukh Khan", category: "Indian Celebrities", hint: "King of Bollywood romance", difficulty: "easy" },
  { word: "A.R. Rahman", category: "Indian Celebrities", hint: "Oscar-winning music maestro of Jai Ho", difficulty: "easy" },
  { word: "Amitabh Bachchan", category: "Indian Celebrities", hint: "Legendary deep-voiced Bollywood superstar", difficulty: "easy" },
  { word: "Sachin Tendulkar", category: "Indian Celebrities", hint: "Master blaster god of batting", difficulty: "easy" },
  { word: "Deepika Padukone", category: "Indian Celebrities", hint: "Leading Bollywood actress and Om Shanti Om debutante", difficulty: "easy" },
  { word: "MS Dhoni", category: "Indian Celebrities", hint: "Captain Cool helicopter shot legend", difficulty: "easy" },
  { word: "Alia Bhatt", category: "Indian Celebrities", hint: "Highway and Gangubai leading star", difficulty: "easy" },
  { word: "Priyanka Chopra", category: "Indian Celebrities", hint: "Global icon and Quantico star", difficulty: "easy" },
  { word: "APJ Abdul Kalam", category: "Indian Celebrities", hint: "Beloved People's President and Missile scientist", difficulty: "easy" },

  // ==================== INDIAN COLLEGE WORDS ====================
  { word: "Assignment", category: "Indian College Words", hint: "Last night homework submission rush", difficulty: "easy" },
  { word: "Proxy", category: "Indian College Words", hint: "Calling attendance for an absent friend", difficulty: "easy" },
  { word: "Canteen", category: "Indian College Words", hint: "Campus hangout spot for chai and samosa", difficulty: "easy" },
  { word: "Viva", category: "Indian College Words", hint: "Nerve-wracking external examiner oral test", difficulty: "medium" },
  { word: "Backlog", category: "Indian College Words", hint: "Pending semester exam retry", difficulty: "medium" },
  { word: "Placements", category: "Indian College Words", hint: "Final year on-campus corporate hiring", difficulty: "easy" },
  { word: "Hostel", category: "Indian College Words", hint: "Late night student dormitory life", difficulty: "easy" },
  { word: "Fests", category: "Indian College Words", hint: "Annual campus cultural event festival", difficulty: "easy" },
  { word: "Chai Tapri", category: "Indian College Words", hint: "Tea stall outside campus gates", difficulty: "easy" },
  { word: "Bunk", category: "Indian College Words", hint: "Skipping lecture to chill outside", difficulty: "easy" },
  { word: "Mass Bunk", category: "Indian College Words", hint: "Whole class mutually skipping lecture together", difficulty: "easy" },
  { word: "Maggu", category: "Indian College Words", hint: "Student who studies non-stop in the library", difficulty: "medium" },

  // ==================== INDIAN FOOD ====================
  { word: "Samosa", category: "Indian Food", hint: "Triangular crispy spiced potato pastry", difficulty: "easy" },
  { word: "Biryani", category: "Indian Food", hint: "Fragrant spiced basmati rice preparation", difficulty: "easy" },
  { word: "Butter Chicken", category: "Indian Food", hint: "Rich velvety tomato gravy poultry dish", difficulty: "easy" },
  { word: "Dosa", category: "Indian Food", hint: "Crispy fermented crepe served with sambar", difficulty: "easy" },
  { word: "Pani Puri", category: "Indian Food", hint: "Hollow crisp spheres filled with spicy mint water", difficulty: "easy" },
  { word: "Jalebi", category: "Indian Food", hint: "Orange spiraled sweet soaked in syrup", difficulty: "easy" },
  { word: "Pav Bhaji", category: "Indian Food", hint: "Spiced mashed vegetable curry with buttered buns", difficulty: "easy" },
  { word: "Gulab Jamun", category: "Indian Food", hint: "Warm berry-shaped milk dumpling in cardamom syrup", difficulty: "easy" },
  { word: "Chole Bhature", category: "Indian Food", hint: "Spicy chickpea gravy with fluffy deep-fried bread", difficulty: "easy" },
  { word: "Idli", category: "Indian Food", hint: "Steamed fluffy white rice cake breakfast", difficulty: "easy" },
  { word: "Rasgulla", category: "Indian Food", hint: "Spongy white cottage cheese balls in clear syrup", difficulty: "easy" },

  // ==================== INDIAN CITIES ====================
  { word: "Mumbai", category: "Indian Cities", hint: "Financial capital and city of dreams", difficulty: "easy" },
  { word: "Delhi", category: "Indian Cities", hint: "Historic national capital and street food hub", difficulty: "easy" },
  { word: "Bangalore", category: "Indian Cities", hint: "Silicon Valley of India and garden city", difficulty: "easy" },
  { word: "Kolkata", category: "Indian Cities", hint: "City of Joy famous for howrah bridge and sweets", difficulty: "easy" },
  { word: "Chennai", category: "Indian Cities", hint: "Southern coastal hub of carnatic music and marina beach", difficulty: "easy" },
  { word: "Goa", category: "Indian Cities", hint: "Sunny tropical coastal beach party getaway", difficulty: "easy" },
  { word: "Hyderabad", category: "Indian Cities", hint: "City of pearls and Charminar", difficulty: "easy" },
  { word: "Jaipur", category: "Indian Cities", hint: "Pink City filled with royal palaces and forts", difficulty: "easy" },
  { word: "Varanasi", category: "Indian Cities", hint: "Spiritual ancient holy ghats along the Ganges", difficulty: "easy" },
  { word: "Pune", category: "Indian Cities", hint: "Oxford of the East and IT hub", difficulty: "easy" },

  // ==================== INDIAN CULTURE & INDIAN SPORTS ====================
  { word: "Diwali", category: "Indian Culture", hint: "Grand festival of lights and clay lamps", difficulty: "easy" },
  { word: "Holi", category: "Indian Culture", hint: "Joyous spring celebration of vibrant powder colors", difficulty: "easy" },
  { word: "Yoga", category: "Indian Culture", hint: "Ancient meditative physical posturing and breathwork", difficulty: "easy" },
  { word: "Ayurveda", category: "Indian Culture", hint: "Traditional holistic herbal wellness system", difficulty: "medium" },
  { word: "Namaste", category: "Indian Culture", hint: "Respectful folded hands greeting", difficulty: "easy" },
  { word: "Garba", category: "Indian Culture", hint: "Navratri circular stick folk dance", difficulty: "easy" },
  { word: "Rangoli", category: "Indian Culture", hint: "Floor art pattern made with colored powder", difficulty: "easy" },

  { word: "Cricket", category: "Indian Sports", hint: "Gentleman's game of 22 yards and wickets", difficulty: "easy" },
  { word: "Kabaddi", category: "Indian Sports", hint: "Breath-holding raider tagging team contest", difficulty: "medium" },
  { word: "Hockey", category: "Indian Sports", hint: "National stick and turf Olympic medal tradition", difficulty: "easy" },
  { word: "Badminton", category: "Indian Sports", hint: "Shuttlecock net duel played with rackets", difficulty: "easy" },
  { word: "Kho Kho", category: "Indian Sports", hint: "Traditional tag contest of alternating chase rows", difficulty: "medium" },
  { word: "Chess", category: "Indian Sports", hint: "Grandmaster 64-square strategy board match", difficulty: "easy" },

  // ==================== GLOBAL SPORTS ====================
  { word: "Football", category: "Sports", hint: "World cup 90-minute goal kicking pitch match", difficulty: "easy" },
  { word: "Basketball", category: "Sports", hint: "Dribbling and shooting into an elevated hoop net", difficulty: "easy" },
  { word: "Tennis", category: "Sports", hint: "Grand slam court duel over a central net", difficulty: "easy" },
  { word: "Swimming", category: "Sports", hint: "Freestyle aquatic race across pool lanes", difficulty: "easy" },
  { word: "Boxing", category: "Sports", hint: "Pugilistic knockout bout inside a square ring", difficulty: "easy" },
  { word: "Formula 1", category: "Sports", hint: "High speed Grand Prix motorsport circuit racing", difficulty: "easy" },
  { word: "Golf", category: "Sports", hint: "Putting into 18 holes across green fairways", difficulty: "easy" },
  { word: "Volleyball", category: "Sports", hint: "Spiking and setting an inflated ball across a high net", difficulty: "easy" },

  // ==================== GENERAL & OBJECTS ====================
  { word: "Guitar", category: "Objects", hint: "Six-stringed acoustic musical instrument", difficulty: "easy" },
  { word: "Bicycle", category: "Objects", hint: "Pedal-driven two-wheel commuter", difficulty: "easy" },
  { word: "Umbrella", category: "Objects", hint: "Canopy shield against rain and sun", difficulty: "easy" },
  { word: "Wristwatch", category: "Objects", hint: "Hand-worn timepiece dial", difficulty: "easy" },
  { word: "Telescope", category: "Objects", hint: "Stargazing optical lens tube", difficulty: "easy" },
  { word: "Headphones", category: "Objects", hint: "Ear-worn private audio cups", difficulty: "easy" },
  { word: "Backpack", category: "Objects", hint: "Shoulder-strapped travel bag", difficulty: "easy" },
  { word: "Compass", category: "Objects", hint: "Magnetic needle navigation tool", difficulty: "easy" },
  { word: "Passport", category: "Objects", hint: "Official booklet for international border travel", difficulty: "easy" },

  // ==================== ANIMALS & NATURE ====================
  { word: "Lion", category: "Animals", hint: "Roaring feline king of the African savanna", difficulty: "easy" },
  { word: "Elephant", category: "Animals", hint: "Giant tusker with a versatile long trunk", difficulty: "easy" },
  { word: "Penguin", category: "Animals", hint: "Tuxedo-feathered polar waddling swimmer", difficulty: "easy" },
  { word: "Kangaroo", category: "Animals", hint: "Pouch-bearing Australian hopping marsupial", difficulty: "easy" },
  { word: "Dolphin", category: "Animals", hint: "Playful acrobatic intelligent marine mammal", difficulty: "easy" },
  { word: "Giraffe", category: "Animals", hint: "Tallest spotted creature grazing high treetops", difficulty: "easy" },
  { word: "Octopus", category: "Animals", hint: "Eight-tentacled sea creature with ink defense", difficulty: "easy" },
  { word: "Panda", category: "Animals", hint: "Black and white bamboo munching bear", difficulty: "easy" },
  
  { word: "Volcano", category: "Nature", hint: "Mountain erupting molten magma", difficulty: "easy" },
  { word: "Waterfall", category: "Nature", hint: "River cascade plunging over a rocky cliff", difficulty: "easy" },
  { word: "Glacier", category: "Nature", hint: "Massive slow-moving body of dense polar ice", difficulty: "medium" },
  { word: "Desert", category: "Nature", hint: "Arid expanse of shifting sand dunes", difficulty: "easy" },
  { word: "Rainbow", category: "Nature", hint: "Multi-colored atmospheric light arc after rainfall", difficulty: "easy" },
  { word: "Tornado", category: "Nature", hint: "Violently rotating funnel cloud column", difficulty: "easy" },

  // ==================== FOOD ====================
  { word: "Pizza", category: "Food", hint: "Italian round dough topped with melted cheese", difficulty: "easy" },
  { word: "Sushi", category: "Food", hint: "Vinegared Japanese rice rolled with raw seafood", difficulty: "easy" },
  { word: "Burger", category: "Food", hint: "Patty enclosed between two sliced round sesame buns", difficulty: "easy" },
  { word: "Tacos", category: "Food", hint: "Folded Mexican tortilla with spiced meat and salsa", difficulty: "easy" },
  { word: "Croissant", category: "Food", hint: "Flaky buttery crescent-shaped French pastry", difficulty: "easy" },
  { word: "Pancake", category: "Food", hint: "Flat griddle cake drenched in maple syrup", difficulty: "easy" },
  { word: "Ice Cream", category: "Food", hint: "Chilled dairy dessert served in a waffle cone", difficulty: "easy" },
  { word: "Ramen", category: "Food", hint: "Japanese noodle soup served with broth and boiled egg", difficulty: "easy" },

  // ==================== PROFESSIONS & TECHNOLOGY ====================
  { word: "Doctor", category: "Professions", hint: "Healthcare expert treating clinic patients", difficulty: "easy" },
  { word: "Astronaut", category: "Professions", hint: "Space traveler conducting zero-g orbital missions", difficulty: "easy" },
  { word: "Chef", category: "Professions", hint: "Culinary artist running restaurant kitchens", difficulty: "easy" },
  { word: "Architect", category: "Professions", hint: "Building planner drafting blueprints", difficulty: "easy" },
  { word: "Pilot", category: "Professions", hint: "Cockpit navigator flying passenger airplanes", difficulty: "easy" },
  { word: "Firefighter", category: "Professions", hint: "Emergency rescuer battling blazes with hoses", difficulty: "easy" },
  { word: "Detective", category: "Professions", hint: "Mystery investigator solving crime clues", difficulty: "easy" },

  { word: "Smartphone", category: "Technology", hint: "Touchscreen pocket computer with mobile apps", difficulty: "easy" },
  { word: "Artificial Intelligence", category: "Technology", hint: "Machine neural systems mimicking human cognitive tasks", difficulty: "medium" },
  { word: "Virtual Reality", category: "Technology", hint: "Immersive 3D headset simulated environment", difficulty: "easy" },
  { word: "Satellite", category: "Technology", hint: "Orbital space craft beaming communication signals", difficulty: "easy" },
  { word: "Drones", category: "Technology", hint: "Unmanned multi-rotor flying aerial camera", difficulty: "easy" },
  { word: "Electric Vehicle", category: "Technology", hint: "Battery-powered rechargeable zero-emission car", difficulty: "easy" },

  // ==================== COUNTRIES & CITIES ====================
  { word: "Japan", category: "Countries", hint: "Land of the rising sun and cherry blossoms", difficulty: "easy" },
  { word: "Brazil", category: "Countries", hint: "South American nation of samba and Amazon rainforest", difficulty: "easy" },
  { word: "Egypt", category: "Countries", hint: "Ancient land of Pharaohs and the Giza Sphinx", difficulty: "easy" },
  { word: "France", category: "Countries", hint: "European nation famous for the Eiffel Tower and fine cuisine", difficulty: "easy" },
  { word: "Australia", category: "Countries", hint: "Island continent of Outback wildlife and Sydney Opera House", difficulty: "easy" },
  { word: "Canada", category: "Countries", hint: "Northern nation of maple leaf flag and freezing winters", difficulty: "easy" },

  { word: "Tokyo", category: "Cities", hint: "Crowded neon metropolis with Shibuya crossing", difficulty: "easy" },
  { word: "Paris", category: "Cities", hint: "City of lights alongside the river Seine", difficulty: "easy" },
  { word: "New York", category: "Cities", hint: "The Big Apple and Times Square skyscraper hub", difficulty: "easy" },
  { word: "London", category: "Cities", hint: "Capital on the Thames with Big Ben and red double-deckers", difficulty: "easy" },
  { word: "Dubai", category: "Cities", hint: "Desert metropolis of the Burj Khalifa skyscraper", difficulty: "easy" },

  // ==================== MOVIES, TV SHOWS & GAMES ====================
  { word: "Inception", category: "Movies", hint: "Dream heist inside multiple subconscious layers", difficulty: "medium" },
  { word: "Titanic", category: "Movies", hint: "Unsinkable ship romantic tragedy at sea", difficulty: "easy" },
  { word: "The Matrix", category: "Movies", hint: "Red pill simulated reality and dodging bullets", difficulty: "medium" },
  { word: "Avatar", category: "Movies", hint: "Blue Na'vi alien world of Pandora", difficulty: "easy" },
  { word: "Jurassic Park", category: "Movies", hint: "Cloned prehistoric dinosaur attraction disaster", difficulty: "easy" },
  { word: "Interstellar", category: "Movies", hint: "Deep space wormhole voyage to save humanity", difficulty: "medium" },

  { word: "Game of Thrones", category: "TV Shows", hint: "Westeros battle for the iron throne", difficulty: "easy" },
  { word: "Breaking Bad", category: "TV Shows", hint: "Chemistry teacher entering blue crystal trade", difficulty: "easy" },
  { word: "Stranger Things", category: "TV Shows", hint: "Hawkins 80s kids fighting the Upside Down", difficulty: "easy" },
  { word: "The Office", category: "TV Shows", hint: "Paper company mockumentary with quirky boss", difficulty: "easy" },
  { word: "Money Heist", category: "TV Shows", hint: "The Professor's crew wearing Dali masks at the mint", difficulty: "easy" },

  { word: "Minecraft", category: "Games", hint: "Block sandbox survival and crafting world", difficulty: "easy" },
  { word: "Monopoly", category: "Games", hint: "Real estate board contest of buying properties and hotels", difficulty: "easy" },
  { word: "GTA", category: "Games", hint: "Open-world crime city driving and missions", difficulty: "easy" },
  { word: "Among Us", category: "Games", hint: "Spaceship crewmate task finding the traitor", difficulty: "easy" },
  { word: "Uno", category: "Games", hint: "Color and number deck contest with reverse and draw 4", difficulty: "easy" },

  // ==================== GENERAL & PLACES ====================
  { word: "Hospital", category: "Places", hint: "Emergency care facility with medical wards", difficulty: "easy" },
  { word: "Library", category: "Places", hint: "Quiet sanctuary full of books and reading desks", difficulty: "easy" },
  { word: "Airport", category: "Places", hint: "Terminal hub where commercial flights take off", difficulty: "easy" },
  { word: "Museum", category: "Places", hint: "Exhibition hall for historical artifacts and art", difficulty: "easy" },
  { word: "Cinema", category: "Places", hint: "Dark auditorium with giant projector screen and popcorn", difficulty: "easy" },
  
  { word: "Time Travel", category: "General", hint: "Hypothetical chronal journey into the past or future", difficulty: "medium" },
  { word: "Superpower", category: "General", hint: "Extraordinary ability like flight or invisibility", difficulty: "easy" },
  { word: "Treasure Hunt", category: "General", hint: "Searching for hidden loot using a map", difficulty: "easy" },
  { word: "Mirage", category: "General", hint: "Optical illusion of water in hot weather", difficulty: "medium" },
  { word: "Echo", category: "General", hint: "Sound reverberation in an empty canyon", difficulty: "easy" }
];

export const words: WordEntry[] = INITIAL_WORDS.map((w, i) => ({
  ...w,
  id: `word-${i + 1}`,
}));

export const getWordsByCategory = (category: string): WordEntry[] => {
  if (!category || category === "ALL") {
    return words;
  }
  
  // If Indian super-category is selected, include all Indian sub-categories too
  if (category === "Indian") {
    return words.filter(w => 
      w.category === "Indian" ||
      w.category.startsWith("Indian ") ||
      w.category === "Bollywood"
    );
  }

  // If Sports category is selected, include both generic Sports and Indian Sports
  if (category === "Sports") {
    return words.filter(w => w.category === "Sports" || w.category === "Indian Sports");
  }

  return words.filter(w => w.category.toLowerCase() === category.toLowerCase());
};