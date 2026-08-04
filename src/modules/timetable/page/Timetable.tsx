import { Button, Descriptions, Divider, List, Space, Switch, Tag } from "antd";
import { DownloadOutlined, ThunderboltFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import TimeslotsTable from "../../../shared/TimeslotsTable/TimeslotsTable";
import { useEffect, useRef, useState } from "react";
import { TimetableService } from "../services/TimetableService";
import type { TimetableEntity, TimetablePost } from "../types";
import { useTimetableHub } from "../hooks/useTimetableHub";


export default function Timetable() {
    const [data, setData] = useState<TimetableEntity[]>([]);
    const [details, setDetails] = useState<{ key: string; label: string; children: string }[]>([]);
    const [showViolations, setShowViolations] = useState<boolean>(true);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const activeTimetableId = useRef<string | null>(null);

    const { progress, isConnected, joinGroup, leaveGroup } = useTimetableHub();

    const onChange = (checked: boolean) => {
        setShowViolations(checked);
    };

    useEffect(() => {
        if (!progress || !activeTimetableId.current) return;

        if (progress.completionPercentage === "100") {
            leaveGroup(activeTimetableId.current.toString());
            activeTimetableId.current = null;
            setIsProcessing(false);
        }
    }, [progress, leaveGroup]);

    const handleSubmit = async () => {
        const payload: TimetablePost = {
            schoolId: "5a4f28d3-8d80-4e41-b0f3-1a6e741d165b"
        };
        const timetableId = await TimetableService.create(payload);
        if (!timetableId) return;

        activeTimetableId.current = timetableId.id;
        setIsProcessing(true);
        try {
            await joinGroup(timetableId.id);
        } catch (err: any) {
            const msg = err?.message ?? "Σφάλμα κατά τη σύνδεση στο hub.";
            toast.error(msg);
            console.error("JoinTimetableGroup error:", err);
            activeTimetableId.current = null;
            setIsProcessing(false);
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
                <Button
                type="primary"
                size="large"
                icon={<DownloadOutlined />}
                style={{ fontSize: 16, padding: "0 16px" }}
                >Eξαγωγή σε Excel</Button>
            </Space>
            {isProcessing && progress && (
                <div style={{ marginTop: 16 }}>
                    <Tag color="processing">{progress.completionPercentage}%</Tag>
                </div>
            )}
            {data.length > 0 && <TimeslotsTable timeslots={data[0].timeslots} hours={data[0].school.maxHoursPerDay} days={data[0].school.teachingDays} classes={data[0].school.schoolClasses} />}
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
    );
}