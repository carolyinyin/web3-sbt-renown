
export interface Education {
    schoolName: string;
    status: string;
    major: string;
    courses: {
        count: number;
        items: Array<Course>;
    };
    licenses: {
        count: number;
        items: Array<License>;
    };
}

export interface Experience {
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
}

export interface Skill {
    class: string;
    name: string;
}

export interface Course {
    courseName: string;
    content: string;
    comment: string;
    grade: number;
}

export interface License {
    licenseName: string;
    content: string;
}
