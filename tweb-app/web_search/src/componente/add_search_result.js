import { Fragment, useState } from 'react';
import { useNavigate } from "react-router";

export default function AddSearchResult(){

    const navigate = useNavigate()

    const [resultCategory, setResultCategory] = useState('');
    const [resultName,setResultName] = useState('')
    const [resultlink, setResultlink] = useState('');

    async function add_result(){

        const new_searchResult= {

            Category: resultCategory,
            Name: resultName,
            Link: resultlink,

        }

        try {

            await fetch("http://localhost:8080/api/new_search_result", {

                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new_searchResult)

            }).then((response) => {

                if (response.status === 200) 
                {
                    response.json().then((r) => alert(r));
                    navigate("/admin_results")      
                }
                else {
                    
                    response.json().then((r) => alert(r));
                }

            });

        } catch (err) {

            console.log(err);
        }
        


    }

    function cancel_add_result(){

        navigate("/admin_results");
    }

    return (
    
        <Fragment>
            <div id='formular'>
                <div id="titlu_formular">
                            Adaugare rezultat cautare
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
                             <input type='button' value='Adaugare' onClick={add_result} />
                            <input type='button' value='Anulare'onClick={cancel_add_result} />
                        </div>
                    </div>
                 </div>
                   
         </Fragment>
    )
}