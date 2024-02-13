import { defineStore } from "pinia";
import { ref } from "vue";

const useLoginStatus = defineStore(
    "loginStatus",
    () => {
        const loginStatus = ref(false);
        const setLoginStatus = (status: boolean) => {
            loginStatus.value = status
        }
        return {
            loginStatus,
            setLoginStatus
        }
    }
)

export default useLoginStatus;