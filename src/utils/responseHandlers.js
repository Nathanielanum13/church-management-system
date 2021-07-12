import {ref} from "vue"
import {Response} from "@/models/response";

const responses = ref([])
export default function useResponseHandlers() {
    // Create response
    const createResponse = (message, code) => {
        let key = Math.floor(Math.random() * 100_000)
        responses.value.push(new Response(message, code, key))
        setTimeout(() => {
            removeResponse(key)
        }, 5000)
    }
    // Remove response
    const removeResponse = (id) => {
        responses.value = responses.value.filter((response) => response.id !== id)
    }

    return {
        responses,
        createResponse,
        removeResponse
    }
}