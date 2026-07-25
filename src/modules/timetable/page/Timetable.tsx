import { Button, Descriptions, Divider, List, Space } from "antd";
import { DownloadOutlined, ThunderboltFilled } from "@ant-design/icons";
import TimeslotsTable from "../../../shared/TimeslotsTable/TimeslotsTable";
import { useEffect, useState } from "react";
import { TimetableService } from "../services/TimetableService";
import type { TimetableEntity } from "../types";

export default function Timetable() {
    const [data, setData] = useState<TimetableEntity[]>([]);
    const [details, setDetails] = useState<{ key: string; label: string; children: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await TimetableService.load("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b");
            setData(response);
            setDetails([
                { key: "1", label: "Εφικτό", children: response[0].feasible.toString() },
                { key: "2", label: "Βαθμολογία", children: response[0].fitness.toString() },
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
                >
                Δημιουργία 
                </Button>
            </Space>
            <Space style={{ marginLeft: 16 }}>
                <Button
                type="primary"
                size="large"
                icon={<DownloadOutlined />}
                style={{ fontSize: 16, padding: "0 16px" }}
                >
                Eξαγωγή σε Excel 
                </Button>
            </Space>
            {data.length > 0 && <TimeslotsTable timeslots={data[0].timeslots} />}
            <Descriptions title="" items={details} style={{ marginTop: 16 }} />
            <Divider titlePlacement="start">Παραβιάσεις</Divider>
            <List
                size="large"
                bordered
                dataSource={data[0]?.description ?? []}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </>
    );
}