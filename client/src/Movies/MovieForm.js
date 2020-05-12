import React, { useState } from 'react';

 MovieForm = () => {
     const [ movie, setMovie ] = useState({
         movie: {
             id: "",
             title: "",
             director: "",
             metascore: "",
             stars: [{
                 name: ""
             }]
         }
     })

     const handleChange = e  => {

     }

    return (
        <div>

        </div>
    )
}

export default MovieForm;