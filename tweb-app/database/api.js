import "./sync.js";
import {router} from "../server-init.js"
import { OperatiiApi } from "./operation-api.js";

/*Afisare toate rezultatele din baza de date*/
router.route("/search_all").get(async function FindAllResults(_, response) {

    try {
        const result = await OperatiiApi.findAllResults();

 
            response.status(200).json(result[1])
    }
    catch (err) {

        console.log(err);

    }
});

/*Afisare rezultat cautare dupa cuvant cheie*/
router.route("/search/:key").get(async function FindResultByKeyword({ params: { key } }, response) {

    try {
        const result = await OperatiiApi.findResultByKeyword(key);

        if  (result[1][0].SearchResults ==undefined) 
        {
            response.status(200).json(result[1]);
        }
        else
        {
            
            response.status(200).json(result[1][0].SearchResults)
        }

       
    }
    catch (err) {

        console.log(err);

    }
});



/*Adaugare rwwexzezultat cautare*/
router.route("/new_search_result").post(async function AddNewResult({ body }, response) {

    console.log (body)
    try {

        const result = await OperatiiApi.addNewResult(body);
        response.status(result[0]).json(result[1]);

    } catch (err) {

        console.error(err);
    }

});

/*Actualizare rezultat cautare*/
router.route("/update_search_result/:result_id").put(async function UpdateSearchResult({ params: { result_id }, body }, response) {

    try {

        const result = await OperatiiApi.updateSearchResult(+result_id, body);
        response.status(result[0]).json(result[1]);

    } catch (err) {

        console.error(err);
    }
});

/*Stergere rezultat cautare*/
router.route("/delete_search_result/:searchResult_id").delete(async function DeleteSearchResult({ params: { searchResult_id } }, response) {

    try {

        const result = await OperatiiApi.deleteSearchResult(+searchResult_id);
        response.status(result[0]).json(result[1]);

    } catch (err) {

        console.log(err);
    }


})
