import { Descriptions, Typography } from "antd";
import type { DirectorEntity, SchoolUnitEntity } from "../types";

export default function ReviewData({ director, schoolUnit }: { director: DirectorEntity | null; schoolUnit: SchoolUnitEntity | null }) {
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
              <Descriptions.Item label="Όνομα">{schoolUnit?.name}</Descriptions.Item>
              <Descriptions.Item label="Βαθμίδα Εκπαίδευσης">{schoolUnit?.schoolType.description ?? "-"}</Descriptions.Item>
              <Descriptions.Item label="Σχολικό Έτος">{schoolUnit?.schoolYear ?? "-"}</Descriptions.Item>
              <Descriptions.Item label="Ημέρες Διδασκαλίας/Εβδομάδα">{schoolUnit?.teachingDays ?? "-"}</Descriptions.Item>
              <Descriptions.Item label="Μέγιστες Ώρες Διδασκαλίας/Ημέρα">{schoolUnit?.maxHoursPerDay ?? "-"}</Descriptions.Item>
              <Descriptions.Item label="Πρωινή Ζώνη">{schoolUnit?.morningZone ? "Ναι" : "Όχι"}</Descriptions.Item>
              <Descriptions.Item label="Ολοήμερο">{schoolUnit?.afternoonZone ? "Ναι" : "Όχι"}</Descriptions.Item>
              <Descriptions.Item label="Διευρυμένο Ολοήμερο">{schoolUnit?.extendedAfternoonZone ? "Ναι" : "Όχι"}</Descriptions.Item>
            </Descriptions>
        </div>
    );
}
