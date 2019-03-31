
const url = 'http://media.mw.metropolia.fi/wbma/media/';

const getAllMedia = () => {
   return fetch(url).then(res => {
       return res.json()
   }).then((result) => {
                console.log(result);
                return Promise.all(result.map(item => {
                    return fetch(url + item.file_id).then(response => {
                        return response.json();
                    });
                })).then(items => {
                    console.log(items);
                    return items;
                    // save items to state
                });

            });

};


const getSingleMedia = (id) => {
    return fetch(url + id).then(response => {
        return response.json();
    }).then(items => {
    console.log(items);
    return items;
    // save items to state
});


};




export{getAllMedia}
export{getSingleMedia}


