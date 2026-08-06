import { Checkbox, Form, Input, Select, InputNumber, type CheckboxOptionType, type FormInstance } from "antd";
import type { LookUp } from "../types";

export default function AddSchoolUnit({form, schoolTypes}: {form: FormInstance, schoolTypes: LookUp[]}) {

    const zoneOptions: CheckboxOptionType<string>[] = [
        { label: "Πρωινή Ζώνη", value: "morningZone", className: "label-2" },
        { label: "Ολοήμερο", value: "afternoonZone", className: "label-3" },
        { label: "Διευριμένο Ολοήμερο", value: "extendedAfternoonZone", className: "label-4" },
    ];

    
    return (
        <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
            <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                    label="Σχολική Μονάδα"
                    name="schoolUnit"
                    rules={[{ required: true, message: "Παρακαλώ εισάγετε το όνομα της σχολικής μονάδας" }]}
                    style={{ display: "inline-block", width: "calc(65% - 8px)", marginRight: 16 }}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Βαθμίδα Εκπαίδευσης"
                    name="schoolType"
                    rules={[{ required: true, message: "Παρακαλώ επιλέξτε τη βαθμίδα εκπαίδευσης" }]}
                    style={{ display: "inline-block", width: "calc(35% - 8px)" }}>
                    <Select
                        options={schoolTypes.map((type) => ({
                            key: type.id,
                            value: type.id,
                            label: type.description,
                        }))}
                        placeholder="Επιλέξτε βαθμίδα"
                        onChange={(value) => {
                            form.setFieldsValue({ schoolType: value });
                        }}
                    />
                </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                    label="Σχολικό Έτος"
                    name="schoolYear"
                    style={{ display: "inline-block", width: "calc(40% - 8px)", marginRight: 16 }}>
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="Ημέρες Διδασκαλίας" 
                    name="teachingDays"
                    initialValue={5}
                    style={{ display: "inline-block", width: "calc(30% - 8px)", marginRight: 8 }}>
                    <InputNumber min={1} max={7} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Ώρες Διδασκαλίας"
                    name="teachingHours"
                    initialValue={6}
                    style={{ display: "inline-block", width: "calc(30% - 8px)" }}>
                    <InputNumber min={1} max={8} style={{ width: "100%" }} />
                </Form.Item>
            </Form.Item>

            
            <Form.Item label="Διαθέσιμες Ζώνες" name="availableZones">
                <Checkbox.Group options={zoneOptions} />
            </Form.Item>
        </Form>
    );
}