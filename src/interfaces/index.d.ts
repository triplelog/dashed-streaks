

export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
}

export interface IStreak {
    id: string;
    name: string;
    word: string;
    user_id: string;
}
