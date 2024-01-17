import { Keyword } from "./sync.js";
import { SearchResult } from "./sync.js";
import {initTabels} from "./initTabels.js"


async function SequelizeAuth(sequelizeConection) {
    try {
        await sequelizeConection.authenticate();
        console.log("S-a realizat conexiunea la baza de date!");
    }
    catch (err) {
        console.log("A survenit o eroare la conexiunea bazei de date!");
    }
}
async function SequelizeSync(sequelizeConection) {
    try {
        await sequelizeConection.sync({
            force: false,
            alter: true
        });
        console.log("S-a realizat sincronizarea cu baza de date!");
    }
    catch (err) {
        console.log("A intervenit o eroare la sincronizarea cu baza de date!");
    }
}

async function SequelizeInit(sequelizeConectionInfo) {
    await SequelizeAuth(sequelizeConectionInfo);
    await SequelizeSync(sequelizeConectionInfo);
    //await initTabels();
}



//GET
async function FindAllResults() {

    let exit_msg = Array(2);
  
    try {
        
        exit_msg[0] = 200;
        exit_msg[1] = await Keyword.findAll({
    
            include: [
                {
               
                    model: SearchResult,
                       
                }
            ]
                
            });

            return exit_msg;
    
        } catch (err) {
            console.error(err);
        }
    }

//GET
async function FindResultByKeyword(key) {

    let exit_msg = Array(2);
    if (key.trim().length == 0) {

        exit_msg[0] = 400;
        exit_msg[1] = "Nu ati introdus nici un cuvant cheie pentru cautare!"
        return exit_msg;

    } else {

        try {
            exit_msg[0] = 200;
            exit_msg[1] = await Keyword.findAll({
    
                include: [
                    {
                        model: SearchResult,
                       
                    }
                ],
                where:{Name:key}
                
            });

            if (exit_msg[1].length == 0)
            {

                exit_msg[1] = await SearchResult.findAll({
                        
                            where:{Name:key}
                            
                    });
            }

            if (exit_msg[1].length==0)
            {

                exit_msg[1] = "Cuvantul cautat nu exista!"
            }

            return exit_msg;
    
        } catch (err) {
            console.error(err);
        }
    }

}

//POST
async function AddNewResult(body) {

    let exit_msg = Array(2);

    //Verificam daca informatiile introduse sunt corecte
    if (Object.keys(body).length == 0) {

        exit_msg[0] = 400;
        exit_msg[1] = "Lipseste corpul mesajului! Nu exista informatii necesare inregistrarii in baza de date!"
        return exit_msg;

    }
     else if (!body.Category || body.Category.trim().length == 0 || !body.Name || body.Name.trim().length == 0 
                    ||!body.Link || body.Link.trim().length == 0) 
     {

            exit_msg[0] = 400;
            exit_msg[1] = "Introduceti numele, linkul sau categoria cuvantului-rezultat!"
            return exit_msg;

    }
    else {
        try {

            let Keyword_id= 0;

            const KeywordID = await Keyword.findAll({
                where: { Name: body.Category }
            })

            if (KeywordID.length == 0)
            {

                await Keyword.create({

                    //Daca cuvantul cheie nu exista se adauga in baza de date si se extrasge ID-ul aferent 
                    Name: body.Category,
                }).then(result => Keyword_id = result.ID);

            }

            await SearchResult.create({

                Name: body.Name,
                Link: body.Link,
                Count:1,
                Keyword_ID: (KeywordID.length !=0)? KeywordID[0].ID : Keyword_id

            });

            exit_msg[0] = 200;
            exit_msg[1] = "Datele au fost adaugate cu succes!"
            return exit_msg;

        } catch (err){

            if (err.name == "SequelizeUniqueConstraintError") {

                exit_msg[0] = 400;
                exit_msg[1] = "Nu se pot introduce in baza de date doua texte cautate cu acelasi nume si/sau avand acelasi link!"
                return exit_msg;

            }
            if (err.name == "SequelizeForeignKeyConstraintError") {

                exit_msg[0] = 400;
                exit_msg[1] = "ID-ul aferent cuvantului-cheie este incorect!"
                return exit_msg;

            }
           
        }
    }

}

async function UpdateSearchResult(searchResultID, body) {

    let exit_msg = Array(2);

    //Se verifica daca s-a primit un "corp" valid
    if (Object.keys(body).length == 0) {

        exit_msg[0] = 400;
        exit_msg[1] = "Lipseste corpul mesajului! Nu exista informatii necesare inregistrarii in baza de date!"

    } else if (!body.Category || body.Category.trim().length == 0 || !body.Name || body.Name.trim().length == 0 
    || !body.Link || body.Link.trim().length == 0) 
    {

        exit_msg[0] = 400;
        exit_msg[1] = "Introduceti numele, linkul sau categoria cuvantului-rezultat!"
        return exit_msg;

    } else {

        if (isNaN(searchResultID)) {

            exit_msg[0] = 400;
            exit_msg[1] = "Introduceti un ID valid!";
        }
        else {
            const SearchResultRow = await SearchResult.findAll({
                where: { ID: searchResultID }
            });

            if (SearchResultRow.length == 0) {

                exit_msg[0] = 400;
                exit_msg[1] = "ID-ul nu este inregistrat in baza de date!";

            } else {

                    try {
                        const SearchResultRowId = await SearchResult.findByPk(searchResultID);

                        //Verifica, cand se schimba categoriea, daca noua categorie exista
                        let Keyword_id= 0;
                        let old_keyword_id=-1;

                        const KeywordRow = await Keyword.findAll({
                            where: { Name: body.Category }
                        })

                         //Se extrage vechiul cuvand cheie aferent rezultatului
                         await SearchResult.findAll({
                        
                            where:{ID:searchResultID}
               
                        }).then(result =>old_keyword_id = result[0].Keyword_ID);
                        
                        if (KeywordRow.length == 0)
                        {
            
                            await Keyword.create({
            
                                //Daca cuvantul cheie nu exista se adauga in baza de date si se  extrasge ID-ul aferent 
                                Name: body.Category,
                            }).then(result => Keyword_id = result.ID);

                        }

                        await SearchResultRowId.update({

                            Name: body.Name,
                            Link: body.Link,
                            Count: body.Count,
                            Keyword_ID: (KeywordRow.length !==0)? KeywordRow[0].ID : Keyword_id

                        });

                        

                        //Daca cuvantul cheie se modifica si vechiul cuvand cheie ramane fara rezultate aferente 
                        //atunci acesta se sterge
                            const SelectedRow = await Keyword.findAll({
    
                                include: [
                                    {
                                        model: SearchResult,
                                       
                                    }
                                ],
                                where:{ID:old_keyword_id}
                                
                            });

                            if(SelectedRow[0].dataValues.SearchResults.length == 0)
                            {

                                    const SelectedKeyword = await Keyword.findByPk(old_keyword_id);;

                                    await SelectedKeyword.destroy();

                            }

                        exit_msg[0] = 200;
                        exit_msg[1] = "Datele rezultatului au fost actualizate cu succes!"

                    } catch (err) {

                        //console.log(err)
                        exit_msg[0] = 400;
                        exit_msg[1] = "A interventi o eroare la actualizarea rezultatului!";
                    }
                }

            }
        }

        return exit_msg;

    }


async function DeleteSearchResult(searchResult_id) {

    let exit_msg = Array(2);
    let old_keyword_id= -1;

    if (isNaN(searchResult_id)) {

        exit_msg[0] = 400;
        exit_msg[1] = "ID-ul nu este valid!";
    }
    else {

        //se verfica daca ID-ul este valid si exista in baza de date
        const SearchResultRow = await SearchResult.findAll({

            where: { ID: searchResult_id }

        }).then(result =>{

            
            if (result.length != 0 ) 
            {
                
                old_keyword_id = result[0].dataValues.Keyword_ID
                

            }
            else
            {

                exit_msg[0] = 400;
                exit_msg[1] = "Nu exista inregistrarea in baza de date!";

            }
        });

             if (old_keyword_id != -1)
             {


                const SearchResultRow = await SearchResult.findByPk(searchResult_id);
                await SearchResultRow.destroy();

                    //Daca cuvantul cheie se sterge si cuvantul cheie ramane fara rezultate aferente 
                    //atunci acesta se sterge
                    const SelectedRow = await Keyword.findAll({
            
                            include: [{model: SearchResult }],
                            
                            where:{ID:old_keyword_id}
                                    
                    });

                    if(SelectedRow[0].dataValues.SearchResults.length == 0)
                    {
                        
                        const SelectedKeyword = await Keyword.findByPk(old_keyword_id);;

                        await SelectedKeyword.destroy();

                    }

                    exit_msg[0] = 200
                    exit_msg[1] = "Rezultatul a fost stears din baza de date!";

                } 

            }

            return exit_msg;
    }

export const OperatiiApi = {
    init: SequelizeInit,
    findResultByKeyword: FindResultByKeyword,
    findAllResults: FindAllResults,
    addNewResult : AddNewResult,
    updateSearchResult: UpdateSearchResult,
    deleteSearchResult:DeleteSearchResult
  
}