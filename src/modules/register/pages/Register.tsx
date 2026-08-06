import { Button, Flex, Form, Steps } from "antd";
import { useState } from "react";

import AddDirector from "../components/AddDirector";
import AddSchoolUnit from "../components/AddSchoolUnit";
import ReviewData from "../components/ReviewData";

const STEPS = [
    { title: "Προσωπικά Στοιχεία" },
    { title: "Στοιχεία Σχολικής Μονάδας" },
    { title: "Ολοκλήρωση" },
];

export default function Register() {
    const [directorForm] = Form.useForm();
    const [schoolUnitForm] = Form.useForm();
    const [current, setCurrent] = useState(0);

    const isLast = current === STEPS.length - 1;
    const isFirst = current === 0;

    const handleNext = async () => {
        if (current === 0) await directorForm.validateFields();
        if (current === 1) await schoolUnitForm.validateFields();

        if (isLast) {
            const directorValues = directorForm.getFieldsValue();
            const schoolUnitValues = schoolUnitForm.getFieldsValue();
            console.log("Director Values:", directorValues);
            console.log("School Unit Values:", schoolUnitValues);
            return;
        }
        setCurrent((c) => c + 1);
    };

    const stepContent = [
        <AddDirector form={directorForm} />,
        <AddSchoolUnit form={schoolUnitForm} />,
        <ReviewData directorForm={directorForm} schoolUnitForm={schoolUnitForm} />,
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