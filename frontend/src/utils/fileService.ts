export const FileService = {
    async saveToFile<T>(data:T, filename:string) : Promise<boolean> {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: filename+'.json',
                types: [{
                description: 'JSON Files',
                accept: { 'application/json': ['.json'] }
                }]
            });

            const writable = await handle.createWritable();

            await writable.write(JSON.stringify(data,null,2));

            await writable.close();
            console.log("ke save gaa")
            return true;
        } catch (error) {
            console.error('Failed to save file:', error);
            return false;
        }
    }
}

