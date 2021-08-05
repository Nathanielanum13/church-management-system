import {ref} from 'vue'
import useResponseHandlers from "@/utils/responseHandlers";
import {httpStatusCode} from "@/models/response";


const allServices = ref([])
// For real api
/*export default function useService() {
    // Create services
    const createService = async (newService) => {
        try {
            await fetch(`${process.env.VUE_APP_CMS_API}/services`, {
                method: 'POST',
                headers: {
                    "traceId": "b3d16f0b-8d51-4ecd-b8b4-f8a890bd26d2",
                    "request-type": "string",
                    "merchantNamespace": "dp0f2",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newService)
            })
                .then(res => res.json())
                .then(data => {
                    createResponse(data.data.uiMessage, httpStatusCode.SUCCESS)
                    allServices.value.push({ ...newService, id: data.data.id})
                })
        } catch (e) {
            createResponse('Failed to create service', 400)
            throw e
        }

    }

    // Update a service
    const updateService = async (serviceToUpdate) => {
        try {
            await fetch(`${process.env.VUE_APP_CMS_API}/services/${serviceToUpdate.id}`, {
                method: "PUT",
                headers: {
                    "traceId": "b3d16f0b-8d51-4ecd-b8b4-f8a890bd26d2",
                    "request-type": "string",
                    "merchantNamespace": "dp0f2",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(serviceToUpdate)
            })
                .then(res => res.json())
                .then(data => {
                    createResponse(data.data.uiMessage, httpStatusCode.SUCCESS)
                    allServices.value = allServices.value.map(service => {
                        return service?.id === serviceToUpdate.id ? data.data : service
                    })
            })
        } catch (e) {
            createResponse('Failed to update service', 400)
            throw e
        }
    }

    // Delete a service
    const {createResponse} = useResponseHandlers()
    const deleteService = async (serviceId) => {
        try {
            await fetch(`${process.env.VUE_APP_CMS_API}/services/${serviceId}`, {
                method: 'DELETE',
                headers: {
                    "traceId": "b3d16f0b-8d51-4ecd-b8b4-f8a890bd26d2",
                    "request-type": "string",
                    "merchantNamespace": "dp0f2"
                }
            }).then((res) => res.json()).then(data => {
                createResponse(data.data.uiMessage, httpStatusCode.SUCCESS)
            })
        } catch (e) {
            createResponse('Failed to delete service', 400)
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
                    "merchantNamespace": "dp0f2"
                }
            }).then((res) => res.json()).then((data) => data.data)
        } catch (e) {
            //TODO Alert system for success and error
            createResponse('Couldn\'t fetch services. Check connection', 400)
            throw e
        }
        return allServices.value
    }
    // Count all services
    const numberOfServices = async () => {
        !allServices.value.length && await fetchAllServices()
        return allServices.value.length
    }

    return {
        allServices,
        /!*Methods*!/
        numberOfServices,
        fetchAllServices,
        deleteService,
        createService,
        updateService
    }
}*/

// For json server
export default function useService() {
    // Create a service
    const createService = async (newService) => {
        try {
            await fetch(`${process.env.VUE_APP_CMS_LOCAL_API}/services`, {
                method: 'POST',
                headers: {
                    "traceId": "b3d16f0b-8d51-4ecd-b8b4-f8a890bd26d2",
                    "request-type": "string",
                    "merchantNamespace": "dp0f2",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({...newService, createdOn: `1`, updateOn: `1`})
            })
                .then(res => res.json())
                .then(data => {
                    createResponse("Service created Successfully", httpStatusCode.SUCCESS)
                    allServices.value.push({ ...newService, id: data.id})
                })
        } catch (e) {
            createResponse('Failed to create service', 400)
            throw e
        }

    }

    // Update a service
    const updateService = async (serviceToUpdate) => {
        try {
            await fetch(`${process.env.VUE_APP_CMS_LOCAL_API}/services/${serviceToUpdate.id}`, {
                method: "PUT",
                headers: {
                    "traceId": "b3d16f0b-8d51-4ecd-b8b4-f8a890bd26d2",
                    "request-type": "string",
                    "merchantNamespace": "dp0f2",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({...serviceToUpdate, updatedOn: `2`})
            }).then(res => res.json()).then(data => {
                createResponse("Service updated Successfully", httpStatusCode.SUCCESS)
                allServices.value = allServices.value.map(service => {
                    return service?.id === serviceToUpdate.id ? data : service
                })
            })
        } catch (e) {
            createResponse('Failed to update service', 400)
            throw e
        }
    }

    // Delete a service
    const {createResponse} = useResponseHandlers()
    const deleteService = async (serviceId) => {
        try {
            await fetch(`${process.env.VUE_APP_CMS_LOCAL_API}/services/${serviceId}`, {
                method: 'DELETE',
                headers: {
                    "traceId": "b3d16f0b-8d51-4ecd-b8b4-f8a890bd26d2",
                    "request-type": "string",
                    "merchantNamespace": "dp0f2"
                }
            }).then((res) => res.json()).then(data => {
                createResponse("Service Deleted Successfully", httpStatusCode.SUCCESS)
            })
        } catch (e) {
            createResponse('Failed to delete service', httpStatusCode.ERROR)
            throw e
        }
    }
    // Fetch all services
    const fetchAllServices = async () => {
        try {
            allServices.value = await fetch(`${process.env.VUE_APP_CMS_LOCAL_API}/services`, {
                method: 'GET',
                headers: {
                    "traceId": "b3d16f0b-8d51-4ecd-b8b4-f8a890bd26d2",
                    "request-type": "string",
                    "merchantNamespace": "dp0f2"
                }
            }).then((res) => res.json()).then((data) => data)
        } catch (e) {
            //TODO Alert system for success and error
            createResponse('Couldn\'t fetch services. Check connection', 400)
            throw e
        }
        return allServices.value
    }
    // Count all services
    const numberOfServices = async () => {
        !allServices.value.length && await fetchAllServices()
        return allServices.value.length
    }

    return {
        allServices,
        /*Methods*/
        numberOfServices,
        fetchAllServices,
        deleteService,
        createService,
        updateService
    }
}