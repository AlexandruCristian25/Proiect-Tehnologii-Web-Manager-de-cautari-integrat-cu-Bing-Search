
import { TextField, Button } from '@material-ui/core';
import { Fragment, useState } from 'react';

export default function SearchWord() {

    const [searchResult, setsearchResult] = useState({

        info: {},
        loaded: false,
        loading: false
        
    });

    const [searchWord, setsearchWord] = useState('');

    async function getSearchResult() {

        setsearchResult(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {

            const result = await fetch(`http://localhost:8080/api/search/${searchWord}`);
            const info_result = await result.json();
            if (result.ok) {

                setsearchResult({

                    info: info_result,
                    loaded: true,
                    loading: false

                });
                
            }
            else {
                alert(info_result);

            }

        } catch (err) {

            setsearchResult(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });
            if (searchWord === '')
                alert('Introduceti un cuvant de cautat!')
            else
            alert("Eroare de conexiune la baza de date");

        }
    }

    return (
    
    <Fragment>

        <div id="searchBox">
            <TextField label="Search word" variant="outlined" placeholder='Nume lucrare' onChange={(event) => setsearchWord(event.target.value)}/>
            <Button id="searchButton" variant="outlined" color="success" onClick={()=>getSearchResult()}>Search</Button>
        </div>

        {searchResult.loaded &&
            <table id="ListOfWorks">
                <caption>Rezultat cautari cuvant cheie : <i>{searchWord}</i></caption>
            <tbody>
                <tr>
                    <th >Rezultat : </th>
                    <th>Link</th>
                </tr>
            {searchResult.info !== 'Cuvantul cautat nu exista!' && searchResult.info.map((r) => {

                return (
                 <Fragment key={r.ID}>
                    <tr>
                        <td> {r.Name}</td>
                        <td> {r.Link}</td>
                    </tr>
                </Fragment>
            )
         })}
        </tbody>
    </table>}

</Fragment>

)}