import axios from "axios";


export async function switchFollowStatusPortal(userPortal){
        debugger
      axios.put(`/api/v1/portals/me/portals/${userPortal.id}`, {"watching": !userPortal.watching})
              .then(response => {
                  // can i do this actually?
                userPortal = response.data
                  // todo: di i return?
                // this is only in scope, ie in this element. I should emit it to parent https://javascript.plainenglish.io/avoid-mutating-a-prop-directly-7b127b9bca5b
                // but i dont think its necessary as the parent should just hit api any way.
                // IF problems I'd say this should be it so see the link
              })
              .catch(error => {

                console.log(error)
              })


    }