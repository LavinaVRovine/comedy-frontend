import axios from "axios";
import { ref, reactive } from 'vue'


// this is not used As i havent figured out how the composition thingy should work
export function useSwitchFollowStatusPortal(currentUserPortal) {

    // const data = ref(null)

    let error = ref(null)
    let data = reactive(currentUserPortal);
    async function fetchPortal(currentUserPortal) {
        axios.put(`/api/v1/portals/me/portals/${currentUserPortal.id}`, {"watching": !currentUserPortal.watching})
        .then(response => {
            // data.value = response.data
            debugger
            return response.data
            // this is only in scope, ie in this element. I should emit it to parent https://javascript.plainenglish.io/avoid-mutating-a-prop-directly-7b127b9bca5b
            // but i dont think its necessary as the parent should just hit api any way.
            // IF problems I'd say this should be it so see the link
        })
        .catch(err => {
            debugger
            error.value = err
            console.log(error)
        })
    }
    async function doUpdate(currentUserPortal) {
        debugger
        data = await fetchPortal(currentUserPortal);
        debugger
    }

    return {
        data,
        doUpdate,

    };
}