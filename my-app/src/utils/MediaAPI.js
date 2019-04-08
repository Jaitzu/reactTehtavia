
const url = 'http://media.mw.metropolia.fi/wbma/';

const getAllMedia = () => {
   return fetch(url +'media').then(res => {
       return res.json()
   }).then((result) => {
                console.log(result);
                return Promise.all(result.map(item => {
                    return fetch(url +'media/' + item.file_id).then(response => {
                        return response.json();
                    });
                })).then(items => {
                    console.log(items);
                    return items;
                    // save items to state
                });

            });

};

const getProfilePic = (profId) =>{
    return fetch( 'http://media.mw.metropolia.fi/wbma/tags/profile').then(response => {
        return response.json();
    }).then(profPic => {
        console.log(profPic);

   for(let i=0; i < profPic.length; i ++ ){
       if(profPic[i].user_id === profId ){
           console.log(profPic[i])
           return profPic[i]
       }
   }
});
};

const getSingleMedia = (id) => {
return fetch(url +'media/' + id).then(response => {
   return response.json();
}).then(items => {
console.log(items);
return items;
// save items to state
});


};

const login = (username, password) => {
const settings = {
method: 'POST',
headers: {
 'Content-Type': 'application/json',
},
body: JSON.stringify({username, password}),
};
return fetch(url + 'login', settings).then(response => {
return response.json();
});
};

const register = (user) => {
    const userInfo = {
           username: user.username,
            password: user.password,
            email: user.email,
            full_name: user.full_name,
        }


const settings = {
method: 'POST',
headers: {
 'Content-Type': 'application/json',
},
body: JSON.stringify(userInfo),
};
return fetch(url + 'users', settings).then(response => {
return response.json();
});
};

const getUser = (token) => {
const settings = {
headers: {
 'x-access-token': token,
}
};
return fetch(url + 'users/user', settings).then(response => {
return response.json();
});
}

const checkUser = (name) => {
    console.log(name)
    return fetch(url + 'users/username/' + name  ).then(response => {

        return response.json();
    });
}




export{getAllMedia}
export{getSingleMedia}
export{login}
export{register}
export{getUser}
export{getProfilePic}
export{checkUser}