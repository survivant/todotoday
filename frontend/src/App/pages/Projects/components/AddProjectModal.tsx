import React from 'react'
import moment, { Moment } from 'moment'

import { Button, DropdownMenu, Table, Heading, Modal, ButtonWrapper, LabelAndInput } from 'sharedComponents'
import { TProject, TProjectStatus } from 'sharedTypes'

type AddProjectModalProps = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    setProjects: React.Dispatch<React.SetStateAction<Record<string, TProject>>>
}

const AddProjectModal = ({ showModal, setShowModal, setProjects }: AddProjectModalProps) => {
    const [title, setTitle] = React.useState<string>('')
    const [startDate, setStartDate] = React.useState<Moment>(moment())
    const [endDate, setEndDate] = React.useState<Moment>(moment())

    const handleSubmit = () => {
        const newProject = {
            title,
            startDate: moment(startDate),
            endDate: moment(endDate),
            status: TProjectStatus.NEW,
            id: `${Math.random()}`
        }

        setProjects(prev => ({...prev, id: {...newProject} }))
        setShowModal(false)
    }

    return (
        <Modal
            contentLabel="Add Project"
            showModal={showModal}
            closeModal={() => setShowModal(false)}
        >
            <>
                <LabelAndInput
                    label="Title"
                    name="title"
                    value={title}
                    handleChange={(data) => setTitle(data)}
                />
                <LabelAndInput
                    label="Start Date"
                    name="startDate"
                    value={startDate.format('YYYY-MM-DD')}
                    inputType="date"
                    handleChange={(date) => setStartDate(moment(date))}
                />
                <LabelAndInput
                    label="End Date"
                    name="endDate"
                    value={endDate.format('YYYY-MM-DD')}
                    inputType="date"
                    handleChange={(date) => setEndDate(moment(date))}
                />
                <ButtonWrapper right={
                    [
                        <Button key="cancel" variation="FOREGROUND_PRIMARY" onClick={() => setShowModal(false)}>Cancel</Button>,
                        <Button key="save"variation="FOREGROUND_ALERT" onClick={handleSubmit}>Save</Button>
                    ]
                }
                />
            </>
        </Modal >
    )
}

export default AddProjectModal