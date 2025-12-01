import { useState } from 'react';
import { Asset } from '../types/Asset';
import Project from '../types/Project';
import { authService } from './auth';
import { FileService } from './FileService';

const FILENAME = "project";

export const ProjectService = {
    async getAll() : Promise<Project[]> {
        const data =await FileService.load<Project[]>(FILENAME);
        return data || [];
    },

    async getById(id: number) : Promise<Project | undefined> {
        const projects = await this.getAll();
        return projects.find(p => p.templateId === id);
    },

    async saveProjects(
        assets: Asset[], existingId: number | null ): Promise<number> 
        {
            const projects = await this.getAll();
            const currentUser = authService.getUser();

            if (!currentUser || typeof currentUser.id !== "number") {
                throw new Error("User not authenticated");
            }

            const ownerName = currentUser.username || currentUser.email;
            let savedId;

            if (existingId) {
                const index = projects.findIndex(p => p.templateId === existingId); 

                if (index !== -1){
                    projects[index] = {
                        ...projects[index],
                        assets: assets,
                        ownerName: ownerName || projects[index].ownerName
                    };

                    savedId = existingId;
                } else {
                savedId = Date.now();
                projects.push({
                templateId: savedId,
                userId: currentUser.id,
                ownerName,
                assets: assets
                });
            } 
            } else {
                savedId = Date.now();
      
                const newProject: Project = {
                    templateId: savedId,
                    userId: currentUser.id, 
                    ownerName,
                    assets: assets,
                };
                
                projects.push(newProject);
            }
        
            await FileService.save(FILENAME, projects);
            return savedId;

    },

    async deleteProject(templateId: number): Promise<void> {
        const projects = await this.getAll();
        const filtered = projects.filter(project => project.templateId !== templateId);

        if (filtered.length === projects.length) {
            throw new Error("Template not found");
        }

        await FileService.save(FILENAME, filtered);
    }
}