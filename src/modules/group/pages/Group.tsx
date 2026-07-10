import { Button, Card, Col, Divider, Row, Space } from "antd";
import { EditOutlined, SettingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { GroupService } from "../../group/services/GroupServices";
import type { GroupEntity } from "../../group/types";

    

export default function Group() {
    const [data, setData] = useState<GroupEntity[]>([]);
    const actions: React.ReactNode[] = [
        <EditOutlined key="edit" />,
        <SettingOutlined key="setting" />,
    ];

      useEffect(() => {
        const fetchData = async () => {
          const response = await GroupService.load("5a4f28d3-8d80-4e41-b0f3-1a6e741d165b");
          
          setData(response.sort((a, b) => a.name.localeCompare(b.name)));
        };
        fetchData();
      }, []);

    return (
        <>
            <h2>Εκπαιδευτικοί</h2>
            <Divider orientation="start" orientationMargin={0}></Divider>
            <Space style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    // shape="round"
                    size="large"
                    icon={<PlusOutlined />}
                    style={{ fontSize: 16, padding: "0 16px" }}
                    >
                    Προσθήκη
                </Button>
            </Space>
            <Row gutter={[16, 16]}>
                    {data.map((group) => (
                        <Col key={group.key} span={8}>
                            <Card title={group.name} actions={actions} type="inner" >
                                Total Hours: {group.totalHours}
                            </Card>
                        </Col>
                    ))}
            </Row>
        </>
        
    );
}