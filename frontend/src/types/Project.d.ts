import { Asset } from "./Asset"

interface Project {
    templateId: number,
    title: string,
    userId:number,
    assets: Asset[]
}

export default Project;