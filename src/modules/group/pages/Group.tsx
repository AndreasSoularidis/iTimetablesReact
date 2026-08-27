import { App, Button, Card, Col, Divider, Row, Space } from "antd";
import { EditOutlined, PlusOutlined, DeleteFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { GroupService } from "../../group/services/GroupServices";
import type { SchoolClassEntity, ISchoolClassCreateRequest } from "../../group/types";
import AddEditGroup from "../components/AddEditGroup";
import {useTimetableHub} from "../../timetable/hooks/useTimetableHub";
import { toast } from "react-toastify";

export default function Group() {
    const {isProcessing} = useTimetableHub();
    const { modal } = App.useApp();
    const [data, setData] = useState<SchoolClassEntity[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<SchoolClassEntity | null>(null);
    const [reload, setReload] = useState(false);


    const handleEdit = (group: SchoolClassEntity) => {
        if(isProcessing){
            toast.error("Δεν μπορείτε να επεξεργαστείτε τμήματα ενώ η δημιουργία του ωρολογίου βρίσκεται σε εξέλιξη.");
            return;
        }
        setSelectedGroup(group);
        setModalOpen(true);
    }
    
    const handleDelete = async (group: SchoolClassEntity) => {
        if(isProcessing){
            toast.error("Δεν μπορείτε να διαγράψετε τμήματα ενώ η δημιουργία του ωρολογίου βρίσκεται σε εξέλιξη.");
            return;
        }
        modal.confirm({
            title: "Επιβεβαίωση Διαγραφής",
            content: "Είστε σίγουροι ότι θέλετε να διαγράψετε το συγκεκριμένο τμήμα;",
            onOk: async () => {
            try {
                await GroupService.delete(group);
                setReload((prev) => !prev);
            } catch (error) {
                console.error("Error deleting group:", error);
            }
            },
        });
    }

    const handleSubmit = async (group: ISchoolClassCreateRequest) => {
    try{
        if(selectedGroup){
            const groupToUpdate = { ...group, id: selectedGroup.key, assignedHours: selectedGroup.assignedHours };
            console.log("Updating group:", groupToUpdate);
            await GroupService.update(groupToUpdate);
            setReload((prev) => !prev);
        }else{
        let response = await GroupService.insert(group);
        setData((prev) => [response!, ...prev ]); // Trigger re-render by updating state
        }
    } catch (error) {
        console.error("Error submitting group:", error);
    }
    setModalOpen(false);
    setSelectedGroup(null);
    };

    useEffect(() => {
    const fetchData = async () => {
        const response = await GroupService.load();
        
        setData(response.sort((a, b) => a.name.localeCompare(b.name)));
    };
    fetchData();
    }, [reload]);

    return (
        <>
            <h2>Τμήματα</h2>
            <Divider orientation="start" orientationMargin={0}></Divider>
            <Space style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    style={{ fontSize: 16, padding: "0 16px" }}
                    onClick={() => {
                        if (isProcessing) {
                        toast.error("Δεν μπορείτε να προσθέσετε εκπαιδευτικό κατά τη δημιουργία του ωρολογίου προγράμματος.");
                        return;
                        }
                        setModalOpen(true);
                    }}
                >
                    Προσθήκη
                </Button>
            </Space>
            <Row gutter={[16, 16]}>
                {data.map((group) => {
                    const actions: React.ReactNode[] = [
                        <EditOutlined key="edit" onClick={() => handleEdit(group)}/>,
                        <DeleteFilled key="delete" onClick={() => handleDelete(group)}/>,
                    ];
                    
                    return (
                    <Col key={group.key} span={8}>
                        <Card title={`Τμήμα ${group.name}`} 
                            actions={actions} 
                            type="inner" 
                            >
                            <p>Σύνολο Ωρών Διδασκαλίας: {group.totalHours}</p>
                            <p>Τάξη: {group.grade.description}</p>
                        </Card>
                    </Col>
                    );
                })}
            </Row>
            <AddEditGroup
                isModalOpen={modalOpen}
                modifyIsModalOpen={setModalOpen}
                defaultEditValues={selectedGroup ?? undefined}
                onSubmit={handleSubmit}
            />
        </>
    );
}