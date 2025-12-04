import { Asset } from "./Asset"

interface Project {
    templateId: number,
    userId: number,
    title: string,
    ownerName: string,
    userId:number,
    assets: Asset[]
}

export default Project;