import { Button, Flex, Form, Steps } from "antd";
import { useEffect, useState } from "react";

import ReviewData from "../components/ReviewData";
import type { DirectorEntity, LookUp, SchoolUnitEntity } from "../types";
import AddDirector from "../components/AddDirector";
import AddSchoolUnit from "../components/AddSchoolUnit";
import axios from "axios";
import { RegistrationService } from "../services/RegistrationService";

const STEPS = [
    { title: "Προσωπικά Στοιχεία" },
    { title: "Στοιχεία Σχολικής Μονάδας" },
    { title: "Ολοκλήρωση" },
];

export default function Register() {
    const [directorForm] = Form.useForm();
    const [schoolUnitForm] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [schoolTypes, setSchoolTypes] = useState<LookUp[]>([]);
    const [directorData, setDirectorData] = useState<DirectorEntity | null>(null);
    const [schoolUnitData, setSchoolUnitData] = useState<SchoolUnitEntity | null>(null);

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
            const selectedSchoolType = schoolTypes.find(type => type.id === schoolUnitValues.schoolType);
            setSchoolUnitData({
                name: schoolUnitValues.schoolUnit,
                schoolYear: schoolUnitValues.schoolYear,
                teachingDays: schoolUnitValues.teachingDays,
                maxHoursPerDay: schoolUnitValues.teachingHours,
                morningZone: schoolUnitValues.availableZones?.includes("morningZone") ?? false,
                afternoonZone: schoolUnitValues.availableZones?.includes("afternoonZone") ?? false,
                extendedAfternoonZone: schoolUnitValues.availableZones?.includes("extendedAfternoonZone") ?? false,
                schoolType: selectedSchoolType!,
            });
        }
        if (isLast) {
            const dataToSubmit = {
                director: directorData!,
                schoolUnit: {
                    name: schoolUnitData!.name,
                    schoolYear: schoolUnitData!.schoolYear,
                    teachingDays: schoolUnitData!.teachingDays,
                    maxHoursPerDay: schoolUnitData!.maxHoursPerDay,
                    morningZone: schoolUnitData!.morningZone,
                    afternoonZone: schoolUnitData!.afternoonZone,
                    extendedAfternoonZone: schoolUnitData!.extendedAfternoonZone,
                    schoolTypeId: schoolUnitData!.schoolType.id,
                },
            };
            await RegistrationService.insert(dataToSubmit);
            setDirectorData(null);
            setSchoolUnitData(null);
            directorForm.resetFields();
            schoolUnitForm.resetFields();
        }
        setCurrent((c) => c + 1);
    };

    const stepContent = [
        <AddDirector form={directorForm} />,
        <AddSchoolUnit form={schoolUnitForm} schoolTypes={schoolTypes} />,
        <ReviewData director={directorData!} schoolUnit={schoolUnitData} />,
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