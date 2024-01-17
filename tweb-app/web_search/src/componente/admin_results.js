import {  Button } from '@material-ui/core';
import { Fragment, useState,useEffect } from 'react';

export default function AdminResults() {

    const [searchResult, setSearchResult] = useState({

        info: {},
        loaded: false,
        loading: false
        
    });
    
    const [editResult, setEditResult] = useState(false);
    const [resultCategory, setResultCategory] = useState('');
    const [resultName,setResultName] = useState('')
    const [resultlink, setResultlink] = useState('');
    const[resultCount, setResultCount] = useState(-1);
    const [resultId, setResultId]=useState(-1)

    useEffect(()=>{

        if(!searchResult.loaded)
            getSearchResult();


    },[searchResult.loaded])

    async function  delete_search_result(idResult){

        await fetch(`http://localhost:8080/api/delete_search_result/${idResult}`, {

        method: "DELETE",
        headers: {
            "Contect-Type": "application/json"
        }
    }).then((response) => {

            response.json().then((resp) => alert(resp)).then(_ => {
            window.location.reload()

        }).catch(err => console.log(err))

    })
}

    async function getSearchResult() {

        setSearchResult(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {

            const result = await fetch(`http://localhost:8080/api/search_all`);
            const info_result = await result.json();
            if (result.ok) {

                setSearchResult({

                    info: info_result,
                    loaded: true,
                    loading: false

                });
                
            }
            else {
                alert(info_result);

            }

        } catch (err) {

            setSearchResult(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });
           
            alert("Eroare de conexiune la baza de date");

        }
    }

    function edit_search_result(category,result){

        setResultCategory(category);
        setResultName(result.Name);
        setResultlink(result.Link);
        setResultCount(result.Count);
        setResultId(result.ID);

        

       setEditResult(true);

    }

    async function update_result(){

      const updated_Result = {
            Category: resultCategory,
            Name: resultName,
            Link: resultlink,
            Count:resultCount

        };


        await fetch(`http://localhost:8080/api/update_search_result/${resultId}`, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updated_Result)}).then((response) => {

            response.json().then((raspuns) => alert(raspuns)).then(_ => {

                
                setEditResult(false);
                window.location.reload()
            })

        }).catch((err) => console.log(err));


    }

    function cancel_update_result(){

        setEditResult(false);

    }

    return (
    
    <Fragment>
        <Button href="../new_result" id ="AddButton"> 
            Adauga rezultat nou
        </Button>

        {!editResult && searchResult.loaded &&

            <table id="ListOfWorks">
                <caption>Lista cautari baza de date : </caption>
                <tbody>
                    <tr>
                        <th >Cuvant cheie </th>
                        <th >Rezultat </th>
                        <th>Link</th>
                        <th>Optiuni</th>
                    </tr>
                    {searchResult.info !== 'Cuvantul cautat nu exista!' && searchResult.info.map((key) => {

                        return Array.from(key.SearchResults.values()).map((result)=>{

                            return (
                                <Fragment key={key.ID}>
                                <tr>
                                    <td> {key.Name}</td>
                                    <td> {result.Name}</td>
                                    <td> {result.Link}</td>
                                    <td>
                                        <Button  id="deleteButton" 
                                            onClick={function onClick() {
            
                                                delete_search_result(result.ID);
            
                                            }}
                                        >
                                            Sterge
                                        </Button>

                                        <Button  id="editButton"
                                            onClick={function onClick() {
                                                
                                               
                                                edit_search_result(key.Name,result);
            
                                            }}
                                        >
                                            Editare
                                        </Button>
                                    </td>
                                </tr>
                            </Fragment>
                        )

                        })
                })}
            </tbody>
        </table>
        }
      
         {editResult && 
         
            <Fragment>
                 <div id='formular'>
                    <div id="titlu_formular">
                        Actualizare rezultat cautare
                    </div>
                    <div>
                        <div>
                            <input type='text' placeholder='categorie' defaultValue={resultCategory} 
                                onChange={(event) => setResultCategory(event.target.value)} />
                        </div>
                        <div>
                            <input type='text' placeholder='Rezultat' defaultValue={resultName} 
                                onChange={(event) => setResultName(event.target.value)} />
                        </div>
                        <div>
                            <input type='text' placeholder='Link' defaultValue={resultlink} 
                                onChange={(event) => setResultlink(event.target.value)} />
                        </div>
                        <div>
                            <input type='button' value='Actualizare' onClick={update_result} />
                            <input type='button' value='Anulare' onClick={cancel_update_result}/>
                        </div>
                    </div>
                 </div>
               
            </Fragment>
        }

</Fragment>

)

}