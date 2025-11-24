import { Asset } from "./Asset"

interface Project {
    templateId: number,
    userId:number,
    assets: Asset[]
}

export default Project;