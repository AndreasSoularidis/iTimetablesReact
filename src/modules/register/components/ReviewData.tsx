import { Descriptions, Typography, type FormInstance } from "antd";
import type { DirectorEntity } from "../types";

export default function ReviewData({ director, schoolUnitForm }: { director: DirectorEntity | null; schoolUnitForm: FormInstance }) {
    const schoolUnitValues = schoolUnitForm.getFieldsValue();

    return (
        <div>
            <Typography.Title level={4}>Προσωπικά Στοιχεία</Typography.Title>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Όνομα">{director?.firstName ?? "-"}</Descriptions.Item>
              <Descriptions.Item label="Επώνυμο">{director?.lastName ?? "-"}</Descriptions.Item>
              <Descriptions.Item label="Email">{director?.email ?? "-"}</Descriptions.Item>
              <Descriptions.Item label="Username">{director?.username ?? "-"}</Descriptions.Item>
            </Descriptions>
            <Typography.Title level={4}>Στοιχεία Σχολικής Μονάδας</Typography.Title>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Όνομα">{schoolUnitValues.schoolUnit}</Descriptions.Item>
              <Descriptions.Item label="Βαθμίδα Εκπαίδευσης">{schoolUnitValues.schoolType}</Descriptions.Item>
              <Descriptions.Item label="Σχολικό Έτος">{schoolUnitValues.schoolYear}</Descriptions.Item>
              <Descriptions.Item label="Ημέρες Διδασκαλίας">{schoolUnitValues.teachingDays}</Descriptions.Item>
              <Descriptions.Item label="Ώρες Λειτουργίας">{schoolUnitValues.teachingHours}</Descriptions.Item>
              <Descriptions.Item label="Ολοήμερο Πρόγραμμα">{schoolUnitValues.availableZones}</Descriptions.Item>
            </Descriptions>
        </div>
    );
}
