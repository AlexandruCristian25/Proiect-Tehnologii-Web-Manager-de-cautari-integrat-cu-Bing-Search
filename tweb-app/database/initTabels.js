import { Keyword } from "./sync.js";
import { SearchResult } from "./sync.js";

export const initTabels = async function PopulateDatabase() {

    try {

        await Keyword.create({

            ID: 1,
            Name: "Social media"
           
        });

       await Keyword.create({

            ID:2,
            Name: "car"
           
        });

       await Keyword.create({

            ID:3,
            Name: "movie"
           
        });

        
       await Keyword.create({

            ID:4,
            Name: "song"
           
        });
   

        await SearchResult.create({

            Name: "Facebook",
            Link: "Link 1",
            Keyword_ID:1,
            Count:3

            
        });
       

       await SearchResult.create({

            Name: "WhatsApp",
            Link: "Link 2",
            Keyword_ID:1,
            Count:4
            
        });

        
        await SearchResult.create({

            Name: "Instagram",
            Link: "Link 3",
            Keyword_ID:1,
            Count:2
            
        });

        
        await SearchResult.create({

            Name: "Dacia",
            Link: "Link 4",
            Keyword_ID:2,
            Count:10
            
        });
        
        await SearchResult.create({

            Name: "Audi",
            Link: "Link 5",
            Keyword_ID:2,
            Count:12
            
        });

        
        await SearchResult.create({

            Name: "Citroen",
            Link: "Link 6",
            Keyword_ID:2,
            Count:7
            
        });
       
        await SearchResult.create({

            Name: "Movie 1",
            Link: "Link 7",
            Keyword_ID:3,
            Count:5
            
        });
        
        await SearchResult.create({

            Name: "Movie 2",
            Link: "Link 8",
            Keyword_ID:3,
            Count:1
            
        });
        
        await SearchResult.create({

            Name: "Movie 3",
            Link: "Link 9",
            Keyword_ID:3,
            Count:2
            
        });

        
        await SearchResult.create({

            Name: "Song 1",
            Link: "Link 10",
            Keyword_ID:4,
            Count:7
            
        });
       
        await SearchResult.create({

            Name: "Song 2",
            Link: "Link 11",
            Keyword_ID:4,
            Count:9
            
        });
       
        await SearchResult.create({

            Name: "Song 3",
            Link: "Link 12",
            Keyword_ID:4,
            Count:8
            
        });
        
        
       
    } catch (err) {

        console.error(err);

    }

}