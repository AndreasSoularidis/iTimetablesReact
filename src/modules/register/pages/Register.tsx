import { Button, Flex, Form, Steps } from "antd";
import { useState } from "react";

import AddDirector from "../components/AddDirector";
import AddSchoolUnit from "../components/AddSchoolUnit";
import ReviewData from "../components/ReviewData";
import type { DirectorEntity } from "../types";

const STEPS = [
    { title: "Προσωπικά Στοιχεία" },
    { title: "Στοιχεία Σχολικής Μονάδας" },
    { title: "Ολοκλήρωση" },
];

export default function Register() {
    const [directorForm] = Form.useForm();
    const [schoolUnitForm] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [directorData, setDirectorData] = useState<DirectorEntity | null>(null);

    const isLast = current === STEPS.length - 1;
    const isFirst = current === 0;

    const handleNext = async () => {
        if (current === 0) {
            await directorForm.validateFields();
            const directorValues = directorForm.getFieldsValue();
            setDirectorData({
                firstName: directorValues.firstName,
                lastName: directorValues.lastName,
                username: directorValues.username,
                email: directorValues.email,
                password: directorValues.password,
            });
        }
        if (current === 1) {
            await schoolUnitForm.validateFields();
            const schoolUnitValues = schoolUnitForm.getFieldsValue();
        }
        if (isLast) {
            // TODO: submit directorData + schoolUnitForm values to the registration API
            return;
        }
        setCurrent((c) => c + 1);
    };

    const stepContent = [
        <AddDirector form={directorForm} />,
        <AddSchoolUnit form={schoolUnitForm} />,
        <ReviewData director={directorData!} schoolUnitForm={schoolUnitForm} />,
    ];

    return (
        <>
            <h1>Registration Form</h1>
            <Steps current={current} items={STEPS} style={{ marginBottom: 24 }} />
            {/* All steps stay mounted so antd keeps field values registered in the form store */}
            <div style={{ minHeight: 200 }}>
                {stepContent.map((content, index) => (
                    <div key={index} style={{ display: index === current ? "block" : "none" }}>
                        {content}
                    </div>
                ))}
            </div>
            <Flex justify="flex-end" gap={8} style={{ marginTop: 16 }}>
                {!isFirst && (
                    <Button size="middle" onClick={() => setCurrent((c) => c - 1)}>
                        Προηγούμενο
                    </Button>
                )}
                <Button type="primary" size="middle" onClick={handleNext}>
                    {isLast ? "Εγγραφή" : "Επόμενο"}
                </Button>
            </Flex>
        </>
    );
}