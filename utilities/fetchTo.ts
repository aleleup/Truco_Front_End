export interface Payload<T> {
    error: boolean,
    payload: T
}

export async function genericGetTo<T>(path: string):Promise<Payload<T>>{
    const endpoint: string | undefined = process.env.NEXT_PUBLIC_ENDPOINT;
    const returnStructure:  Payload<T> = {
        error: false,
        payload: null as T
    }
    try {
       const data = await fetch(`${endpoint}/${path}`);
       const parsedData = await data.json();

       returnStructure.payload = parsedData.body
    } 
    catch (error) {
        console.error(error);
        returnStructure.error = true
    }
    finally {
        return returnStructure
    }
}


export async function genericPostTo<T>(path: string, body: object): Promise<Payload<T>>{
    console.log("STARTING GENERIC POST WITH", path, body)
    const endpoint: string | undefined = process.env.NEXT_PUBLIC_ENDPOINT;
    const returnStructure:  Payload<T> = {
        error: false,
        payload: null as T
    }
    try {
       const data = await fetch(`${endpoint}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
       });
       console.log("DATA: ", data)
       const parsedData = await data.json();
       console.log("PARSED DATA: ", parsedData)

       returnStructure.payload = parsedData
    } 
    catch (error) {
        console.error(error);
        returnStructure.error = true
    }
    finally {
        console.log("RETURNING STRUCTURE")
        return returnStructure
    }
};