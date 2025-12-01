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
            const id = authService.getUser()?.id;
            let savedId;

            if (existingId) {
                const index = projects.findIndex(p => p.templateId === existingId);

                if (index !== -1){
                    projects[index] = {
                        ...projects[index],
                        assets: assets
                    };

                    savedId = existingId;
                } else {
                    savedId = Date.now();
                    projects.push({
                        templateId: savedId,
                        title: "temp",
                        userId: 1,
                        assets: assets
                    });
                } 
            } else {
                savedId = Date.now();
      
                const newProject: Project = {
                    templateId: savedId,
                    title: "temp",
                    userId: id, 
                    assets: assets,
                };
                
                projects.push(newProject);
            }
        
            await FileService.save(FILENAME, projects);
            return savedId;

    }
}