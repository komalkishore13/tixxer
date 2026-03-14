/*
 * MOVIES.JS
 * =========
 * Central movie data store for Tixxer.
 * All movie information is defined here so every page stays in sync.
 * Descriptions sourced from Wikipedia.
 *
 * To update the site, edit this file — the homepage and detail pages
 * render dynamically from this data.
 */

var MOVIES = {

    // ==========================================
    // NOW SHOWING
    // ==========================================

    1: {
        title: "Interstellar",
        genre: "Sci-Fi \u00B7 Adventure",
        genres: ["Sci-Fi", "Adventure", "Drama"],
        rating: 8.7,
        year: 2014,
        duration: "2h 49m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/2ssWTSVklAEc98frZUQhgtGHx7s.jpg",
        description: "Interstellar is a 2014 epic science fiction film directed by Christopher Nolan. It follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for humanity as Earth becomes uninhabitable.",
        section: "nowShowing"
    },

    2: {
        title: "The Dark Knight",
        genre: "Action \u00B7 Drama",
        genres: ["Action", "Drama", "Crime"],
        rating: 9.0,
        year: 2008,
        duration: "2h 32m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
        description: "The Dark Knight is a 2008 superhero film directed by Christopher Nolan. Based on the DC Comics character Batman, it is the second installment in The Dark Knight trilogy, with Batman facing off against the anarchist criminal mastermind known as the Joker.",
        section: "nowShowing"
    },

    3: {
        title: "Inception",
        genre: "Sci-Fi \u00B7 Thriller",
        genres: ["Sci-Fi", "Thriller", "Action"],
        rating: 8.8,
        year: 2010,
        duration: "2h 28m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
        description: "Inception is a 2010 science fiction action film written and directed by Christopher Nolan. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets through shared dreaming.",
        section: "nowShowing"
    },

    4: {
        title: "Pulp Fiction",
        genre: "Crime \u00B7 Drama",
        genres: ["Crime", "Drama", "Comedy"],
        rating: 8.9,
        year: 1994,
        duration: "2h 34m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/96hiUXEuYsu4tcnvlaY8tEMFM0m.jpg",
        description: "Pulp Fiction is a 1994 American black comedy crime film written and directed by Quentin Tarantino. It tells four intertwining tales of crime and violence in Los Angeles, featuring an ensemble cast including John Travolta, Samuel L. Jackson, and Uma Thurman.",
        section: "nowShowing"
    },

    5: {
        title: "The Matrix",
        genre: "Sci-Fi \u00B7 Action",
        genres: ["Sci-Fi", "Action"],
        rating: 8.7,
        year: 1999,
        duration: "2h 16m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/tlm8UkiQsitc8rSuIAscQDCnP8d.jpg",
        description: "The Matrix is a 1999 science fiction action film written and directed by the Wachowskis. It stars Keanu Reeves as Neo, a computer hacker who discovers that reality as he knows it is a simulated world created by machines to subdue the human population.",
        section: "nowShowing"
    },

    6: {
        title: "Avengers: Endgame",
        genre: "Action \u00B7 Sci-Fi",
        genres: ["Action", "Sci-Fi", "Adventure"],
        rating: 8.4,
        year: 2019,
        duration: "3h 1m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
        description: "Avengers: Endgame is a 2019 superhero film produced by Marvel Studios. It is the direct sequel to Avengers: Infinity War and the 22nd film in the Marvel Cinematic Universe, following the Avengers as they attempt to reverse the devastating actions of Thanos.",
        section: "nowShowing"
    },

    7: {
        title: "Spider-Man: No Way Home",
        genre: "Action \u00B7 Adventure",
        genres: ["Action", "Adventure", "Sci-Fi"],
        rating: 8.2,
        year: 2021,
        duration: "2h 28m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/Bwh7Lol5k3hSqYOtqXWxbbJVMx.jpg",
        description: "Spider-Man: No Way Home is a 2021 superhero film based on the Marvel Comics character Spider-Man. When a spell goes wrong, dangerous villains from other universes start appearing, forcing Peter Parker to discover what it truly means to be Spider-Man.",
        section: "nowShowing"
    },

    8: {
        title: "Oppenheimer",
        genre: "Drama \u00B7 History",
        genres: ["Drama", "History", "Biography"],
        rating: 8.5,
        year: 2023,
        duration: "3h 0m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/ycnO0cjsAROSGJKuMODgRtWsHQw.jpg",
        description: "Oppenheimer is a 2023 epic biographical thriller film written and directed by Christopher Nolan. It follows the life of J. Robert Oppenheimer, the American theoretical physicist who helped develop the first nuclear weapons during World War II.",
        section: "nowShowing"
    },

    // ==========================================
    // NEW ARRIVALS
    // ==========================================

    9: {
        title: "Dune: Part Two",
        genre: "Sci-Fi \u00B7 Adventure",
        genres: ["Sci-Fi", "Adventure", "Drama"],
        rating: 8.3,
        year: 2024,
        duration: "2h 46m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/3HzGtM0JpfH2pWFGugJK22LRP6b.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/ylkdrn23p3gQcHx7ukIfuy2CkTE.jpg",
        description: "Dune: Part Two is a 2024 epic space opera film directed by Denis Villeneuve. The sequel to Dune (2021), it follows Paul Atreides as he unites with the Fremen to seek revenge against those who destroyed his family while trying to prevent a terrible future.",
        section: "newArrivals"
    },

    10: {
        title: "Inside Out 2",
        genre: "Animation \u00B7 Comedy",
        genres: ["Animation", "Comedy", "Family"],
        rating: 7.6,
        year: 2024,
        duration: "1h 36m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
        description: "Inside Out 2 is a 2024 animated coming-of-age film produced by Pixar Animation Studios. The sequel to Inside Out (2015), it follows Riley as she enters puberty and encounters new emotions including Anxiety, Envy, Ennui, and Embarrassment.",
        section: "newArrivals"
    },

    11: {
        title: "Gladiator II",
        genre: "Action \u00B7 Drama",
        genres: ["Action", "Drama", "History"],
        rating: 6.8,
        year: 2024,
        duration: "2h 28m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/4hvK1uenpT7VVClzoNqXanvgdjX.jpg",
        description: "Gladiator II is a 2024 epic historical film directed by Ridley Scott. The sequel to Gladiator (2000), it follows Lucius, the son of Lucilla, as he is forced into the gladiatorial arena and must fight for his life and legacy.",
        section: "newArrivals"
    },

    12: {
        title: "Deadpool & Wolverine",
        genre: "Action \u00B7 Comedy",
        genres: ["Action", "Comedy", "Superhero"],
        rating: 7.7,
        year: 2024,
        duration: "2h 8m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/v0Q2uYARIqui1sEBF0bCLJaliDI.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/ufpeVEM64uZHPpzzeiDNIAdaeOD.jpg",
        description: "Deadpool & Wolverine is a 2024 superhero film based on Marvel Comics. It features Deadpool teaming up with a reluctant Wolverine to save the multiverse, blending irreverent humor with high-stakes action as the 34th film in the MCU.",
        section: "newArrivals"
    },

    13: {
        title: "Furiosa: A Mad Max Saga",
        genre: "Action \u00B7 Adventure",
        genres: ["Action", "Adventure", "Sci-Fi"],
        rating: 7.4,
        year: 2024,
        duration: "2h 28m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/raph7qjAGTMXaIjVxt6ZDSXRzUr.jpg",
        description: "Furiosa: A Mad Max Saga is a 2024 post-apocalyptic action film directed by George Miller. It is a prequel to Mad Max: Fury Road, telling the origin story of the warrior Furiosa as she is kidnapped from her homeland and must fight her way through the Wasteland.",
        section: "newArrivals"
    },

    14: {
        title: "Wicked",
        genre: "Musical \u00B7 Fantasy",
        genres: ["Musical", "Fantasy", "Drama"],
        rating: 7.5,
        year: 2024,
        duration: "2h 40m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/uVlUu174iiKhsUGqnOSy46eIIMU.jpg",
        description: "Wicked is a 2024 musical fantasy film directed by Jon M. Chu. It is the first part of a two-part adaptation of the hit Broadway musical, telling the untold story of the witches of Oz \u2014 Elphaba and Glinda \u2014 before Dorothy arrived.",
        section: "newArrivals"
    },

    15: {
        title: "Alien: Romulus",
        genre: "Sci-Fi \u00B7 Horror",
        genres: ["Sci-Fi", "Horror", "Thriller"],
        rating: 7.1,
        year: 2024,
        duration: "1h 59m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/2uSWRTtCG336nuBiG8jOTEUKSy8.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg",
        description: "Alien: Romulus is a 2024 science fiction horror film directed by Fede Alvarez. Set between the events of Alien and Aliens, it follows a group of young space colonists who encounter the terrifying Xenomorph creature aboard an abandoned space station.",
        section: "newArrivals"
    },

    16: {
        title: "The Wild Robot",
        genre: "Animation \u00B7 Sci-Fi",
        genres: ["Animation", "Sci-Fi", "Adventure"],
        rating: 7.8,
        year: 2024,
        duration: "1h 42m",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/1pmXyN3sKeYoUhu5VBZiDU4BX21.jpg",
        description: "The Wild Robot is a 2024 animated science fiction film written and directed by Chris Sanders, based on Peter Brown's novel. It follows a shipwrecked robot named Roz who must learn to adapt and survive in the wilderness, eventually becoming the adoptive parent of an orphaned gosling.",
        section: "newArrivals"
    },

    // ==========================================
    // REGIONAL
    // ==========================================

    17: {
        title: "RRR",
        genre: "Action \u00B7 Drama",
        genres: ["Action", "Drama", "History"],
        rating: 7.8,
        year: 2022,
        duration: "3h 7m",
        language: "Telugu",
        price: "0.004",
        poster: "https://image.tmdb.org/t/p/w500/tjpiEnZBUAA8pdNPRKa5vP2Zpqw.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/i0Y0wP8H6SRgjr6QmuwbtQbS24D.jpg",
        description: "RRR is a 2022 Indian Telugu-language epic action drama film directed by S. S. Rajamouli. It is a fictional story about two Indian revolutionaries, Alluri Sitarama Raju and Komaram Bheem, and their fight against the British Raj.",
        section: "regional"
    },

    18: {
        title: "3 Idiots",
        genre: "Comedy \u00B7 Drama",
        genres: ["Comedy", "Drama"],
        rating: 8.4,
        year: 2009,
        duration: "2h 50m",
        language: "Hindi",
        price: "0.004",
        poster: "https://image.tmdb.org/t/p/w500/gmSRHU1Wtiatj8KoyVt8rT9ockx.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/8gT3UKtglLVpu0YfccwbmXZ5Eis.jpg",
        description: "3 Idiots is a 2009 Indian Hindi-language comedy-drama film directed by Rajkumar Hirani. The film stars Aamir Khan, R. Madhavan, and Sharman Joshi as three engineering students who challenge the rigid educational system in India.",
        section: "regional"
    },

    19: {
        title: "Dangal",
        genre: "Drama \u00B7 Sports",
        genres: ["Drama", "Sports", "Biography"],
        rating: 8.3,
        year: 2016,
        duration: "2h 41m",
        language: "Hindi",
        price: "0.004",
        poster: "https://image.tmdb.org/t/p/w500/1CoKNi3XVyijPCvy0usDbSWEXAg.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/l0fNAHLOFReQJsxCOmGWvJDnimn.jpg",
        description: "Dangal is a 2016 Indian biographical sports drama film directed by Nitesh Tiwari. It stars Aamir Khan as Mahavir Singh Phogat, a wrestler who trains his daughters Geeta and Babita to become India's first world-class female wrestlers.",
        section: "regional"
    },

    20: {
        title: "KGF: Chapter 2",
        genre: "Action \u00B7 Drama",
        genres: ["Action", "Drama", "Thriller"],
        rating: 7.0,
        year: 2022,
        duration: "2h 48m",
        language: "Kannada",
        price: "0.004",
        poster: "https://image.tmdb.org/t/p/w500/khNVygolU0TxLIDWff5tQlAhZ23.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/nsV5Mfi9FAV4w8eDsdr7uqVswOk.jpg",
        description: "KGF: Chapter 2 is a 2022 Indian Kannada-language period action film directed by Prashanth Neel. The sequel to KGF: Chapter 1, it follows Rocky's rise to power in the gold mines of Kolar and his battle against powerful enemies.",
        section: "regional"
    },

    21: {
        title: "Kalki 2898 AD",
        genre: "Sci-Fi \u00B7 Action",
        genres: ["Sci-Fi", "Action", "Fantasy"],
        rating: 6.4,
        year: 2024,
        duration: "2h 51m",
        language: "Telugu",
        price: "0.004",
        poster: "https://image.tmdb.org/t/p/w500/rstcAnBeCkxNQjNp3YXrF6IP1tW.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/o8XSR1SONnjcsv84NRu6Mwsl5io.jpg",
        description: "Kalki 2898 AD is a 2024 Indian Telugu-language epic science fiction film written and directed by Nag Ashwin. Set in a dystopian future, it features an ensemble cast including Prabhas, Amitabh Bachchan, Kamal Haasan, and Deepika Padukone.",
        section: "regional"
    },

    22: {
        title: "Animal",
        genre: "Action \u00B7 Crime",
        genres: ["Action", "Crime", "Drama"],
        rating: 6.2,
        year: 2023,
        duration: "3h 21m",
        language: "Hindi",
        price: "0.004",
        poster: "https://image.tmdb.org/t/p/w500/hr9rjR3J0xBBKmlJ4n3gHId9ccx.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/lprsAHkwMxk2iC6VZxNmV0H7g1t.jpg",
        description: "Animal is a 2023 Indian Hindi-language action drama film directed by Sandeep Reddy Vanga. It stars Ranbir Kapoor as a man with a deep, troubled bond with his father, whose quest for paternal love leads him down a violent and destructive path.",
        section: "regional"
    },

    23: {
        title: "Pathaan",
        genre: "Action \u00B7 Thriller",
        genres: ["Action", "Thriller"],
        rating: 6.8,
        year: 2023,
        duration: "2h 26m",
        language: "Hindi",
        price: "0.004",
        poster: "https://image.tmdb.org/t/p/w500/arf00BkwvXo0CFKbaD9OpqdE4Nu.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/9wRAIQeOv2qzcgpfvA4dYZKeezl.jpg",
        description: "Pathaan is a 2023 Indian Hindi-language action thriller directed by Siddharth Anand. It stars Shah Rukh Khan as a banished RAW agent who returns to stop a mercenary from unleashing a deadly attack on India.",
        section: "regional"
    },

    24: {
        title: "Jawan",
        genre: "Action \u00B7 Thriller",
        genres: ["Action", "Thriller", "Drama"],
        rating: 6.9,
        year: 2023,
        duration: "2h 49m",
        language: "Hindi",
        price: "0.004",
        poster: "https://image.tmdb.org/t/p/w500/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/5LtSjMNw6j3LkG29Oa4O0iY5U8.jpg",
        description: "Jawan is a 2023 Indian Hindi-language action thriller directed by Atlee. It stars Shah Rukh Khan in a dual role as a father and son, with a vigilante who kidnaps people to highlight social injustices and bring about systemic change.",
        section: "regional"
    },

    // ==========================================
    // COMING SOON
    // ==========================================

    25: {
        title: "Superman",
        genre: "Action \u00B7 Sci-Fi",
        genres: ["Action", "Sci-Fi", "Adventure"],
        rating: null,
        year: 2025,
        duration: "TBA",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/ldyfo0BKmz5rWtJJKCvwaNS4cJT.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/yRBc6WY3r1Fz5Cjd6DhSvzqunED.jpg",
        description: "Superman is a 2025 superhero film written and directed by James Gunn. It is the first film in the new DC Universe, following Clark Kent as he reconciles his Kryptonian heritage with his human upbringing as the Man of Steel.",
        section: "comingSoon"
    },

    26: {
        title: "Thunderbolts*",
        genre: "Action \u00B7 Adventure",
        genres: ["Action", "Adventure", "Superhero"],
        rating: null,
        year: 2025,
        duration: "TBA",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/jYCyTdPfgT01IOJWDnnetr9RDX6.jpg",
        description: "Thunderbolts* is a 2025 superhero film produced by Marvel Studios. It follows a group of antiheroes and morally ambiguous characters recruited by the government for dangerous black-ops missions, serving as the 36th film in the MCU.",
        section: "comingSoon"
    },

    27: {
        title: "The Fantastic Four: First Steps",
        genre: "Action \u00B7 Sci-Fi",
        genres: ["Action", "Sci-Fi", "Adventure"],
        rating: null,
        year: 2025,
        duration: "TBA",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/Ona6r0Aq8Gr41KBGztBibTyrYn.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/s94NjfKkcSczZ1FembwmQZwsuwY.jpg",
        description: "The Fantastic Four: First Steps is a 2025 superhero film produced by Marvel Studios. It introduces Marvel's First Family \u2014 Mr. Fantastic, Invisible Woman, Human Torch, and The Thing \u2014 into the MCU as the 37th film in the franchise.",
        section: "comingSoon"
    },

    28: {
        title: "The Batman Part II",
        genre: "Action \u00B7 Crime",
        genres: ["Action", "Crime", "Drama"],
        rating: null,
        year: 2026,
        duration: "TBA",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/hUe1G6Ziwl8b6DaaGHjhG6LQQH8.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/hUe1G6Ziwl8b6DaaGHjhG6LQQH8.jpg",
        description: "The Batman Part II is an upcoming superhero film directed by Matt Reeves. It is the sequel to The Batman (2022), continuing Robert Pattinson's portrayal of the Dark Knight as he faces new threats in Gotham City.",
        section: "comingSoon"
    },

    29: {
        title: "Avatar: Fire and Ash",
        genre: "Sci-Fi \u00B7 Adventure",
        genres: ["Sci-Fi", "Adventure", "Fantasy"],
        rating: null,
        year: 2025,
        duration: "TBA",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/g96wHxU7EnoIFwemb2RgohIXrgW.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/rtmmvqkIC5zDMEd638Es2woxbz8.jpg",
        description: "Avatar: Fire and Ash is a 2025 epic science fiction film directed by James Cameron. The third installment in the Avatar film series, it continues the story of Jake Sully and Neytiri as they encounter the Ash People, a new Na'vi clan with a darker nature.",
        section: "comingSoon"
    },

    30: {
        title: "Mission: Impossible 8",
        genre: "Action \u00B7 Thriller",
        genres: ["Action", "Thriller", "Spy"],
        rating: null,
        year: 2025,
        duration: "TBA",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/538U9snNc2fpnOmYXAPUh3zn31H.jpg",
        description: "Mission: Impossible \u2013 The Final Reckoning is a 2025 action spy film directed by Christopher McQuarrie. The eighth installment in the franchise, it follows Ethan Hunt on what may be his most dangerous and personal mission yet.",
        section: "comingSoon"
    },

    31: {
        title: "Captain America: Brave New World",
        genre: "Action \u00B7 Sci-Fi",
        genres: ["Action", "Sci-Fi", "Superhero"],
        rating: null,
        year: 2025,
        duration: "TBA",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/8eifdha9GQeZAkexgtD45546XKx.jpg",
        description: "Captain America: Brave New World is a 2025 superhero film produced by Marvel Studios. It follows Sam Wilson as the new Captain America, who finds himself in the middle of an international incident and must discover the motives behind a nefarious global plot.",
        section: "comingSoon"
    },

    32: {
        title: "Blade",
        genre: "Action \u00B7 Horror",
        genres: ["Action", "Horror", "Superhero"],
        rating: null,
        year: 2025,
        duration: "TBA",
        language: "English",
        price: "0.005",
        poster: "https://image.tmdb.org/t/p/w500/qctzZ0LmG88k2DGqNMFTUW2wXo2.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/hFtJz4TvoiJJcw2ZOMdhK22aU9P.jpg",
        description: "Blade is an upcoming Marvel Cinematic Universe film starring Mahershala Ali as the half-vampire, half-human vampire hunter Blade, who protects humanity from the undead while navigating both worlds.",
        section: "comingSoon"
    }
};

// Section definitions for rendering order
var SECTIONS = [
    { key: "nowShowing",  title: "Now Showing",  trackId: "nowShowingCarousel",  comingSoon: false },
    { key: "newArrivals", title: "New Arrivals",  trackId: "newArrivalsCarousel", comingSoon: false },
    { key: "regional",    title: "Regional",      trackId: "regionalCarousel",    comingSoon: false },
    { key: "comingSoon",  title: "Coming Soon",   trackId: "comingSoonCarousel",  comingSoon: true  }
];

/**
 * Get a movie by its ID.
 */
function getMovie(id) {
    return MOVIES[id] || null;
}

/**
 * Get all movies for a given section key.
 * Returns array of { id, data }.
 */
function getMoviesBySection(sectionKey) {
    var results = [];
    Object.keys(MOVIES).forEach(function (id) {
        if (MOVIES[id].section === sectionKey) {
            results.push({ id: parseInt(id), data: MOVIES[id] });
        }
    });
    results.sort(function (a, b) { return a.id - b.id; });
    return results;
}
