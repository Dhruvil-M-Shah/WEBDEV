// Cinematic Mock Database for Movie Ticket System - Massive Upgrade

const cities = ["Delhi", "Mumbai", "Pune", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Indore", "Goa"];

// Placeholder face images for cast
const f1 = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80";
const f2 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80";
const f3 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80";

const movies = [
    {
        id: "m1",
        title: "Pushpa 2: The Rule",
        genre: "Action, Drama",
        language: "Telugu, Hindi",
        rating: "9.5",
        censor: "U/A",
        duration: "2h 55m",
        releaseDate: "15 Aug 2024",
        director: "Sukumar",
        synopsis: "The clash between Pushpa Raj and Bhanwar Singh Shekhawat continues in this epic sequel as Pushpa expands his red sandalwood smuggling empire.",
        trailer: "https://www.youtube.com/embed/1kH31L-fP5c", // placeholder or real
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
        heroImage: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1920&q=80",
        cast: [
            { name: "Allu Arjun", role: "Pushpa Raj", image: f1 },
            { name: "Rashmika Mandanna", role: "Srivalli", image: f2 },
            { name: "Fahadh Faasil", role: "Bhanwar Singh", image: f3 }
        ],
        city: ["Delhi", "Mumbai", "Pune", "Bangalore", "Hyderabad", "Chennai"],
        venueType: "multiplex",
        isFeatured: true
    },
    {
        id: "m2",
        title: "Stree 2",
        genre: "Horror, Comedy",
        language: "Hindi",
        rating: "8.9",
        censor: "U/A",
        duration: "2h 20m",
        releaseDate: "30 Aug 2024",
        director: "Amar Kaushik",
        synopsis: "The town of Chanderi is haunted again, this time by a headless ghost. It's up to Vicky and his friends to save the town.",
        trailer: "https://www.youtube.com/embed/1kH31L-fP5c",
        poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80",
        cast: [
            { name: "Rajkummar Rao", role: "Vicky", image: f1 },
            { name: "Shraddha Kapoor", role: "Mystery Woman", image: f2 }
        ],
        city: ["Delhi", "Mumbai", "Pune", "Jaipur", "Indore", "Kolkata"],
        venueType: "multiplex"
    },
    {
        id: "m3",
        title: "Kalki 2898 AD",
        genre: "Sci-Fi, Action",
        language: "Telugu, Hindi, English",
        rating: "9.2",
        censor: "U/A",
        duration: "3h 10m",
        releaseDate: "27 Jun 2024",
        director: "Nag Ashwin",
        synopsis: "A modern-day avatar of Vishnu descends to Earth to protect the world from evil forces in a dystopian future.",
        trailer: "https://www.youtube.com/embed/1kH31L-fP5c",
        poster: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&q=80",
        cast: [
            { name: "Prabhas", role: "Bhairava", image: f1 },
            { name: "Deepika Padukone", role: "SUM-80", image: f2 },
            { name: "Amitabh Bachchan", role: "Ashwatthama", image: f3 }
        ],
        city: ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Chennai", "Ahmedabad"],
        venueType: "multiplex"
    },
    {
        id: "m4",
        title: "Jawan",
        genre: "Action, Thriller",
        language: "Hindi, Tamil, Telugu",
        rating: "9.1",
        censor: "U/A",
        duration: "2h 49m",
        releaseDate: "07 Sep 2023",
        director: "Atlee",
        synopsis: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in society.",
        trailer: "https://www.youtube.com/embed/MWOtxugtBfM",
        poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&q=80",
        cast: [
            { name: "Shah Rukh Khan", role: "Azad / Vikram", image: f1 },
            { name: "Nayanthara", role: "Narmada", image: f2 },
            { name: "Vijay Sethupathi", role: "Kaalie Gaikwad", image: f3 }
        ],
        city: ["Delhi", "Mumbai", "Bangalore", "Pune", "Kolkata"],
        venueType: "multiplex"
    },
    {
        id: "m5",
        title: "Animal",
        genre: "Action, Drama",
        language: "Hindi",
        rating: "8.5",
        censor: "A",
        duration: "3h 24m",
        releaseDate: "01 Dec 2023",
        director: "Sandeep Reddy Vanga",
        synopsis: "The son of a wealthy and powerful industrialist returns from the USA to seek revenge after his father is assassinated.",
        trailer: "https://www.youtube.com/embed/DydmpctXEA8",
        poster: "https://images.unsplash.com/photo-1541363111435-5c1cbcf34199?w=400&q=80",
        cast: [
            { name: "Ranbir Kapoor", role: "Ranvijay", image: f1 },
            { name: "Anil Kapoor", role: "Balbir Singh", image: f3 },
            { name: "Rashmika Mandanna", role: "Geetanjali", image: f2 }
        ],
        city: ["Delhi", "Mumbai", "Bangalore", "Pune", "Goa"],
        venueType: "multiplex"
    },
    {
        id: "m6",
        title: "Fighter",
        genre: "Action, Thriller",
        language: "Hindi",
        rating: "8.7",
        censor: "U/A",
        duration: "2h 46m",
        releaseDate: "25 Jan 2024",
        director: "Siddharth Anand",
        synopsis: "Top IAF aviators come together in the face of imminent danger to form Air Dragons.",
        trailer: "https://www.youtube.com/embed/1kH31L-fP5c",
        poster: "https://images.unsplash.com/photo-1627885437813-f661fb469618?w=400&q=80",
        cast: [
            { name: "Hrithik Roshan", role: "Patty", image: f1 },
            { name: "Deepika Padukone", role: "Minni", image: f2 },
            { name: "Anil Kapoor", role: "Rocky", image: f3 }
        ],
        city: ["Delhi", "Mumbai", "Pune", "Kolkata"],
        venueType: "multiplex"
    },
    {
        id: "m7",
        title: "Dune: Part Two",
        genre: "Sci-Fi, Adventure",
        language: "English, Hindi",
        rating: "9.3",
        censor: "U/A",
        duration: "2h 46m",
        releaseDate: "01 Mar 2024",
        director: "Denis Villeneuve",
        synopsis: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
        trailer: "https://www.youtube.com/embed/Way9Dexny3w",
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80",
        cast: [
            { name: "Timothée Chalamet", role: "Paul Atreides", image: f1 },
            { name: "Zendaya", role: "Chani", image: f2 }
        ],
        city: ["Delhi", "Mumbai", "Bangalore", "Pune"],
        venueType: "multiplex"
    },
    {
        id: "m8",
        title: "Oppenheimer",
        genre: "Biography, Drama",
        language: "English",
        rating: "9.5",
        censor: "U/A",
        duration: "3h 0m",
        releaseDate: "21 Jul 2023",
        director: "Christopher Nolan",
        synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
        poster: "https://plus.unsplash.com/premium_photo-1678112180204-6258aa5daaa0?w=400&q=80",
        cast: [
            { name: "Cillian Murphy", role: "Oppenheimer", image: f1 },
            { name: "Emily Blunt", role: "Kitty Oppenheimer", image: f2 },
            { name: "Robert Downey Jr.", role: "Lewis Strauss", image: f3 }
        ],
        city: ["Delhi", "Mumbai", "Bangalore"],
        venueType: "multiplex"
    }
];

const categories = {
    events: [
        {
            id: "e1", title: "Sunburn Festival", date: "28 Dec 2024", location: "Goa", time: "05:00 PM",
            poster: "https://images.unsplash.com/photo-1540575467014-1905b55e0a41?w=400&q=80",
            venueType: "concert", venueName: "Vagator Beach",
            tiers: { "GA Standing": 3500, "VIP": 8500, "VVIP": 15000 }
        },
        {
            id: "e2", title: "NH7 Weekender", date: "02 Nov 2024", location: "Pune", time: "03:00 PM",
            poster: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
            venueType: "concert", venueName: "Mahalakshmi Lawns",
            tiers: { "Under 21": 2500, "Regular Season": 4500, "VIP": 9500 }
        }
    ],
    sports: [
        {
            id: "s1", title: "IPL 2025: MI vs CSK", date: "15 Apr 2025", location: "Mumbai", time: "07:30 PM",
            poster: "https://images.unsplash.com/photo-1540747913346-19e32d15e7db?w=400&q=80",
            venueType: "stadium", venueName: "Wankhede Stadium",
            tiers: { "General Stand": 800, "Upper Tier": 1500, "Pavilion": 3000, "Premium Box": 5000 }
        },
        {
            id: "s2", title: "ISL Final", date: "12 Dec 2024", location: "Kolkata", time: "08:00 PM",
            poster: "https://images.unsplash.com/photo-1532454536657-377319fba84a?w=400&q=80",
            venueType: "stadium", venueName: "Salt Lake Stadium",
            tiers: { "East Stand": 500, "West Block": 1200, "VIP Enclosure": 3500 }
        }
    ],
    concerts: [
        {
            id: "c1", title: "Coldplay India Tour", date: "05 Jan 2025", location: "Ahmedabad", time: "06:30 PM",
            poster: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80",
            venueType: "stadium_concert", venueName: "Narendra Modi Stadium",
            tiers: { "Ground Standing": 6500, "Level 1 Seating": 4500, "Level 2 Seating": 3000, "VIP Lounge": 12500 }
        },
        {
            id: "c2", title: "Arijit Singh Live", date: "10 Feb 2025", location: "Mumbai", time: "07:00 PM",
            poster: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
            venueType: "stadium_concert", venueName: "DY Patil Stadium",
            tiers: { "General Admission": 2000, "Silver Seated": 4000, "Gold Floor": 7000, "Diamond Box": 15000 }
        }
    ],
    plays: [
        {
            id: "p1", title: "Mughal-e-Azam Musical", date: "Weekly", location: "Delhi", time: "06:00 PM",
            poster: "https://images.unsplash.com/photo-1507676184212-d0330a151f18?w=400&q=80",
            venueType: "multiplex", venueName: "JLN Stadium Auditorium",
            tiers: { "Balcony": 1000, "Ground": 2500, "Front Row VIP": 5000 }
        }
    ]
};

const theatresByCity = {
    "Delhi": [
        { name: "PVR Director's Cut", subLocation: "Ambience Mall, Vasant Kunj", features: ["M-Ticket", "F&B", "Recliners"] },
        { name: "Cinepolis IMAX", subLocation: "DLF Avenue, Saket", features: ["M-Ticket", "IMAX", "Dolby Atmos"] },
        { name: "INOX Insignia", subLocation: "Epicuria, Nehru Place", features: ["M-Ticket", "F&B", "Laser"] },
        { name: "PVR Superplex", subLocation: "Logix City Centre, Noida", features: ["M-Ticket", "4DX", "F&B"] }
    ],
    "Mumbai": [
        { name: "PVR ICON", subLocation: "Phoenix Palladium, Lower Parel", features: ["M-Ticket", "F&B", "Recliners"] },
        { name: "Cinepolis VIP", subLocation: "Nexus Seawoods, Navi Mumbai", features: ["M-Ticket", "Dolby Atmos"] },
        { name: "INOX Megaplex", subLocation: "Inorbit Mall, Malad", features: ["M-Ticket", "IMAX 3D", "F&B"] },
        { name: "PVR Maison", subLocation: "Jio World Drive, BKC", features: ["M-Ticket", "Premium", "F&B"] }
    ],
    "Pune": [
        { name: "PVR ICON", subLocation: "Pavillion Mall, S B Road", features: ["M-Ticket", "F&B"] },
        { name: "Cinepolis IMAX", subLocation: "Westend Mall, Aundh", features: ["M-Ticket", "IMAX"] },
        { name: "INOX", subLocation: "Elpro City Square, Chinchwad", features: ["M-Ticket", "Dolby 7.1"] }
    ],
    "Bangalore": [
        { name: "PVR Superplex", subLocation: "Orion Mall, Rajajinagar", features: ["M-Ticket", "4DX", "F&B"] },
        { name: "INOX Megaplex", subLocation: "RMZ Galleria Mall, Yelahanka", features: ["M-Ticket", "IMAX"] },
        { name: "Cinepolis", subLocation: "Nexus Shantiniketan, Whitefield", features: ["M-Ticket", "Dolby Atmos"] },
        { name: "PVR Director's Cut", subLocation: "Rex Walk, Brigade Road", features: ["M-Ticket", "Recliners", "F&B"] }
    ],
    "Hyderabad": [
        { name: "AMB Cinemas", subLocation: "Sarath City Capital Mall, Gachibowli", features: ["M-Ticket", "Laser", "F&B"] },
        { name: "PVR NEXT Galleria", subLocation: "Punjagutta", features: ["M-Ticket", "4DX"] },
        { name: "Prasads IMAX", subLocation: "Necklace Road", features: ["M-Ticket", "Large Format"] },
        { name: "Cinepolis", subLocation: "Mantra Mall, Attapur", features: ["M-Ticket", "Dolby 7.1"] }
    ],
    "Chennai": [
        { name: "SPI Cinemas", subLocation: "Palazzo, Forum Vijaya Mall, Vadapalani", features: ["M-Ticket", "Dolby Atmos", "F&B"] },
        { name: "PVR IMAX", subLocation: "VR Mall, Anna Nagar", features: ["M-Ticket", "IMAX"] },
        { name: "AGS Cinemas", subLocation: "T. Nagar", features: ["M-Ticket", "4K Projection"] }
    ],
    "Kolkata": [
        { name: "INOX Insignia", subLocation: "Quest Mall, Ballygunge", features: ["M-Ticket", "F&B", "Recliners"] },
        { name: "PVR IMAX", subLocation: "South City Mall", features: ["M-Ticket", "IMAX 3D"] },
        { name: "Cinepolis", subLocation: "Acropolis Mall, Kasba", features: ["M-Ticket", "Dolby 7.1"] }
    ],
    "Ahmedabad": [
        { name: "PVR", subLocation: "Acropolis Mall, SG Highway", features: ["M-Ticket", "F&B"] },
        { name: "Cinepolis", subLocation: "Alpha One Mall, Vastrapur", features: ["M-Ticket", "Dolby Atmos"] },
        { name: "NY Cinemas", subLocation: "Aamrakunj, Motera", features: ["M-Ticket", "Premium"] }
    ],
    "Jaipur": [
        { name: "INOX", subLocation: "Crystal Palm, Bais Godam", features: ["M-Ticket", "F&B"] },
        { name: "Raj Mandir Cinema", subLocation: "Bhagwant Das Road", features: ["M-Ticket", "Single Screen Heritage"] },
        { name: "Cinepolis", subLocation: "Triton Mall, Jhotwara", features: ["M-Ticket", "Dolby 7.1"] }
    ],
    "Indore": [
        { name: "PVR", subLocation: "Treasure Island Mall, MG Road", features: ["M-Ticket", "Dolby Atmos"] },
        { name: "INOX", subLocation: "C21 Mall, AB Road", features: ["M-Ticket", "F&B"] }
    ],
    "Goa": [
        { name: "INOX", subLocation: "Osia Multiplex, Margao", features: ["M-Ticket", "F&B"] },
        { name: "PVR", subLocation: "Mall De Goa, Porvorim", features: ["M-Ticket", "Dolby 7.1"] }
    ]
};
