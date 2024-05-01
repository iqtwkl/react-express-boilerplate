import { ILike } from "typeorm";

export class dbUtils{

    static whereConditions(searchBy: string[], searchTerm) {
        return searchBy.map(field => ({ [field]: ILike(`%${searchTerm}%`) }));
    }

    static orderConditions(sortBy: string[], sortOrder: string) {
        const validSortOrder = ['ASC', 'DESC'];
        if (!validSortOrder.includes(sortOrder.toUpperCase())) {
            throw new Error('Invalid sortOrder. Valid values are ASC or DESC.');
        }
    
        return sortBy.reduce((acc, field) => {
            acc[field] = sortOrder.toUpperCase();
            return acc;
        }, {});
    }

    static skipPage(pageNumber, pageSize) {
        return (pageNumber - 1) * pageSize
    }
}