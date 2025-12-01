import { Asset } from "./Asset"

interface Project {
    templateId: number;
    userId: number;
    ownerName?: string;
    assets: Asset[];
}

export default Project;