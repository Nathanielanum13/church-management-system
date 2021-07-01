import {ref} from 'vue'

const allServices = ref([])
export default function useService() {
    // Create services
    // Delete a service
    const deleteService = async (serviceId) => {
        try {
            await fetch(`${process.env.VUE_APP_CMS_API}/services/${serviceId}`, {
                method: 'DELETE',
                headers: {
                    "traceId": "b3d16f0b-8d51-4ecd-b8b4-f8a890bd26d2",
                    "request-type": "string",
                    "merchantNamespace": "grey-parrot"
                }
            }).then((res) => res.json())
        } catch (e) {
            throw e
        }
    }
    // Fetch all services
    const fetchAllServices = async () => {
        try {
            allServices.value = await fetch(`${process.env.VUE_APP_CMS_API}/services`, {
                method: 'GET',
                headers: {
                    "traceId": "b3d16f0b-8d51-4ecd-b8b4-f8a890bd26d2",
                    "request-type": "string",
                    "merchantNamespace": "grey-parrot"
                }
            }).then((res) => res.json()).then((data) => data)
        } catch (e) {
            //TODO Alert system for success and error
            throw e
        }
        return allServices.value
    }
    // Count all services
    const numberOfServices = () => {
        !allServices.value.length && fetchAllServices()
        return allServices.value.length
    }

    return {
        /*Methods*/
        numberOfServices,
        fetchAllServices,
        deleteService
    }
}