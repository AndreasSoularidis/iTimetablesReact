import { Button, Descriptions, Divider, Flex, List, Progress, Space, Switch, Tag } from "antd";
import { DownloadOutlined, ThunderboltFilled, StopOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import TimeslotsTable from "../../../shared/TimeslotsTable/TimeslotsTable";
import { useEffect, useState } from "react";
import { TimetableService } from "../services/TimetableService";
import type { TimetableEntity, TimetablePost } from "../types";
import { useTimetableHub } from "../hooks/useTimetableHub";


export default function Timetable() {
    const [data, setData] = useState<TimetableEntity[]>([]);
    const [details, setDetails] = useState<{ key: string; label: string; children: string }[]>([]);
    const [showViolations, setShowViolations] = useState<boolean>(true);

    const { progress, isConnected, isProcessing, isCompleted, startProcessing, cancelProcessing } = useTimetableHub();

    const onChange = (checked: boolean) => {
        setShowViolations(checked);
    };

    const handleSubmit = async () => {
        const payload: TimetablePost = {
            schoolId: "5a4f28d3-8d80-4e41-b0f3-1a6e741d165b"
        };
        const timetableId = await TimetableService.create(payload);
        if (!timetableId) return;

        try {
            await startProcessing(timetableId.id);
        } catch (err: any) {
            const msg = err?.message ?? "Σφάλμα κατά τη σύνδεση στο hub.";
            toast.error(msg);
            console.error("JoinTimetableGroup error:", err);
        }
    }

    const handleCancel = async () => {
        try {
            await cancelProcessing();
        } catch (err: any) {
            toast.error(err?.message ?? "Σφάλμα κατά την ακύρωση.");
            console.error("Cancel timetable generation error:", err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await TimetableService.load("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b");
            setData(response);
            const status = response[0].feasible ? "Βέλτιστο" : "Μη Εφικτό";
            const fitness = 100 - response[0].fitness;
            setDetails([
                { key: "1", label: "Κατάσταση", children: status },
                { key: "2", label: "Βαθμολογία", children: fitness.toPrecision(4).toString() },
                { key: "3", label: "Πλήθος Παραβιάσεων", children: response[0].description.length.toString() },
            ]);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!isCompleted) return;

        const fetchData = async () => {
            const response = await TimetableService.load("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b");
            setData(response);
            const status = response[0].feasible ? "Βέλτιστο" : "Μη Εφικτό";
            const fitness = 100 - response[0].fitness;
            setDetails([
                { key: "1", label: "Κατάσταση", children: status },
                { key: "2", label: "Βαθμολογία", children: fitness.toPrecision(4).toString() },
                { key: "3", label: "Πλήθος Παραβιάσεων", children: response[0].description.length.toString() },
            ]);
        };

        fetchData();
    }, [isCompleted]);
    
    return (
        <>
            <h2>Ωρολόγιο Πρόγραμμα</h2>
            <Divider orientation="start" orientationMargin={0}></Divider>
            <Space style={{ marginBottom: 16 }}>
                <Button
                type="primary"
                size="large"
                icon={<ThunderboltFilled />}
                style={{ fontSize: 16, padding: "0 16px" }}
                onClick={handleSubmit}
                loading={isProcessing}
                disabled={!isConnected || isProcessing}
                >Δημιουργία</Button>
            </Space>
            <Space style={{ marginLeft: 16 }}>
                {!isProcessing && data.length > 0 && (
                <Button
                    type="primary"
                    size="large"
                    icon={<DownloadOutlined />}
                    onClick={() => {
                        const payload: TimetablePost = {
                            schoolId: "5a4f28d3-8d80-4e41-b0f3-1a6e741d165b"
                        };
                        TimetableService.export(payload);
                    }}
                    style={{ fontSize: 16, padding: "0 16px" }}
                >Eξαγωγή σε Excel
                </Button>)}
            </Space>
            
            {isProcessing && progress && (
                <Flex align="center" wrap gap={30}>
                <Progress type="circle" percent={progress.completionPercentage} />
                <Button
                    danger
                    icon={<StopOutlined />}
                    onClick={handleCancel}
                >{isProcessing ? "Ακύρωση" : "Εμφάνιση"}</Button>
            </Flex>
            )}
            {!isProcessing && data.length > 0 && (
                <>
                    <TimeslotsTable timeslots={data[0].timeslots} hours={data[0].school.maxHoursPerDay} days={data[0].school.teachingDays} classes={data[0].school.schoolClasses} />
                    <Descriptions title="" items={details} style={{ marginTop: 16 }} />
                    <Space style={{ marginTop: 16, marginBottom: 16 }}>
                        Εμφάνιση Παραβιάσεων: <Switch defaultChecked onChange={onChange} />
                    </Space>
                    {showViolations && (
                        <>
                        <Divider orientation="start" orientationMargin={0}>Παραβιάσεις</Divider>
                        <List
                            size="large"
                            bordered
                            dataSource={data[0]?.description ?? []}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />
                        </>
                    )}
                </>
            )}
        </>
    );
}