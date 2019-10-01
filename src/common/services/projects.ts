import { IUser } from "./users";
import { fetchBackend, ObjectToPathQuery } from "../helpers";

export async function CreateProject(projectData: ICreateProjectsRequestBody): Promise<Response> {
    return await fetchBackend("projects", "POST", projectData);
}
export interface ICreateProjectsRequestBody {
    role: "Developer" | "Other"; // Only a developer or "Other" (manager, etc) can create a new project
    appName: string;
    category: string;
    description: string;
    isPrivate: boolean;
    downloadLink?: string;
    githubLink?: string;
    externalLink?: string;
    launchYear: number;
    awaitingLaunchApproval: boolean;
    needsManualReview: boolean;
    heroImage: string;
    lookingForRoles: string[];
}


export async function ModifyProject(projectData: IModifyProjectsRequestBody, queryData: IModifyProjectRequestQuery) {
    return await fetchBackend(`projects?${ObjectToPathQuery(queryData)}`, "POST", projectData);
}

export async function GetProjectByDiscordId(discordId: string): Promise<IProject[]> {
    return (await fetchBackend(`projects?discordId=${discordId}`, "GET")).json();
}

export async function GetAllProjects(): Promise<IProject[]> {
    return (await fetchBackend(`projects`, "GET")).json();
}

interface IModifyProjectsRequestBody {
    appName: string;
    description?: string;
    isPrivate: boolean;
    category?: string;

    downloadLink?: string;
    githubLink?: string;
    externalLink?: string;

    collaborators?: IUser[];

    launchYear?: number;
    awaitingLaunchApproval: boolean;
}

interface IModifyProjectRequestQuery {
    /** @summary The app name that's being modified */
    appName: string;
}

export interface IProjectCollaborator extends IUser {
    role: "Developer" | "Translator" | "Beta Tester" | "Other";
}
export interface IProject {
    id?: number;

    appName: string;
    description: string;
    isPrivate: boolean;
    downloadLink?: string;
    githubLink?: string;
    externalLink?: string;

    heroImage: string;

    awaitingLaunchApproval: boolean;
    needsManualReview: boolean;
    lookingForRoles?: string[];

    collaborators: IProjectCollaborator[];

    launchYear?: number;
    category?: string;
};
