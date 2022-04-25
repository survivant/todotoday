type ProjectStatus = 'NEW' | "IN_PROGRESS" | "COMPLETED" | "CANCELED"

type Project = {
    id: string
    title: string
    startDate: string | null
    endDate: string | null
    status: ProjectStatus
}

export {
    Project,
    ProjectStatus
}