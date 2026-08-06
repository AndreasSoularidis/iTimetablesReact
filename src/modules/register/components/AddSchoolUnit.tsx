import { Checkbox, Form, Input, Select, InputNumber, type CheckboxOptionType, type FormInstance } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AddSchoolUnit({form}: {form: FormInstance}) {
    const [schoolTypes, setSchoolTypes] = useState<{ id: string; description: string }[]>([]);
    const [selectedSchoolType, setSelectedSchoolType] = useState<string | null>(null);

    const zoneOptions: CheckboxOptionType<string>[] = [
        { label: "Πρωινή Ζώνη", value: "morningZone", className: "label-2" },
        { label: "Ολοήμερο", value: "afternoonZone", className: "label-3" },
        { label: "Διευριμένο Ολοήμερο", value: "extendedAfternoonZone", className: "label-4" },
    ];

    useEffect(() => {
        async function fetchSchoolTypes() {
            try {
                const response = await axios.get("http://localhost:5191/api/schoolTypes");
                setSchoolTypes(response.data.schoolTypes);
            } catch (error) {
                console.error("Error fetching school types:", error);
            }
        }
        fetchSchoolTypes();
    }, []);
    return (
        <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
            <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                    label="Σχολική Μονάδα"
                    name="SchoolUnit"
                    style={{ display: "inline-block", width: "calc(65% - 8px)", marginRight: 16 }}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Βαθμίδα Εκπαίδευσης"
                    name="SchoolType"
                    style={{ display: "inline-block", width: "calc(35% - 8px)" }}>
                    <Select
                        options={schoolTypes.map((type) => ({
                            key: type.id,
                            value: type.id,
                            label: type.description,
                        }))}
                        placeholder="Επιλέξτε βαθμίδα"
                        onChange={(value) => {
                            form.setFieldsValue({ SchoolType: value });
                            setSelectedSchoolType(value);
                        }}
                    />
                </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                    label="Σχολικό Έτος"
                    name="SchoolYear"
                    style={{ display: "inline-block", width: "calc(40% - 8px)", marginRight: 16 }}>
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="Ημέρες Διδασκαλίας" 
                    name="TeachingDays"
                    style={{ display: "inline-block", width: "calc(30% - 8px)", marginRight: 8 }}>
                    <InputNumber min={1} max={7} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Ώρες Διδασκαλίας"
                    name="TeachingHours"
                    style={{ display: "inline-block", width: "calc(30% - 8px)" }}>
                    <InputNumber min={1} max={45} style={{ width: "100%" }} />
                </Form.Item>
            </Form.Item>

            
            <Form.Item label="Διαθέσιμες Ζώνες" name="AvailableZones">
                <Checkbox.Group options={zoneOptions} />
            </Form.Item>
        </Form>
    );
}