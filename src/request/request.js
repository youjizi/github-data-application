import httpInstance from "@/utils/axios";


export function getSearch(params){

    let url = `/api/search`;

    // 如果 params 不为空，则拼接 URL
    if (params) {
        // const queryString = new URLSearchParams(params).toString();
        url += `?${params}`;
    }
    console.log("在这里被编码了"+url)
    return httpInstance({
        url: url,
        method: 'GET'
    });

}

export function getDevelopersInfo(id){

    let url = `/api/developers/${id}`;

    return httpInstance({
        url: url,
        method: 'GET'
    });

}